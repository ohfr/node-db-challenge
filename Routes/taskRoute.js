const express = require("express");

const router = express.Router({
    mergeParams: true
});

const db = require("../data/dbHelpers/tasks");

const { convertCompleted, convertCompletedAll, convertCompletedProjectTask } = require("../Middleware/tasksCompleted");

router.get("/:task_id", convertCompleted(), async (req, res, next) => {
    try {
        res.json(req.task);
    } catch(err) {
        next(err);
    };
});

//doesnt do anything for whatever reason ?
router.get("/all", convertCompletedAll(), async (req, res, next) => {
    try {
        res.json(req.tasks);
    } catch(err) {
        next(err);
    };
});

router.get("/",convertCompletedProjectTask(),  async (req, res, next) => {
    try {
        res.json(req.tasks);
    }catch(err) {
        next(err);
    };
});

router.post("/", async (req, res, next) => {
    try {
        res.json(await db.add(req.body));
    } catch(err) {
        next(err);
    };
});

router.put("/:id", async (req, res, next) => {
    try {
        res.json(await db.update(req.params.id, req.body));
    } catch(err) {
        next(err);
    };
});

router.delete("/:id", async (req, res, next) => {
    try {
        res.json(await db.remove(req.params.id));
    } catch(err) {
        next(err);
    };
});

module.exports = router;