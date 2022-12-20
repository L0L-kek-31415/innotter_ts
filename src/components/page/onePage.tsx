import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router-dom";
import pageService from "../../services/pageService";
import { IPage } from "../../store/reducers/pageReducer";
import postService from "../../services/postService";
import PostItem from "../post/postItem";

const OnePage = () => {
  let { id } = useParams();
  const [page, setPage] = useState<IPage>();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await pageService.getPageId(id);
        const res = await postService.postsByPage(id);
        setPage(response.data);
        setPosts(res.data);
      } catch (err) {
        console.log("Oh fuck, we've got another error", err);
      }
    };
    fetchPage();
  }, []);

  const render =
    posts.length === 0 ? (
      <div>
        <SearchIcon sx={{ fontSize: 128 }} />
        <p>Ooops... Looks like there is no posts</p>
      </div>
    ) : (
      <Grid container spacing={6} marginTop={4} minWidth={10}>
        {posts.map(({ id, page, content, created_at, updated_at, like }) => (
          <PostItem
            id={id}
            page={page}
            content={content}
            created_at={created_at}
            updated_at={updated_at}
            like={like}
          />
        ))}
      </Grid>
    );

  return (
    <div>
      <h1>Page</h1>
      <Grid item>
        <Card>
          <CardActionArea>
          <Tooltip title={page?.owner}>
            <Avatar alt="Avatar" src={`/images/avatar/jojo${(page?.id || 8) % 8}.jpeg`} style={{ width: "300px", height: "300px", float: "right"}} />
          </Tooltip>  
            <CardMedia
              component="img"
              image={`/images/jojo${(page?.id || 8) % 8}.jpeg`}
              style={{ width: "300px" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {page?.name}
              </Typography>
              <Tooltip title={page?.description}>
                <Typography variant="body2" color="text.secondary">
                  {page?.description.slice(0, 20)}...
                </Typography>
              </Tooltip>
              <Typography variant="body2" color="text.secondary">
                <b>Followers:</b> {page?.followers.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Follow requests:</b> {page?.follow_requests.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Tags:</b> {page?.tags}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Owner:</b> {page?.owner}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <h1>Posts</h1>
      {render}
    </div>
  );
};

export default OnePage;
