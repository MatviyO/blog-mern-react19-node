import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Login.module.scss";
import { useAsyncAction } from "../../hooks/useAsyncAction";
import { FetchLoginResponseDispatch, IUserLogin, IUserRegister } from "../../redux/types/userType";
import { fetchUserRegister } from "../../redux/slices/userSlice";
import { registerSchema } from "../../cores/schemas/registerSchema";

export const Registration: FC = () => {
  const { executeAction } = useAsyncAction<FetchLoginResponseDispatch>();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: IUserLogin) => {
    const res = (await executeAction(fetchUserRegister(data))) as FetchLoginResponseDispatch;
    if (res?.payload) {
      window.localStorage.setItem("user", JSON.stringify(res?.payload?.result));
      navigate("/");
    }
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Full name"
          fullWidth
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: true })}
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email", { required: true })}
        />
        <TextField
          className={styles.field}
          label="Password"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email", { required: true })}
        />
        <Button size="large" variant="contained" fullWidth>
          Sign up
        </Button>
      </form>
    </Paper>
  );
};
