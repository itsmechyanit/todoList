const express = require("express");

const todolistcontroller = require("../controller/todocontroller");

const router = express.Router();

router.get("/", todolistcontroller.getLists);
router.get("/addListForm", todolistcontroller.generateListForm);
router.post("/createList", todolistcontroller.createList);
router.get("/:listId", todolistcontroller.getList);
router.post("/delete/:listId", todolistcontroller.deleteItem);
router.post("/addItem/:listId", todolistcontroller.addItem);
module.exports = router;
