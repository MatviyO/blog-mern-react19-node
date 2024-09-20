import { JSX } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { CommentsBlock, TagsBlock } from "../components";
import { PostsList } from "../components/pages/posts/PostsList";

export const Home = (): JSX.Element => {
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="News" />
        <Tab label="Populars" />
      </Tabs>
      <Grid container spacing={4}>
        <PostsList />
        <Grid xs={4} item>
          <TagsBlock />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Lora Dan",
                  imageUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "hen displaying three lines or m",
              },
              {
                user: {
                  fullName: "Lora Dan",
                  imageUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          >
            <div />
          </CommentsBlock>
        </Grid>
      </Grid>
    </>
  );
};
