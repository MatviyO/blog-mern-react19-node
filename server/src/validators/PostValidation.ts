import {body} from "express-validator";

export const createPostValidation = [
    body('title', 'Title is required').isLength({min: 3}).isString(),
    body('description', 'Description is required').isLength({min: 3}).isString(),
    body('avatarUrl', 'Avatar url is optional and should be url').optional().isURL().isString(),
    body('tags', 'Tags is required').isArray(),
]