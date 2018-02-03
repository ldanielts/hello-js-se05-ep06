exports.up = knex => knex.schema.createTable("pessoa", tb => {
    tb.increments("id")
    tb.string("nome").notNullable()
    tb.string("telefone").notNullable()
    tb.timestamp("data_nascimento").notNullable().defaultTo(knex.fn.now())
  })
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable("pessoa")
  };
