import React, { FC, SetStateAction, useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./AddPost.module.scss";
import { postSchema } from "../../cores/schemas/postSchema";
import { IPostForm } from "../../cores/types/IPost";
import { useTypedSelector } from "../../redux/store";

export const AddPost: FC = () => {
  const app = useTypedSelector((state) => state.user);
  const navigate = useNavigate();
  const imageUrl = "";
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IPostForm>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onChange",
  });
  const handleChangeFile = () => {};

  const onClickRemoveImage = () => {};

  const onSubmit = async (data: IPostForm) => {
    // const res = (await executeAction(fetchUserLogin(data))) as FetchLoginResponseDispatch;
    // if (res?.payload) {
    //   window.localStorage.setItem("user", JSON.stringify(res?.payload?.result));
    //   navigate("/");
    // }
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
  if (!app.user) {
    navigate("/");
  }

  return (
    <Paper style={{ padding: 30 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button variant="outlined" size="large">
          Upload preview
        </Button>
        <input type="file" onChange={handleChangeFile} hidden />
        {imageUrl && (
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Remove
          </Button>
        )}
        {imageUrl && (
          <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
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
          <Button size="large" variant="contained" disabled={!isValid}>
            Publish
          </Button>
          <a href="/">
            <Button size="large">Cancel</Button>
          </a>
        </div>
      </form>
    </Paper>
  );
};
