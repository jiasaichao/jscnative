import { observable, action, toJS, runInAction } from 'mobx';
import { Category, Notes } from './entity';
import { db } from './services';

class NoteStore {
  @observable
  list: Array<Notes>;

  constructor() {
    this.list = [];
  }

  // @action

  add = async (model: Notes) => {
    // debugger;
    model.createDate = model.createDate || new Date().getTime();
    model.id = model.id || new Date().getTime();
    console.log(db.notes().findOne);
    let notes = await db.notes().findOne({ order: { sort: 'DESC' } });
    if (notes) {
      model.sort = notes.sort + 1;
    } else {
      model.sort = 1;
    }

    await db
      .notes()
      .createQueryBuilder()
      .insert()
      .values(model)
      .execute();
  };

  @action
  getData = async () => {
    this.list = await db.notes().find();
    // console.log(11111, toJS(this.notes));
  };
}
class DbStore {
  constructor() {}
}

const noteStore = new NoteStore();

export { noteStore };
