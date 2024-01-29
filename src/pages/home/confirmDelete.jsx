import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmDelete = ({ item, patients, removed }) => {
  const navigate = useNavigate();
  const removeHandle = async () => {
    patients.delete(item?.id);
    removed();
    navigate("/");
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { md: "90%", xs: "100%" },
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 2,
        borderRadius: 2,
        overflow: "auto",
        maxHeight: "95%",
        maxWidth: "400px",
      }}
    >
      <div className="py-4 px-3  mb-4 flex justify-between items-center border-b">
        <span className="text-2xl font-bold"> حذف بیمار </span>
        <div></div>
      </div>
      <div className="">
        <span className="text-xl">
          {" "}
          آیا از حذف {item.patinet_name} اطمینان دارید ؟‌
        </span>
      </div>
      <div className="flex col-span-2 justify-between items-center mt-5">
        <Button
          sx={{ width: "9rem", height: "2.6rem" }}
          variant="contained"
          color="error"
        >
          انصرف
        </Button>
        <Button
          sx={{ width: "9rem", height: "2.6rem" }}
          variant="contained"
          onClick={removeHandle}
          color="success"
        >
          حذف بیمار
        </Button>
      </div>
    </Box>
  );
};

export default ConfirmDelete;
