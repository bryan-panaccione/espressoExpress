import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

// auth middleware
// gonna use Auth0 password.js eventually

//gets
app.get("/home", (req, res) => {
  pool
    .query("SELECT * FROM notecards;")
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => res.sendStatus(500));
});

app.get("/home/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM noteCards WHERE id = $1;", [id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => res.sendStatus(500));
});

app.get("/home/users", (req, res) => {
  pool
    .query("SELECT * FROM userAccounts;")
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.sendStatus(500));
});
//posts

app.post("/home", (req, res) => {
  const { title, body_text } = req.body;
  if (title && body_text) {
    pool
      .query("INSERT INTO noteCards(title, body_text) VALUES ($1, $2);", [
        title,
        body_text,
      ])
      .then(() => res.send(`Successfully posted ${title}`))
      .catch((err) => res.sendStatus(500));
  } else {
    res.status(400).send("Must include title and body");
  }
});

//patches
app.patch("/home/:id", (req, res) => {
  const { body_text } = req.body;
  const { id } = req.params;
  const updateCommand = `
  UPDATE noteCards SET
    body_text = COALESCE($2, body_text)
    WHERE title = $1`;
  pool
    .query(updateCommand, [id, body_text])
    .then((result) => res.send(`Update made to entry ${id}`))
    .catch((err) => res.sendStatus(500));
});

//deletes
app.delete("/home/:id", (req, res) => {
  const { id } = req.params;
  const deleteCommand = `DELETE FROM noteCards WHERE id = $1`;
  pool
    .query(deleteCommand, [id])
    .then((result) => {
      if (result.rowCount > 0) {
        res.send(`Entry ${id} deleted from records`);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => res.sendStatus(500));
});
//404 if not found

app.use((req, res, next) => {
  res.sendStatus(404);
});

//listen on port
app.listen(process.env.PORT, () =>
  console.log(`Listening on port: ${process.env.PORT}`)
);
