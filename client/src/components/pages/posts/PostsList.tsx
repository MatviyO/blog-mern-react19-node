import { JSX } from "react";
import Grid from "@mui/material/Grid";
import { Post } from "../../Post";
import { useFetchPostsQuery } from "../../../redux/services/posts/postsApi";

export const PostsList = (): JSX.Element => {
  const { data } = useFetchPostsQuery();
  console.log(data, "data");

  return (
    <Grid xs={8} item>
      {data?.map((item) => (
        <Post item={item} commentsCount={3} />
      ))}
    </Grid>
  );
};
