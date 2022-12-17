import { AppBar, Container } from "@mui/material";
import Nav from "./nav";

const Header = () => {
  return (
    <AppBar position="fixed">
      <Container>
        <Nav />
      </Container>
    </AppBar>
  );
};

export default Header;
