import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import MyButton from "../buttons/button";
import pageService from "../../services/pageService";

interface Props {
  list_followers: string[];
  owner: string;
  page_id: number;
}

export const PageButtons: React.FC<Props> = ({
  list_followers,
  owner,
  page_id,
}) => {
  // @ts-ignore
  const username = useSelector((state) => state.user.username);
  if (username === owner) {
    return <Typography>You are the owner</Typography>;
  } else if (username && list_followers.includes(username)) {
    return (
      <MyButton
        onClick={() => pageService.unfollow(page_id)}
        children="unfollow"
      />
    );
  } else if (username && !list_followers.includes(username)) {
    return (
      <MyButton onClick={() => pageService.follow(page_id)} children="follow" />
    );
  } else {
    return <Typography>You need to login first</Typography>;
  }
};
