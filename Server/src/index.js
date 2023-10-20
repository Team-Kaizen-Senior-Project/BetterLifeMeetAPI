const app = require("express")();
const env = require("dotenv").config();
const faunadb = require("faunadb");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Creates Fauna client and loads secret key from .env file
const client = new faunadb.Client({
  secret: process.env.SECRET_KEY,
});
// FaunaDB Commands
const {
  Paginate,
  Get,
  Select,
  Match,
  Index,
  Create,
  Collection,
  Documents,
  Lambda,
  Var,
  Join,
  Ref,
  Map: Mp,
  Post,
} = faunadb.query;

// Gets Customer by ID
app.get("/customer/:id", async (req, res) => {
  const doc = await client
    .query(Get(Ref(Collection("Customer"), req.params.id)))
    .catch((e) => res.send(e));

  res.send(doc);
});

// Gets ALL Customers from Database
app.get("/customers", async (req, res) => {
  const doc = await client
    .query(
      Mp(
        Paginate(Documents(Collection("Customer"))),
        Lambda((x) => Get(x))
      )
    )
    .catch((e) => res.send(e));

  res.send(doc);
});

// Creates a new Customer
app.post("/customer", async (req, res) => {
  const data = req.body;
  const doc = await client.query(Create(Collection("Customer"), data));

  res.send(doc);
});

app.listen(4000, () => console.log("API on http://localhost:4000"));
