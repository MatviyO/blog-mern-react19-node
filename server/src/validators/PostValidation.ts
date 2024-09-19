import {body} from "express-validator";

export const createPostValidation = [
    body('title', 'Title is required').isLength({min: 3}).isString(),
    body('description', 'Description is required').isLength({min: 3}).isString(),
    body('imageUrl', 'Avatar url is optional and should be url').optional().isString(),
    body('tags', 'Tags is optional').optional().isString(),
]
