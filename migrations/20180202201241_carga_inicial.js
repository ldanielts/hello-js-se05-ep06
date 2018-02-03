
const pessoas = [
    { id: 1, nome: "Leonardo" , telefone: "123", data_nascimento: "2004-05-06" },
    { id: 2, nome: "Daniel" , telefone: "789", data_nascimento: "2010-11-12" },
    { id: 3, nome: "Tavares" , telefone: "1314", data_nascimento: "2015-01-06" },
    { id: 4, nome: "Silva" , telefone: "1718", data_nascimento: "2001-09-20" },
    { id: 5, nome: "Silvia" , telefone: "2122", data_nascimento: "2002-03-24" }
]
  
exports.up = knex => knex("pessoa").insert(pessoas)

exports.down = knex => knex("pessoa").del().whereIn("id", pessoas.map(e => e.id))
