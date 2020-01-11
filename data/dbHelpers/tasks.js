const db = require("../dbConfig");

const find = () => {
    return db("tasks").select();
};

const findById = (id) => {
    return db("tasks").where({id}).first();
};

const add = async (task) => {
    const newId = await db("tasks").insert(task);

    return db("tasks").where({id: newId[0]}).first();
};

const remove = (id) => {
    return db("tasks").where({id}).del();
};

const update = async (id, changes) => {
    const newId = await db("tasks").where({id}).update(changes);

    return db("tasks").where({id: newId[0]}).first();
};

const getProjectTasks = (project_id) => {
    return db("tasks as t").join("projects as p", "t.project_id", "p.id").where({"p.id": project_id}).select("t.id", "p.name as project_name", "t.description", "t.completed", "t.notes");
};

module.exports = {
    find,
    findById,
    remove,
    add,
    update,
    getProjectTasks
}