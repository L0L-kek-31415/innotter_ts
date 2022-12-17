import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { useSelector } from "react-redux";

const MyLink = (to: string, title: string) => {
  return (
    <Link
      component={NavLink}
      to={to}
      underline="hover"
      color="inherit"
      variant="h4"
    >
      {title}
    </Link>
  );
};

const Nav = () => {
  // @ts-ignore
  const ownerId = useSelector((state) => state.user.id);
  console.log(ownerId);
  if (ownerId)
    return (
      <Breadcrumbs separator="" aria-label="breadcrumb">
        {MyLink("/", "Pages")}
        {MyLink("/posts", "Posts")}
        {MyLink("/recom", "For you")}
        {MyLink("/mypages", "My Pages")}
        {MyLink("/search", "Search")}
        <Box>
          <Button variant="contained">{MyLink("/logout", "LogOut")}</Button>
        </Box>
      </Breadcrumbs>
    );
  else {
    return (
      <Breadcrumbs separator="" aria-label="breadcrumb">
        {MyLink("/", "Pages")}
        {MyLink("/posts", "Posts")}
        <Box sx={{ ml: 40 }}>
          <Button variant="contained">
            <Link
              component={NavLink}
              to="/login"
              underline="hover"
              color="inherit"
              variant="h6"
            >
              LogIn
            </Link>
          </Button>
          <Button variant="contained">
            <Link
              component={NavLink}
              to="/register"
              underline="hover"
              color="inherit"
              variant="h6"
            >
              SingUp
            </Link>
          </Button>
        </Box>
      </Breadcrumbs>
    );
  }
};
export default Nav;
