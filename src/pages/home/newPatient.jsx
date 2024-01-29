import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/textInput";

const NewPatient = ({ patients, setOpen, item }) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const addNewPatient = async (event) => {
    event.preventDefault();
    setOpen(true);
    await patients.add({
      patinet_name: data.patinet_name,
      doctor: data.doctor,
      age: data.age,
      created_date: new Date(),
      updated_date: new Date(),
      cases: [],
    });
    setData({});
    navigate("/");
  };
  const updatePatientInfo = async (event) => {
    event.preventDefault();
    await patients.update(data.id, {
      patinet_name: data.patinet_name,
      doctor: data.doctor,
      age: data.age,
      created_date:data.created_date,
      updated_date: new Date(),
      cases: data?.cases,
    });
    setData({});
    navigate("/");
  };
  useEffect(() => {
    if (item) {
      setData(item);
    }
  }, [item]);
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
        maxWidth: "700px",
      }}
    >
      <div className="py-4 px-3  mb-4 flex justify-between items-center border-b">
        <span className="text-xl">ثبت بیمار جدید</span>
        <div></div>
      </div>
      <form
        onSubmit={(e) => (item ? updatePatientInfo(e) : addNewPatient(e))}
        className="grid grid-cols-2 gap-3"
      >
        <TextInput
          onChange={(value) => setData({ ...data, doctor: value })}
          label=" ارجاع"
          value={data?.doctor || ""}
          
        />
        <TextInput
          onChange={(value) => setData({ ...data, patinet_name: value })}
          label="نام و نام خانوادگی بیمار "
          value={data?.patinet_name || ""}
          autoFocus
        />
        <TextInput
          onChange={(value) => setData({ ...data, age: value })}
          label="   سن بیمار"
          type="number"
          value={data?.age || ""}
        />{" "}
        <div className="flex col-span-2 justify-between items-center mt-5">
          <Button
            sx={{ width: "9rem", height: "3rem" }}
            variant="contained"
            color="error"
            onClick={() => navigate("/")}
          >
            انصرف
          </Button>
          <Button
            sx={{ width: "9rem", height: "3rem" }}
            variant="contained"
            type="submit"
            color="success"
          >
            ثبت اطلاعات
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default NewPatient;
