import React, { FC } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import { useFetchTagsQuery } from "../redux/services/tags/tagsApi";

type Props = {};
export const TagsBlock: FC<Props> = () => {
  const { data: items, isLoading } = useFetchTagsQuery();
  return (
    <SideBlock title="Tags">
      <List>
        {isLoading
          ? [...Array(5)]
          : items?.map((name: string, i: React.Key) => (
              <a style={{ textDecoration: "none", color: "black" }} href={`/tags/${name}`}>
                <ListItem key={i} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <TagIcon />
                    </ListItemIcon>
                    {isLoading ? <Skeleton width={100} /> : <ListItemText primary={name} />}
                  </ListItemButton>
                </ListItem>
              </a>
            ))}
      </List>
    </SideBlock>
  );
};
