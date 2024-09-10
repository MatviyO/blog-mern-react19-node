import React from "react";
import Button from "@mui/material/Button";

import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Header.module.scss";
import { AppDispatch, useTypedSelector } from "../../redux/store";
import { logout } from "../../redux/slices/userSlice";

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const app = useTypedSelector((state) => state.user);

  const onClickLogout = () => {
    dispatch(logout());
    window.location.href = "/";
    window.localStorage.removeItem("user");
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Matvii Oleh</div>
          </Link>
          <div className={styles.buttons}>
            {app.user ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained">Write article</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Create account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
