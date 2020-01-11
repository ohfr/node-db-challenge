
exports.seed = function(knex) {
  return knex("projects").insert([
    {name: 'DB build', description: "Build a database", completed: false},
    {name: 'Water plants', description: "Water the plants", completed: true},
    {name: 'Complete Lambda', description: "Become huge brain", completed: false}
  ]);
};
