import { FC, JSX } from "react";

import { useParams } from "react-router-dom";
import { Post, Index, CommentsBlock } from "../components";
import { useFetchPostByIdQuery } from "../redux/services/posts/postsApi";

export const FullPost: FC = (): JSX.Element => {
  const params = useParams();

  const { data, isLoading } = useFetchPostByIdQuery(params?.id || "");

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  return (
    <>
      <Post item={data} commentsCount={3} isLoading={isLoading} isFullPost>
        <p>{data?.description}</p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Lora D ",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "hen displaying three lines or m",
          },
          {
            user: {
              fullName: "Lora D ",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
