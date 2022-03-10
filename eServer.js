import express from "express";
import pkg from "pg";

const { Pool } = pkg;

const PORT = process.env.port || 3000;

const pool = new Pool({
  database: "docBoxdb",
  user: "bryan",
  password: "password",
});

const app = express();
app.use(express.json());
app.use(express.urlencoded());

// auth middleware

// app.use((req, res, next) => {
//   pool
//     .query("SELECT authtoken FROM useraccounts WHERE username = $1", [user])
//     .then((result) => {
//       if ((result.rows[0]["authtoken"] = req.headers.authorization)) {
//         //console.log(req.headers.authorization);
//         //console.log(req.headers.authorization);
//         console.log(result.rows[0]["authtoken"]);
//         next();
//       } else {
//         res.sendStatus(401);
//       }
//     })
//     .catch((err) => res.sendStatus(401));
// });

app.use((req, res, next) => {
  if (req.headers.authorization.startsWith("Basic ")) {
    next();
  } else {
    res.sendStatus(401);
  }
});

//gets
app.get("/home", (req, res) => {
  pool
    .query("SELECT * FROM userAccounts;")
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.sendStatus(500));
});
//posts

//patches

//deletes

//404 if not found

app.use((req, res, next) => {
  res.sendStatus(404);
});

//listen on port
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
