import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../action/user/logout";

export default function LogOut() {  

    const dispatch = useDispatch<any>()
    const navigate = useNavigate();
    dispatch(logout(navigate))    
    return (
        <h1>bye, ebanat</h1>
    )
}