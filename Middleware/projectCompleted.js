const db = require("../data/dbHelpers/projects");

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
            next(err);
        };
    };
};

const convertCompleted = () => {
    return async (req, res, next) => {
        try {
            let data = await db.findById(req.params.id);
            
            data.completed ? data.completed = true : data.completed = false;
            res.project = data;
            next();
        } catch(err) {
            return res.status(500).json({message: "Something went wrong"})
        };
    };
};

module.exports = {
    convertCompleted,
    convertCompletedAll
};