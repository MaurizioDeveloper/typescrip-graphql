import app from "./app"
import { AppDataSource } from './db';
import { PORT } from "./config";

async function main() {
  try {
    await AppDataSource.initialize();
    app.listen(PORT, () => {
      console.log(`port lisening in port http://localhost:${PORT}`)
    })    
  } catch (error) {
    console.log(error);
  }
}

main();
