import React from "react";
import Button from "@mui/material/Button";

interface Props {
  children?: string;
  onClick: any;
}

const MyButton: React.FC<Props> = ({ children, onClick }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default MyButton;
