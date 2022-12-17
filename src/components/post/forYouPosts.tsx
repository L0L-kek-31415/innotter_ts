import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PostItem from "./postItem";
import postService from "../../services/postService";

const ForYouPostList = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response;
        response = await postService.getPostsForMe();

        setPosts(response.data);
      } catch (err) {
        console.log("Oh fuck, we've got another error");
      }
    };
    fetchPosts();
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

  return <Container>{render}</Container>;
};

export default ForYouPostList;
