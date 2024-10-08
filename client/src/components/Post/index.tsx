import React, { FC, ReactNode } from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import { Link } from "react-router-dom";
import { _ } from "react-hook-form/dist/__typetest__/__fixtures__";
import { CircularProgress } from "@mui/material";
import styles from "./Post.module.scss";
import { UserInfo } from "../UserInfo";
import { PostSkeleton } from "./Skeleton";
import { IAuthor } from "../../cores/types/IAuthor";
import { useDeletePostMutation, useFetchPostByIdQuery } from "../../redux/services/posts/postsApi";

type PostProps = {
  item: {
    _id: string;
    title: string;
    createdAt: string;
    imageUrl?: string;
    author: IAuthor;
    viewsCount: number;
    tags: string[];
  };
  children?: ReactNode;
  isFullPost?: boolean;
  isLoading?: boolean;
  isEditable?: boolean;
  commentsCount: number;
};

export const Post: FC<PostProps> = ({
  item,
  children,
  isFullPost,
  isLoading,
  isEditable,
  commentsCount,
}) => {
  const { _id, title, createdAt, imageUrl, author, viewsCount, tags } = item;
  const [deletePost, { isLoading: isDeleteLoading }] = useDeletePostMutation(_id);

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm("Are u sure wont to delete?")) {
      deletePost(_id);
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          {isDeleteLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <IconButton onClick={onClickRemove} color="secondary">
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      )}
      {imageUrl && (
        <img
          style={{ width: "100%", height: 300, objectFit: "contain" }}
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...author} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags?.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
