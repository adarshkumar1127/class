const express = require("express");
const { getNote, createNote, deleteNote, updateNote } = require("../controllers/noteController");
const auth = require("../middlewares/auth");
const noteRouter = express.Router();

noteRouter.get("/",auth, getNote);

noteRouter.post("/",auth, createNote);

noteRouter.delete("/:Id",auth, deleteNote);

noteRouter.put("/:Id",auth, updateNote);

module.exports = noteRouter;