import express, {Request, Response} from "express";
import {validationResult} from "express-validator";

import {createPostValidation} from "../validators/PostValidation.ts";
import PostSchema from "../models/Post.ts";
import {checkAuth} from "../utils/chechAuth.ts";

const router = express.Router();


router.get('', async (req: Request, res: Response) => {
    try {
        const posts = await PostSchema.find().populate('author').exec();
        res.status(200).json({
            success: true,
            result: posts,
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
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const postId = req.params?.id
        if (!postId) {
            return res.status(400).json({
                success: false,
                result: 'Post id is required',
                status: 400,
                message: 'Post id is required',
            });
        }
        const post = await PostSchema
            .findOneAndUpdate({ _id: postId }, { $inc: { viewsCount: 1 } }, { new: true })
            .populate('author').exec();

        if (!post) {
            return res.status(404).json({
                success: false,
                result: 'Post not found',
                status: 404,
                message: 'Post not found',
            });
        }
        res.status(200).json({
            success: true,
            result: post,
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
router.post('', checkAuth, createPostValidation, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const doc = new PostSchema({
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags,
            avatarUrl: req.body.avatarUrl,
            author:(req as any)?.userId,
        });

        const post = await doc.save();
        res.status(201).json({
            success: true,
            result: post,
            status: 201,
            message: 'Post created successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            result: error,
            status: 500,
            message: 'Something went wrong',
        });
    }
});

router.patch('/:id', async (req: Request, res: Response) => {

})
router.delete('/:id', async (req: Request, res: Response) => {

})
export default router;
