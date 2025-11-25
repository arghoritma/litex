import SqliteDriver from './NativeDriver';
require("dotenv").config();


const DB_PATH_NAME = process.env.NODE_ENV === 'development' ? './db/development' : process.env.DB_FILENAME;
const NativeDB = new SqliteDriver(DB_PATH_NAME + '.sqlite3');

// Helper function dengan Generic Type <T>
// Ini kuncinya agar di controller kita bisa ketik db<User>('users')
export const db = <T = any>(tableName: string) => NativeDB.query<T>(tableName);

export default NativeDB;  