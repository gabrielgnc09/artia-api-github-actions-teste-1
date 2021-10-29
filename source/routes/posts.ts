/** source/routes/posts.ts */
import express from "express";
import controller from "../controllers/posts";
import artiaController from "../controllers/artiaController";
const router = express.Router();

router.get("/posts", controller.getPosts);
router.get("/posts/:id", controller.getPost);
router.put("/posts/:id", controller.updatePost);
router.delete("/posts/:id", controller.deletePost);
router.post("/posts", controller.addPost);

//Artia routes
router.get("/getToken", artiaController.getToken);
router.get("/addComment", artiaController.addComment);
router.get("/listComments", artiaController.listComments);

export = router;
