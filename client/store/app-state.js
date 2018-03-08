import { observable, action, computed, autorun, useStrict } from 'mobx';

useStrict(true);

export class AppState {
  @observable num = 0;
  @observable name = 'lisi';
  @action add() {
    this.num += 1;
  }
  @action changeName(name) {
    this.name = name;
  }
  @computed get msg() {
    return `${this.name} say num is ${this.num}`;
  }
}

const appState = new AppState();
autorun(() => {
  // console.log(appState.msg);
});

setTimeout(() => {
  appState.add();
}, 2000);

export default appState;
