const db = require("../data/dbHelpers/tasks");

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
                req.allTasks = mapped;
                next();
            }
        } catch(err) {
            return res.status(500).json({message: "Something went wrong"});
        };
    };
};

const convertCompleted = () => {
    return async (req, res, next) => {
        try {
            let data = await db.findById(req.params.task_id);
            
            data.completed ? data.completed = true : data.completed = false;
            req.task = data;
            next();
        } catch(err) {
            return res.status(500).json({message: "Something went wrong"});
        };
    };
};

const convertCompletedProjectTask = () => {
    return async (req, res, next) => {
        try {   
            let data = await db.getProjectTasks(req.params.id);
            let mapped = data.map(cur => {
                if (cur.completed > 1) {
                    cur.completed = true;
                } else {
                    cur.completed = false;
                };
                return cur;
            })
            req.tasks = mapped;
            next();
        } catch(err) {
            res.status(500).json({message: "Something went wrong"});
        };
    };
};

module.exports = {
    convertCompleted,
    convertCompletedAll,
    convertCompletedProjectTask
};