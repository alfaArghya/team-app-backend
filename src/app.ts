import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import * as routes from "./routes/index";

const app = express();
app.use(express.json()); //parse incoming JSON
app.use(cors()); //avoid CORS error

dotenv.config();

app.get("/", (req, res) => {
  res.json({
    msg: "Server is on",
  });
});

//create a user
app.post("/api/users/signup", routes.signup);

//login a user
app.post("/api/users/signin", routes.signin);

app.use("/api*", routes.userAUTH); //user AUTH

//get all users
app.get("/api/users", routes.allUser);

//get users by name
app.get("/api/users/name", routes.allUserByName);

// get a user by id
app.get("/api/users/:id", routes.singleUser);

// update a user
app.put("/api/users/:id", routes.updateUser);

// delete a user
app.delete("/api/users/:id", routes.deleteUser);

// create a team
app.post("/api/team", routes.createTeam);

// see the team details
app.get("/api/team/", routes.allTeam);
app.get("/api/team/:id", routes.singleTeam);

// update a team
// app.put("/api/team/:id");

//delete a team
// app.delete("/api/team/:id");

export default app;
