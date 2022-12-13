import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducer";
import { useNavigate } from "react-router-dom";
import { load } from "../../action/page/load";
import { PageState } from "../../store/reducers/pageReducer";
import Paper from "@mui/material/Paper";
import { SyntheticEvent, useEffect, useState } from "react";
import { IPage } from "../../store/reducers/pageReducer";
import { me } from "../../action/user/me";
import { Button, Stack, styled } from "@mui/material";

interface ITag {
  id: number;
  name: string;
}
interface IUser {
  id: number;
  username: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
  justifyContent: "space-between",
}));

export function MyPages() {
  var pages = null;
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(me());
    dispatch(load(navigate, "kek"));
    console.log("loading");
  }, []);
  pages = useSelector<RootState, PageState>((state) => state.pages).pages;

  return (
    <div style={{ margin: "100px" }}>
      {pages?.map((page: IPage) => {
        return (
          <div>
            <h2 className="title">{page.name}</h2>
            <div className="info">
              <p>tags: {page.tags.join(" ")}</p>
              <p>description: {page.description}</p>
              <p>Followers</p>
              <Stack spacing={2}>
                {page.followers.map((name) => (
                  <Item>
                    {name}
                    <Button>Delete</Button>
                  </Item>
                ))}
              </Stack>
              <p>Follow request</p>
              <Stack spacing={2}>
                {page.follow_requests.map((name: any) => (
                  <Item>
                    <span>{name}</span>
                    <Button>Accept</Button>
                    <Button>Deny</Button>
                  </Item>
                ))}
              </Stack>
            </div>
          </div>
        );
      })}
    </div>
  );
}
