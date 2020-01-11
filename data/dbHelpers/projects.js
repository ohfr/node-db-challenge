const db = require("../dbConfig");

const find = () => {
    return db("projects").select();
};

const findById = (id) => {
    return db("projects").where({id}).first();
};

const add = async (project) => {
    const newId = await db("projects").insert(project);

    return db("projects").where({id: newId[0]}).first();
};

const remove = (id) => {
    return db("projects").where({id}).del();
};

const update = async (id, changes) => {
    const newId = await db("projects").where({id}).update(changes);

    return db("projects").where({id: newId[0]}).first();
};

const findProjectResoucres = (id) => {
    return db("projects as p").join("project_resources as pr", "p.id", "pr.project_id").where({"p.id": id});
};

module.exports = {
    find,
    findById,
    remove,
    add,
    update,
    findProjectResoucres
}