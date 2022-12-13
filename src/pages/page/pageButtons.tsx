import { useSelector } from "react-redux";
import { start_follow } from "../../action/page/follow";
import { stop_follow } from "../../action/page/unfollow";
import MyButton from "../../components/buttons/button";
import { RootState } from "../../store/reducers/rootReducer";
import { UserState } from "../../store/reducers/userReducer";

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
  const username = useSelector<RootState, UserState>((state) => state.user)
    .userInfo?.username;
  if (username === owner) {
    return (
      <div>
        <p>You are the owner</p>
      </div>
    );
  } else if (username && list_followers.includes(username)) {
    return (
      <MyButton onClick={stop_follow} children="unfollow" uuid={page_id} />
    );
  } else if (username && !list_followers.includes(username)) {
    return <MyButton onClick={start_follow} children="follow" uuid={page_id} />;
  } else {
    return (
      <div>
        <p>You need to login first</p>
      </div>
    );
  }
};
