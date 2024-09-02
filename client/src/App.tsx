import Container from "@mui/material/Container";

import { Header } from "./components";
import {AddPost, FullPost, Home, Login, Registration} from "./pages";
import {Route, Routes} from "react-router-dom";

function App() {
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
        <Home />
      </Container>
    </>
  );
}

export default App;
