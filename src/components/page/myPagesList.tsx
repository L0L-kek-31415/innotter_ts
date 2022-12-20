import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import pageService from "../../services/pageService";
import SearchIcon from "@mui/icons-material/Search";

import MyItem from "./myItem";
import MyButton, { MyOutButton } from "../buttons/button";
import { useNavigate } from "react-router-dom";

const MyPageList = () => {
  const [pages, setPages] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await pageService.getMyPages();
        setPages(response.data);
      } catch (err) {
        console.log("Oh fuck, we've got another error");
      }
    };
    fetchPages();
  }, []);

  const render =
    pages.length === 0 ? (
      <div>
        <SearchIcon sx={{ fontSize: 128 }} />
        <p>Ooops... Looks like there is no pages in category</p>
        <MyButton onClick={() => navigate("/createpage")} children="Add Page" />
      </div>
    ) : (
      <Grid container spacing={12} marginTop={1} minWidth={10}>
        {pages.map(
          ({
            id,
            name,
            description,
            owner,
            tags,
            uuid,
            followers,
            follow_requests,
          }) => (
            <MyItem
              id={id}
              name={name}
              description={description}
              tags={tags}
              uuid={uuid}
              followers={followers}
              follow_requests={follow_requests}
            />
          )
        )}
      </Grid>
    );

  return (
    <Container>
      <MyOutButton
        onClick={() => navigate("/createpage")}
        children="Add Page"
        variant="large"
      />
      <span> </span>
      <MyOutButton
        onClick={() => navigate("/createpost")}
        children="Add Post"
        variant="large"
      />
      {render}
    </Container>
  );
};

export default MyPageList;
