import { FC } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { FetchLoginResponseDispatch, IUserLogin } from "../../redux/types/userType";
import { fetchUserLogin } from "../../redux/slices/userSlice";
import { useAsyncAction } from "../../hooks/useAsyncAction";
import { loginSchema } from "../../cores/schemas/loginSchema";

export const Login: FC = () => {
  const { executeAction } = useAsyncAction<FetchLoginResponseDispatch>();

  const navigate = useNavigate();
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

  const onSubmit = async (data: IUserLogin) => {
    const res = (await executeAction(fetchUserLogin(data))) as FetchLoginResponseDispatch;
    if (res?.payload) {
      window.localStorage.setItem("user", JSON.stringify(res?.payload?.result));
      navigate("/");
    }
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
