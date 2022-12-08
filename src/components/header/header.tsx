import { AppBar, Container, Toolbar } from "@mui/material";
import Nav from "./nav";


const Header = () => {
    return (
        <AppBar position='fixed' >
            <Container>
                <Toolbar>
                    <Nav />
                </Toolbar>
            </Container>
        </AppBar>
    )
}   

export default Header