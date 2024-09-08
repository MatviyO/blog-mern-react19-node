import { FC } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Login.module.scss";
import { IUserLogin } from "../../redux/slices/userType";
import { fetchUserLogin } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

const loginSchema = z.object({
  email: z.string().email("Write correct email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: IUserLogin) => {
    dispatch(fetchUserLogin(data));
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password", { required: true })}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Login
        </Button>
      </form>
    </Paper>
  );
};
