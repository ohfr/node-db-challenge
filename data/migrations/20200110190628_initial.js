
exports.up = async function(knex) {
  await knex.schema.createTable("projects", tbl => {
      tbl.increments();

      tbl.string("name", 128).notNullable();
      tbl.string("description", 128);
      tbl.boolean("completed").notNullable().defaultTo(false);
  });

  await knex.schema.createTable("resources", tbl => {
      tbl.increments();

      tbl.string("name", 128).notNullable();
      tbl.string("description", 128);
  });

  await knex.schema.createTable("tasks", tbl => {
      tbl.increments();

      tbl.string("description", 128).notNullable();
      tbl.string("notes", 128);
      tbl.boolean("completed").notNullable().defaultTo(false);
      tbl.integer("project_id").notNullable().references("id").inTable("projects");
  });

  await knex.schema.createTable("project_resources", tbl => {
      tbl.integer("project_id").notNullable().references("id").inTable("projects");
      tbl.integer("resource_id").notNullable().references("id").inTable("resources");

      tbl.primary(["project_id", "resource_id"]);
  });
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("project_resources");
    await knex.schema.dropTableIfExists("tasks");
    await knex.schema.dropTableIfExists("resources");
    await knex.schema.dropTableIfExists("projects");
};
