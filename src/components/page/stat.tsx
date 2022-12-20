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

interface IStat{
  page_id: any;
  followers: any;
  follow_requests: any;
  likes: any;
  posts: any;
}

const StatPage = () => {
  let { id } = useParams();
  const [stat, setStat] = useState<IStat>();

  useEffect(() => {
    const fetchPage = async () => {
        const response = await pageService.getstatistic(id)
        console.log(JSON.parse(response.data))
        setStat(JSON.parse(response.data))
    };
    fetchPage();
  }, []);

  return (
      <Grid item>
        <Card>
            <h1>statistics</h1>
          <CardActionArea>
            <Typography>
              This page have: <br />
              {stat?.follow_requests} - follow requests <br />
              {stat?.followers} - followers <br />
              {stat?.likes} - likes <br />
              {stat?.posts} - posts <br />
            </Typography>
            <CardContent>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
  );
};

export default StatPage;
