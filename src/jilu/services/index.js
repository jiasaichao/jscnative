import Loki from 'lokijs';
import LokiReactNativeAdapter from '../util/loki-react-native-asyncstorage-adapter';
const lokiDB = new Loki('loki.json', { adapter: new LokiReactNativeAdapter() });
export type Table<M> = {
  add: (data: M) => {},
  del: (id: number) => {},
  find(): Array<M>
};
export type LokiModel = {
  $loki: number,
  meta: {
    created: number, // Date().getTime()
    revision: number,
    updated: number, // Date().getTime()
    version: number
  }
};
export type CategoryModel = LokiModel & {
  name: string,
  sort: number,
  createTime: number,
  updateTime: number
};
export type NoteModel = LokiModel & {
  /**名称 */
  name: string,
  /**排序 */
  sort: number
};
// lokiDB.deleteDatabase();
// lokiDB.saveDatabase();
// console.log(lokiDB);
// lokiDB.collections.find((item)=>item.name)
// interface Serializable {
//     serialize(): string;
//   }
type noteTable = {
  category: Table<CategoryModel>
};
export const db = {
  init: () => {
    return new Promise((resolve, reject) => {
      lokiDB.loadDatabase({}, () => {
        //   console.log(lokiDB.collections.length);
        if (lokiDB.collections.length == 0) {
          let category = lokiDB.addCollection('category');
          category.insert({ name: '收件箱', sort: 1 });
          category.insert({ name: '购物', sort: 2 });
          category.insert({ name: '想看的电影', sort: 3 });
          category.insert({ name: '愿望列表', sort: 4 });
          category.insert({ name: '工作', sort: 2 });
          lokiDB.addCollection('notes');
          lokiDB.saveDatabase(resolve);
        } else {
          resolve();
        }
      });
    });

    // console.log('DB', lokiDB);
  },
  category: getCollection('category'),
  notes: getCollection('notes')
};
function getCollection(name) {
  let ret = {};
  ret.add = obj => {
    let collection = lokiDB.collections.find(item => item.name == name);
    // console.log(name + 'collection', collection);
    collection.insert(obj);
    return new Promise((resolve, reject) => {
      lokiDB.saveDatabase(resolve);
    });
  };
  ret.del = () => {};
  ret.getData = () => {
    return lokiDB.collections.find(item => item.name == name).data;
  };
  //   console.log(name, ret);
  return ret;
}
