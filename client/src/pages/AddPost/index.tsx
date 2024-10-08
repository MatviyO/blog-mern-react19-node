import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styles from "./AddPost.module.scss";
import { postSchema } from "../../cores/schemas/postSchema";
import { IPostForm } from "../../cores/types/IPost";
import { useTypedSelector } from "../../redux/store";
import Api from "../../cores/services/axiosService";
import {
  useCreatePostMutation,
  useFetchPostByIdQuery,
  useUpdatePostMutation,
} from "../../redux/services/posts/postsApi";

export const AddPost: FC = () => {
  const { id } = useParams();
  const app = useTypedSelector((state) => state.user);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdateLoading }] = useUpdatePostMutation();
  const { data: details, isLoading: isDetailsLoading } = useFetchPostByIdQuery(id || "");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<IPostForm>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
      imageUrl: "",
    },
    mode: "onChange",
  });
  const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      const file = event?.target?.files ? event?.target?.files[0] : null;
      if (!file) {
        alert("File not found");
        return;
      }
      formData.append("file", file);
      const { data } = await Api.post("/upload", formData);
      setValue("imageUrl", data?.result?.url || "");
      setImageUrl(data?.result?.url || "");
    } catch (error) {
      console.warn(`Upload Error ${error}`);
    }
  };

  const onClickRemoveImage = () => {
    setValue("imageUrl", "");
    setImageUrl("");
  };

  const onSubmit = async (data: IPostForm) => {
    try {
      if (id) {
        const result = await updatePost({ id, data }).unwrap();
        if (result) {
          navigate("/");
        }
      } else {
        const result = await createPost(data).unwrap();
        if (result) {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Input text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: "234",
      },
    }),
    [],
  );

  useEffect(() => {
    if (!app.user) {
      navigate("/");
    }
  }, [app]);

  useEffect(() => {
    if (details) {
      reset({
        title: details.title,
        description: details.description,
        tags: String(details?.tags),
        imageUrl: details.imageUrl,
      });
      setImageUrl(details?.imageUrl || "");
    }
  }, [details]);

  return (
    <Paper style={{ padding: 30 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          style={{ marginRight: 20 }}
          variant="outlined"
          size="large"
          onClick={() => inputFileRef.current?.click()}
        >
          Upload preview
        </Button>
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
        {imageUrl && (
          <>
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Remove
            </Button>
            <img
              style={{ width: "100%", height: 300, objectFit: "contain" }}
              className={styles.image}
              src={imageUrl}
              alt="Uploaded"
            />
          </>
        )}
        <br />
        <br />
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Header acticle..."
          fullWidth
          error={!!errors.title}
          helperText={errors.title?.message}
          {...register("title", { required: true })}
        />
        <TextField
          classes={{ root: styles.tags }}
          variant="standard"
          placeholder="Tags"
          fullWidth
          error={!!errors.tags}
          helperText={errors.tags?.message}
          {...register("tags", { required: true })}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <SimpleMDE {...field} className={styles.editor} options={options} />
          )}
        />
        <div className={styles.buttons}>
          <Button type="submit" size="large" variant="contained" disabled={!isValid}>
            {isLoading || isUpdateLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : id ? (
              "Update"
            ) : (
              "Publish"
            )}
          </Button>
          <a href="/">
            <Button size="large">Cancel</Button>
          </a>
        </div>
      </form>
    </Paper>
  );
};
