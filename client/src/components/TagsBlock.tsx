import React, { FC } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { Link } from "react-router-dom";
import { SideBlock } from "./SideBlock";
import { useFetchTagsQuery } from "../redux/services/tags/tagsApi";

type Props = {};
export const TagsBlock: FC<Props> = () => {
  const { data: items, isLoading } = useFetchTagsQuery();

  if (isLoading) return <Skeleton width="100%" height={55} />;
  if (!items?.length) return <Skeleton width="100%" height={55} />;
  return (
    <SideBlock title="Tags">
      <List>
        {items?.map((name: string, i: React.Key) => (
          <ListItem key={`${name}-${i}`} disablePadding>
            <Link style={{ textDecoration: "none", color: "black" }} to={`/tags/${name}`}>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? <Skeleton width={100} /> : <ListItemText primary={name} />}
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </SideBlock>
  );
};
