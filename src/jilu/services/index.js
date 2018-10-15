import { createConnection, getRepository, Entity, PrimaryGeneratedColumn, Column, Connection, Repository } from 'typeorm/browser';
import { Category, Notes } from '../entity';
type Tdb = {
  init: () => {},
  connection: Connection,
  category: () => Repository<Category>,
  notes: () => Repository<Notes>
};
export const db: Tdb = {
  init: async () => {
    let conn = await createConnection({
      type: 'react-native',
      database: 'test',
      location: 'default',
      logging: ['error', 'query', 'schema'],
      /**指示是否应在每次启动应用程序时自动创建数据库架构。请注意此选项，不要在生产中使用它 - 否则您可能会丢失生产数据 */
      synchronize: true,
      entities: [Category, Notes]
    });
    db.connection = conn;
    let categoryRepository = conn.getRepository(Category);
    let count = await categoryRepository.count();
    if (count == 0) {
      let time = new Date().getTime();
      let defalutList = [
        { id: time, name: '收件箱', sort: 1 },
        { id: time + 1, name: '购物', sort: 2 },
        { id: time + 2, name: '想看的电影', sort: 3 },
        { id: time + 3, name: '愿望列表', sort: 4 },
        { id: time + 4, name: '工作', sort: 5 }
      ];
      await categoryRepository
        .createQueryBuilder()
        .insert()
        .values(defalutList)
        .execute();
    }
    // console.log('DB', lokiDB);
  },
  /**链接 */
  connection: null,
  category: () => {
    let repository = db.connection.getRepository(Category);
    return repository;
  },
  notes: () => {
    let repository = db.connection.getRepository(Notes);
    return repository;
  }
};
