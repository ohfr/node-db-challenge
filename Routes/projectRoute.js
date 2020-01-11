const express = require("express");

const router = express.Router();

const db = require("../data/dbHelpers/projects");

const { convertCompleted, convertCompletedAll } = require("../Middleware/projectCompleted");

const taskRoute = require("./taskRoute");

const resourceRoute = require("./resourceRoute");

router.use("/:id/tasks", taskRoute);

router.use("/:id/resources", resourceRoute);

router.get("/", convertCompletedAll(), async (req, res, next) => {
    try {
        res.json(res.projects);
    } catch(err) {
        next(err);
    };
});

router.get("/:id", convertCompleted(), async (req, res, next) => {
    try {
        res.json(res.project);
    } catch(err) {
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