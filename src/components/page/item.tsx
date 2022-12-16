import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { PageButtons } from "./pageButtons";

type ItemItemProps = {
  name: string;
  tags: any[];
  description: string; 
  followers: string[];
  follow_requests: string[];
  owner: string;
  id: number;
};

const ItemItem = ({
  id,
  name,
  description,
  tags,
  followers,
  owner,
  follow_requests,
}: ItemItemProps) => {
  const navigate = useNavigate();
  return (
    <Grid item>
      <Card>
        <CardActionArea onDoubleClick={() => navigate(`page/${id}`)}>
          <CardMedia
            component="img"
            image={`images/jojo${(id || 8) % 8}.jpeg`}
            style={{ width: "300px" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description.slice(0, 20)}...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Followers:</b> {followers.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Follow requests:</b> {follow_requests.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Tags:</b> {tags}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Owner:</b> {owner}
            </Typography>
            <PageButtons
              list_followers={follow_requests.concat(followers)}
              owner={owner}
              page_id={id}
            />
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ItemItem;
