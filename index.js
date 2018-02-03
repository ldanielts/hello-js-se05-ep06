const cfg = require("./knexfile")
const knex = require("knex")(cfg.development)
const express = require("express")
const morgan = require("morgan")
const bodyparser = require("body-parser")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(morgan("dev"))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended : true}))

app.use(express.static("public"))

const err = res => err => res.status(500).send(err)

app.get("/listpessoas", (req, res) => {
    knex("pessoa").select().then(ret => {
      res.send(ret)
    }).catch(err => {
      res.status(500).send(err)
      console.log(err)
    })  
})

app.get("/pessoa/:id", (req, res) => {
    console.log("Hello from the other side!");
    console.log(req.query);
    console.log(req.params);
    var pessoa = {
        "id": req.params.id
    }
    knex("pessoa").select().where(pessoa).then(ret => res.send(ret)).catch(err => {
        res.status(500).send(err)
        console.log(err)
    })  
});

app.post("/addpessoa", (req, res) => {
    var pessoa = req.body;
    console.log(pessoa)
    knex("pessoa").insert(pessoa, "id").then(ret => {
        console.log("adicionou")
        res.send(ret)
    }).catch(err => {
      res.status(500).send(err)
      console.log(err)
    })
})

app.put("/updatepessoa", (req, res) => {
    var pessoa = req.body;
    knex("pessoa").update(pessoa, "id").then(ret => {
        res.send(ret)
    }).catch(err => {
      res.status(500).send(err)
      console.log(err)
    })
})

app.delete("/deletepessoa/:id", (req, res) => {
    knex("pessoa").del().where("id", req.params.id).then(_=>res.send("Morreu"))
        .catch(err => {
            res.status(500).send(err)
            console.log(err)
    })
})

knex.migrate.latest().then(_ => 
  app.listen(3000, _ => 
    console.log("server online!")))
