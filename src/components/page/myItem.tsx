import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import MyButton from "../buttons/button";
import pageService from "../../services/pageService";

type MyItemProps = {
  name: string;
  tags: any[];
  description: string;
  followers: string[];
  follow_requests: string[];
  id: number;
};

const MyItem = ({
  id,
  name,
  description,
  tags,
  followers,
  follow_requests,
}: MyItemProps) => {
  const navigate = useNavigate();

  return (
    <Grid item>
      <Card>
        <CardActionArea onDoubleClick={() => navigate(`page/${id}`)}>
          <CardMedia
            component="img"
            image={`images/jojo${(id || 8) % 8}.jpeg`}
            style={{ width: "300px" }}
          />
          <CardContent>
            <MyButton
              children="delete page"
              onClick={() => pageService.delete(id)}
            />
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description.slice(0, 20)}...
            </Typography>
            {followers.length ? (
              <Typography variant="body2" color="text.secondary">
                <b>Followers:</b>
                {followers.map((follower: string) => (
                  <div>
                    <span>{follower}</span>
                    <MyButton
                      children="delete"
                      onClick={() => pageService.deleteFollower(+follower, id)}
                    />
                  </div>
                ))}
              </Typography>
            ) : (
              <p>ebasos without followers</p>
            )}
            {follow_requests.length ? (
              <Typography variant="body2" color="text.secondary">
                <b>Follow requests:</b>
                {follow_requests.map((follower: string) => (
                  <div>
                    <span>{follower}</span>
                    <MyButton
                      children="deny"
                      onClick={() => pageService.deny(Number(follower), id)}
                    />
                    <MyButton
                      children="accept"
                      onClick={() => pageService.accept(+follower, id)}
                    />
                  </div>
                ))}
              </Typography>
            ) : (
              <p>ebasos without requests to follow</p>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default MyItem;
