const axios = require('axios');
const webpack = require('webpack');
const config = require('../../build/webpack.config.server');
const MemoryFs = require('memory-fs');
const mfs = new MemoryFs();
const path = require('path');
const ReactSSR = require('react-dom/server');
const proxy = require('http-proxy-middleware');

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html')
            .then((res) => { resolve(res.data) })
            .catch(reject);
    });
};

const compiler = webpack(config);
const Module = module.constructor;
compiler.outputFileSystem = mfs;
let serverEntry;
compiler.watch({}, (err, stats) => {
    if(err) throw err;
    stats = stats.toJson();
    stats.errors.forEach( err => {
        console.error(err);
    });
    stats.warnings.forEach(warn => {
        console.warn(warn);
    });
    const bundlePath = path.join(config.output.path, config.output.filename);
    const bundle = mfs.readFileSync(bundlePath, 'utf-8');
    const m = new Module();
    m._compile(bundle, config.output.filename);
    serverEntry = m.exports.default;
});

module.exports = (app) => {
    app.use('/public', proxy({
        target: 'http://localhost:8888'
    }));
    app.get('*', (req, res, next) => {
        getTemplate()
        .then((template) => {
            if(!serverEntry) {
                return res.status(500).send('bundle is compiling, refresh latter !');
            }
            const appString = ReactSSR.renderToString(serverEntry);
            res.send(template.replace('<!-- app -->', appString));

            })
            .catch(next);
    });
};
