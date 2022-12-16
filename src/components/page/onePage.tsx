import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";
import { PageButtons } from "./pageButtons";
import { useParams } from "react-router-dom";
import pageService from "../../services/pageService";
import { IPage } from "../../store/reducers/pageReducer";
import { getRandomInt } from "../../helper/randomInt";
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
        setPage(response.data);
        const res = await postService.postsByPage(id)
        setPosts(res.data)
      } catch (err) {
        console.log("Oh fuck, we've got another error");
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
        {posts.map(
          ({
            id,
            page, 
            content, 
            created_at, 
            updated_at,
            like,
          }) => (
            <PostItem
              id={id}
              page={page}
              content={content}
              created_at={created_at}
              updated_at={updated_at}
              like={like}
            />
          )
        )}
      </Grid>
    );
  
  const navigate = useNavigate();
  return (
    <Grid item>
      <Card style={{marginTop: "100px"}}>
        <h1>Page</h1>
        <CardActionArea>
         <CardMedia
            component="img"
            image={`images/jojo${getRandomInt(8)}.jpeg`}
            style={{ width: "300px"}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {page?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {page?.description.slice(0, 20)}...
            </Typography>
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
      <h2>Posts</h2>
      <div>{render}</div>
    </Grid>
  );
};

export default OnePage;
