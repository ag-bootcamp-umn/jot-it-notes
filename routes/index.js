const router = require('express').Router();
const apiRoutes = require("./api");
const pageRoutes = require("./pages");

// re-route to pages or api folders
router.use("/api", apiRoutes)
router.use("*", pageRoutes)


module.exports = router;