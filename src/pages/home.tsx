import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/reducers/rootReducer"
import { UserState } from "../store/reducers/userReducer"
import Link from '@mui/material/Link';
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { load } from "../action/page/load";
import { PageState } from "../store/reducers/pageReducer";
import Paper from '@mui/material/Paper';



export function Home () {
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        dispatch(load(navigate))

      };

    return (
        <div>
            <div style={{width: "100%", margin: "100px"}}></div>
        <div>
            <Button onClick={handleSubmit} variant="contained">LOAD PAGES</Button>
        </div>
        </div>
    )
} 

