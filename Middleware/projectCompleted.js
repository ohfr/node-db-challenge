const db = require("../data/dbHelpers/projects");

const taskDb = require("../data/dbHelpers/tasks");

const convertCompletedAll = () => {
    return async(req, res, next) => {
        try {
            let data = await db.find();

            let mapped = data.map(cur => {
                if (cur.completed > 1) {
                    cur.completed = true;
                } else {
                    cur.completed = false;
                };
                return cur;
            })
            if (mapped) {
                res.projects = mapped;
                next();
            }
        }catch(err) {
            return res.status(500).json({message: "Something went wrong"})
        };
    };
};

const convertCompleted = () => {
    return async (req, res, next) => {
        try {
            let data = await db.findById(req.params.id);
            
            let tasks = await taskDb.getProjectTasks(req.params.id);
            
            let resources = await db.findProjectResoucres(req.params.id);

            let mapTask = tasks.map(cur =>{
                if (cur.completed > 1) {
                    cur.completed = true;
                } else {
                    cur.completed = false;
                };
                return cur;
            });

            data.completed ? data.completed = true : data.completed = false;
            res.project = {
                ...data,
                tasks,
                resources
            };
            next();
        } catch(err) {
            console.log(err)
            return res.status(500).json({message: "Something went wrong"})
        };
    };
};

module.exports = {
    convertCompleted,
    convertCompletedAll
};