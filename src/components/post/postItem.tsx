import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

type PostProps = {
  page: number;
  content: string;
  created_at: any;
  updated_at: any;
  like: any;
  id: number;
};
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
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
            image={`images/jojo${getRandomInt(8)}.jpeg`}
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
              <b>Likes:</b> {like}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Updated:</b> {created_at}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Created:</b> {updated_at}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default PostItem;
