import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styles from "./AddPost.module.scss";
import { postSchema } from "../../cores/schemas/postSchema";
import { IPostForm } from "../../cores/types/IPost";
import { useTypedSelector } from "../../redux/store";
import Api from "../../cores/services/axiosService";
import { fetchUserLogin } from "../../redux/slices/userSlice";
import { useCreatePostMutation } from "../../redux/services/posts/postsApi";

export const AddPost: FC = () => {
  const app = useTypedSelector((state) => state.user);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [createPost, { isLoading }] = useCreatePostMutation();
  const {
    register,
    handleSubmit,
    control,
    setValue,
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
      const result = await createPost(data).unwrap();
      if (result) {
        navigate("/");
      }
      console.log("Post created:", result);
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

  return (
    <Paper style={{ padding: 30 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button variant="outlined" size="large" onClick={() => inputFileRef.current?.click()}>
          Upload preview
        </Button>
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
        {imageUrl && (
          <>
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Remove
            </Button>
            <img className={styles.image} src={imageUrl} alt="Uploaded" />
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
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Publish"}
          </Button>
          <a href="/">
            <Button size="large">Cancel</Button>
          </a>
        </div>
      </form>
    </Paper>
  );
};
