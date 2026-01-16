import dotenv from "dotenv";

dotenv.config();

import { createApp } from "./app.js";
import { connectDb } from "./config/db.js";

const port = Number(process.env.PORT || 5001);

await connectDb();

const app = createApp();

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
