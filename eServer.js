import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

const pool = new Pool({
  password: process.env.PASSWORD,
  user: process.env.USER_NAME,
  database: process.env.DB_NAME,
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
    .query("SELECT * FROM pets;")
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => res.sendStatus(500));
});

app.get("/home/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM pets WHERE id = $1;", [id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => res.sendStatus(500));
});

// app.get("/home/users", (req, res) => {
//   pool
//     .query("SELECT * FROM userAccounts;")
//     .then((result) => {
//       res.send(result.rows);
//     })
//     .catch((err) => res.sendStatus(500));
// });
//posts

app.post("/home", (req, res) => {
  console.log("in path");
  const {
    name,
    age,
    breed,
    kind,
    vax_status,
    good_w_kids,
    goood_w_animals,
    about_pet,
  } = req.body;
  const postQuery = `
  INSERT INTO pets(name, age, breed, kind, vax_status, good_w_kids, good_w_animals, about_pet) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
  if (name && age && breed && kind && about_pet) {
    console.log("past if");
    pool
      .query(postQuery, [
        name,
        age,
        breed,
        kind,
        vax_status,
        good_w_kids,
        goood_w_animals,
        about_pet,
      ])
      .then(() => res.send(`Successfully added ${name} to the list`))
      .catch((err) => res.sendStatus(500));
  } else {
    res.status(400).send("Must include title and body");
  }
});

//patches
app.patch("/home/:id", (req, res) => {
  console.log("inpath");
  const {
    name,
    age,
    breed,
    kind,
    vax_status,
    good_w_kids,
    goood_w_animals,
    about_pet,
  } = req.body;
  const { id } = req.params;
  console.log(breed);
  const updateCommand = `
  UPDATE pets SET
    name = COALESCE($2, name),
    age = COALESCE($3, age),
    breed = COALESCE($4, breed),
    kind = COALESCE($5, kind),
    vax_status = COALESCE($6, vax_status),
    good_w_kids = COALESCE($7, good_w_kids),
    good_w_animals = COALESCE($8, good_w_animals),
    about_pet = COALESCE($9, about_pet)
  WHERE id = $1
  RETURNING *`;
  pool
    .query(updateCommand, [
      id,
      name,
      age,
      breed,
      kind,
      vax_status,
      good_w_kids,
      goood_w_animals,
      about_pet,
    ])
    .then((result) => res.send(`Update made to ${result.rows[0]["name"]}`))
    .catch((err) => res.sendStatus(500));
});

//deletes
app.delete("/home/:id", (req, res) => {
  const { id } = req.params;
  const deleteCommand = `DELETE FROM pets WHERE id = $1 RETURNING *`;
  pool
    .query(deleteCommand, [id])
    .then((result) => {
      if (result.rowCount > 0) {
        res.send(`${result.rows[0]["name"]} deleted from records`);
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
