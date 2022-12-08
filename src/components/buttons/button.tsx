import { Button } from "@mui/material"


export const MyButton = (
    label: string, 
    onClick: any,
) => {
    return (<Button onClick={onClick} variant="contained">{label}</Button>)
}

