import { JSX } from "react";
import Grid from "@mui/material/Grid";
import { Post } from "../../Post";
import { useFetchPostsQuery } from "../../../redux/services/posts/postsApi";

export const PostsList = (): JSX.Element => {
  const { data, isLoading } = useFetchPostsQuery();

  return (
    <Grid xs={8} item>
      {data?.map((item) => (
        // eslint-disable-next-line no-underscore-dangle
        <Post key={item._id} item={item} commentsCount={item?.viewsCount} isLoading={isLoading} />
      ))}
    </Grid>
  );
};
