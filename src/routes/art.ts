import { Router } from "express";


const router = Router();

router.get("/:id", (req, res) => {

    res.send("Hello, World!");
});

router.get('/', (req, res) => {
    res.send('Hello, World!');
})

router.post("/:id/comments", (req, res) => { 

    res.send("Post comment");

})


export default router;
