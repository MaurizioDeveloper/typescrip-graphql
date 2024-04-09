import { DataSource } from 'typeorm';
import { Users } from './entities/Users'; 
import { DB_USERNAME, DB_PASSWORD, DB_PORT, DB_HOST, DB_NAME } from './config';


  export const AppDataSource = new DataSource({
    type: 'mysql',
    username: DB_USERNAME,
    password: DB_PASSWORD,
    port: Number(DB_PORT),
    host: DB_HOST,
    database: DB_NAME,
    entities: [Users],
    synchronize: true,
    ssl: false
  })



