
exports.seed = function(knex) {
  return knex('resources').insert([
    {name: "Knex", description: "schema builder"},
    {name: "water", description: "h20"},
    {name: "PC", description: "Computer"}
  ]);
};
