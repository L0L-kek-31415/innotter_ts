import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { PostButton } from "./postButton";

type PostProps = {
  page: number;
  content: string;
  created_at: any;
  updated_at: any;
  like: any;
  id: number;
};

const PostItem = ({
  id,
  page,
  content,
  like,
  created_at,
  updated_at,
}: PostProps) => {
  return (
    <Grid item>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            image={`images/jojo${(id || 8) % 8}.jpeg`}
            style={{ width: "300px" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {page}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {content.slice(0, 20)}...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Likes:</b> {like.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Updated:</b>{" "}
              {created_at.replace("T", ".").split(".").slice(0, 2).join(" ")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Created:</b>{" "}
              {updated_at.replace("T", ".").split(".").slice(0, 2).join(" ")}
            </Typography>
            <PostButton list_liked={like} post_id={id} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default PostItem;
