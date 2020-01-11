const db = require("../dbConfig");

const find = () => {
    return db("resources").select();
};

const findById = (id) => {
    return db("resources").where({id}).first();
};

const add = async (resource) => {
    const newId = await db("resources").insert(resource);

    return db("resources").where({id: newId[0]}).first();
};

const remove = (id) => {
    return db("resources").where({id}).del();
};

const update = async (id, changes) => {
    const newId = await db("resources").where({id}).update(changes);

    return db("resources").where({id: newId[0]}).first();
};

const findProjectResources = async (project_id) => {
    return db("project_resources as pr").join("projects as p", "p.id", "pr.project_id").join("resources as r", "r.id", "pr.resource_id").where({"p.id": project_id}).select("p.name as ProjectName", "r.name as ResourceName");
};

module.exports = {
    find,
    findById,
    remove,
    add,
    update,
    findProjectResources
}