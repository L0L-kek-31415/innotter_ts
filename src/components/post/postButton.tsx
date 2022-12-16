import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import MyButton from "../buttons/button";
import postService from "../../services/postService";

interface Props {
  list_liked: string[];
  post_id: number;
}

export const PostButton: React.FC<Props> = ({
  list_liked, 
  post_id,
}) => {
  // @ts-ignore
  const id = useSelector((state) => state.user.id);
    if (id && list_liked.includes(id)) {
    return (
      <MyButton
        onClick={() => postService.unlike(post_id)}
        children="unlike"
      />
    );
  } else if (id && !list_liked.includes(id)) {
    return (
      <MyButton onClick={() => postService.like(post_id)} children="like" />
    );
  } else {
    return <Typography>You need to login first</Typography>;
  }
};
