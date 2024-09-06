import express, {Request, Response} from "express";

import PostSchema from "../models/Post.ts";

const TagsController = express.Router();

TagsController.get('', async (req: Request, res: Response) => {
    try {
        const posts = await PostSchema.find().limit(5).exec();
        const tags = posts.map(post => post.tags).flat().slice(0, 5);
        res.status(200).json({
            success: true,
            result: tags,
            status: 200,
            message: 'Successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            result: error,
            status: 500,
            message: 'Something went wrong',
        });
    }
})

export default TagsController;
