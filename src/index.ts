import app from "./app";
import * as dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000; //server port

//start the server
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port} ⚙️`);
});
