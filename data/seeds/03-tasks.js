
exports.seed = function(knex) {
  return knex('tasks').insert([
    {description: "Install knex", completed: true, project_id: 1},
    {description: "Get Water", completed: true, project_id: 2},
    {description: "Start Lambda", completed: true, project_id: 3}
  ]);
};
