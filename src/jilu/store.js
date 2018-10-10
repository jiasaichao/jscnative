import { observable, action, toJS, runInAction } from 'mobx';
import { db, NoteModel } from './services';

class NoteStore {
  @observable
  list: Array<NoteModel>;

  constructor() {
    this.list = [];
  }

  // @action
  add = (model: NoteModel) => {
    db.notes.add(model).then(() => {
      this.getData();
    });
  };

  @action
  getData = () => {
    this.list = db.notes.getData();
    // console.log(11111, toJS(this.notes));
  };
}
class DbStore {
  constructor() {}
}

const noteStore = new NoteStore();

export { noteStore };
