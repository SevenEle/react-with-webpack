const path = require('path');
const ReactSSR = require('react-dom/server');
const express = require('express');
const fs = require('fs');
const isDev = process.env.Node_env === 'development';


const app = express();

if(!isDev) {
    app.use('/public', express.static(path.join(__dirname, '../dist/')));
    const serverEntry = require('../dist/server-entry.js').default;
    const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
    
    app.get('*', (req, res) => {
        const appString = ReactSSR.renderToString(serverEntry);
        res.send(template.replace('<!-- app -->', appString));
    });
}else{
    const devStatic = require('./utils/dev-static');
    devStatic(app);
}

app.listen(3333, () => {
    console.log('server is running on http://localhost:3333');
});
