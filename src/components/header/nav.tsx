import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import React from "react";


interface Props {
  to: string,
  title: string,
}

const MyLink: React.FC<Props> = ({to, title}) => {
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
        <MyLink to='/' title="Pages"/>
        <MyLink to='/posts' title="Posts"/>
        <MyLink to='/recom' title="For you"/>
        <MyLink to='/mypages' title="My Pages"/>
        <MyLink to='/search' title="Search"/>

        <Box>
          <Button variant="contained">
          <MyLink to='/logout' title="LogOut"/>
          </Button>
        </Box>
      </Breadcrumbs>
    );
  else {
    return (
      <Breadcrumbs separator="" aria-label="breadcrumb">
        <MyLink to='/' title="Pages"/>
        <MyLink to='/posts' title="Posts"/>
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
