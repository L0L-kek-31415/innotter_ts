import React from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { NavLink } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { useSelector } from "react-redux"
import { RootState } from "../../store/reducers/rootReducer";
import { UserState } from "../../store/reducers/userReducer"


const Nav = () => {  
    const name = useSelector<RootState, UserState>(state => state.user).userInfo?.username
    if (name)
        return(
            <Breadcrumbs separator='' aria-label="breadcrumb">
                <Link component={NavLink} to="/" underline="hover" color="inherit" variant="h4">
                    Main
                </Link>
                <Link component={NavLink} to="/recom" underline="hover" color="inherit" variant="h4">
                    For you 
                </Link>
                <Link component={NavLink} to="/create" underline="hover" color="inherit" variant="h4">
                    Create Page
                </Link>
                <Box sx={{ml: 40}}>
                    <Button variant='contained'>
                        <Link component={NavLink} to="/logout" underline="hover" color="inherit" variant="h6">
                            LogOut
                        </Link>
                    </Button>
                </Box>
            </Breadcrumbs>
        )
        else {
            return (
                <Breadcrumbs separator='' aria-label="breadcrumb">
                    <Link component={NavLink} to="/" underline="hover" color="inherit" variant="h4">
                        Main
                    </Link>
                    <Box sx={{ml: 40}}>
                        <Button variant='contained'>
                            <Link component={NavLink} to="/login" underline="hover" color="inherit" variant="h6">
                                LogIn
                            </Link>
                        </Button>
                        <Button variant='contained'>
                            <Link component={NavLink} to="/register" underline="hover" color="inherit" variant="h6">
                                SingUp
                            </Link>
                        </Button>
                    </Box>
            </Breadcrumbs>
            )
        }
   
}
export default Nav