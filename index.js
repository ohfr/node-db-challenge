const express = require("express");

const PORT = process.env.PORT || 5000;

const projectRoute = require("./Routes/projectRoute");

const resourceRoute = require("./Routes/resourceRoute");

const taskRoute = require("./Routes/taskRoute");

const server = express();

server.use(express.json());

server.use("/projects", projectRoute);

server.use("/resources", resourceRoute);

server.use("/tasks", taskRoute);

server.use((err, req, res, next) => {
    console.log("Error:", err)
  
    res.status(500).json({
      message: "Something went wrong",
    })
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});