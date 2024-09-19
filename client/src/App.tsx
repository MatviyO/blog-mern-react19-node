import Container from "@mui/material/Container";

import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./components";
import { AddPost, FullPost, Home, Login, Registration } from "./pages";
import { useAsyncAction } from "./hooks/useAsyncAction";
import { FetchLoginResponseDispatch } from "./redux/types/userType";
import { fetchGetMe } from "./redux/slices/userSlice";

function App() {
  const { executeAction } = useAsyncAction<FetchLoginResponseDispatch>();

  useEffect(() => {
    executeAction(fetchGetMe());
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/posts/create" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
