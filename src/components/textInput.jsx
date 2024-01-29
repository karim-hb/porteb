import { TextField } from "@mui/material";
import React from "react";

const TextInput = ({ label, onChange, value, type = "text",autoFocus }) => {
  return (
    <>
      <TextField
        variant="outlined"
        label={label}
        fullWidth
        onChange={(e) => onChange(e.target.value)}
        value={value}
        type={type}
        autoFocus={autoFocus}
      />
    </>
  );
};

export default TextInput;
