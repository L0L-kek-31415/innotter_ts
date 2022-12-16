import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import pageService from "../../services/pageService";
import SearchIcon from "@mui/icons-material/Search";
import ItemItem from "./item";
import Search from "./search";

const PageList = () => {
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        let response;
        // if (lol == 'lol'){
        response = await pageService.getPages();
        // }
        // else{
        //     response = lol
        // }
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
        <p>Ooops... Looks like there is no pages</p>
      </div>
    ) : (
      <Grid container spacing={6} marginTop={4} minWidth={10}>
        {pages.map(
          ({
            id,
            name,
            description,
            owner,
            tags,
            followers,
            follow_requests,
          }) => (
            <ItemItem
              id={id}
              name={name}
              description={description}
              tags={tags}
              owner={owner}
              followers={followers}
              follow_requests={follow_requests}
            />
          )
        )}
      </Grid>
    );

  return (
    <Container
      style={{
        marginTop: 10,
      }}
    >
      <div>{render}</div>
    </Container>
  );
};

export default PageList;
