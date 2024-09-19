import express, {Request, Response} from "express";
import {validationResult} from "express-validator";

import {createPostValidation} from "../validators/PostValidation.ts";
import PostSchema from "../models/Post.ts";
import {authenticationGuard} from "../utils/authenticationGuard.ts";
import {ValidationErrorsMiddleware} from "../middlewares/validationErrorsMiddleware.ts";

const PostController = express.Router();

PostController.get('', async (req: Request, res: Response) => {
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
PostController.get('/:id', async (req: Request, res: Response) => {
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
// explanation: first we check validation with express-validator and after parse errors by ValidationErrorsMiddleware
PostController.post('', authenticationGuard, createPostValidation, ValidationErrorsMiddleware, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const doc = new PostSchema({
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags.split(',').map((tag: string) => tag.trim()),
            imageUrl: req.body.imageUrl,
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
PostController.patch('/:id', authenticationGuard, createPostValidation, ValidationErrorsMiddleware, async (req: Request, res: Response) => {
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
            .findOneAndUpdate({ _id: postId }, {
                title: req.body.title,
                description: req.body.description,
                tags: req.body.tags,
                imageUrl: req.body.imageUrl,
                author:(req as any)?.userId,
            }, { new: true })
            .populate('author').exec();
        if (!post) {
            return res.status(404).json({
                success: false,
                result: 'Post not found',
                status: 404,
                message: 'Post not found',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            result: error,
            status: 500,
            message: 'Something went wrong',
        });
    }
})
PostController.delete('/:id', authenticationGuard, async (req: Request, res: Response) => {
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
            .findOneAndDelete({ _id: postId });
        if (!post) {
            return res.status(404).json({
                success: false,
                result: 'Post not found',
                status: 404,
                message: 'Post not found',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            result: error,
            status: 500,
            message: 'Something went wrong',
        });
    }

})

export default PostController;
