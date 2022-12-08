import React from "react";
import Button from '@mui/material/Button';

interface Props {
  children?: string;
  onClick: any;
  uuid: number
}

const MyButton: React.FC<Props> = ({ 
    children,
    onClick, 
    uuid
  }) => { 
  return (
    <button onClick={function() {onClick(uuid)}}>
    {children}
    </button>
  );
}

export default MyButton;