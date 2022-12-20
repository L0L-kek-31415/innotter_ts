import React from "react";
import Button from "@mui/material/Button";

interface Props {
  children?: string;
  onClick: any;
  variant?: string;
}

const MyButton: React.FC<Props> = ({ children, onClick }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export const MyOutButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <Button onClick={onClick} size="large" variant="contained">
      {children}
    </Button>
  );
};

export default MyButton;
