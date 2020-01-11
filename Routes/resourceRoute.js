const express = require("express");

const router = express.Router({
    mergeParams: true
});

const db = require("../data/dbHelpers/resources");


router.get("/", async (req, res, next) => {
    try {
        res.json(await db.findProjectResources(req.params.id));
    } catch(err) {
        next(err);
    };
});

router.get("/all", async (req, res, next) => {
    try {
        res.json(await db.find());
    } catch(err) {
        next(err);
    };
});

router.get("/:r_id", async (req, res, next) => {
    try {
        res.json(await db.findById(req.params.r_id));
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