import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { http } from "../../scripts/api";
import { API_ENDPOINTS } from "../../scripts/api/routes";
import ExportData from "./exportData";

const UserDetails = ({ alluserData }) => {
  const [user, setUser] = useState({});
  const [openToast, setOpenToast] = useState(false);

  const [daysLeft, setDaysLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    content: "",
    type: "success",
  });
  useEffect(() => {
    if (alluserData) setUser(alluserData);
  }, [alluserData]);
  console.log(user,'user')
  useEffect(() => {
    if (
      user?.accountExpiryDate &&
      new Date(user?.accountExpiryDate) > new Date()
    ) {
      const calculateDaysLeft = () => {
        const currentDate = new Date();
        const targetDateTime = new Date(user?.accountExpiryDate);

        const difference = targetDateTime - currentDate;

        const daysRemaining = Math.ceil(difference / (1000 * 60 * 60 * 24));

        setDaysLeft(daysRemaining);
      };

      calculateDaysLeft();

      const intervalId = setInterval(calculateDaysLeft, 24 * 60 * 60 * 1000);

      return () => clearInterval(intervalId);
    }
  }, [user?.accountExpiryDate]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    http
      .put(
        API_ENDPOINTS.me,
        {
          ...user,
        },
        {
          headers: {
            Authorization: `Bearer ${alluserData?.token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        localStorage.setItem("userInfo" , JSON.stringify({...user}))
        setMessage({
          content: "با موفقیت ویرایش شد",
          type: "success",
        });
      })
      .catch((err) => {
        setOpenToast(true);
        setMessage({
          content: err.response?.data,
          type: "error",
        });
        setLoading(false);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
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
        maxWidth: "900px",
      }}
    >
      {" "}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={openToast}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={message.type}
          sx={{ width: "100%" }}
        >
          {message.content}
        </Alert>
      </Snackbar>
      <div className=" flex justify-between items-center gap-5">
        <h2 className="font-bold ">اطلاعات اشتراک : </h2>
        <h3>
          {!user?.accountExpiryDate ? (
            <>
              {" "}
              <span className="text-red-600 text-xs">
                شما اکانت فعال ندارید
              </span>
            </>
          ) : (
            <div className="flex gap-1 items-center">
              {new Date(user?.accountExpiryDate).toLocaleDateString("fa-ir")}
              {new Date(user?.accountExpiryDate) > new Date() ? (
                <span className="text-xs text-green-600">
                (  {daysLeft} روز مانده )
                </span>
              ) : (
                <span className="text-red-600 text-xs">
                (   اکانت شما منقضی شده است)
                </span>
              )}
             
            </div>
          )}
        </h3>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 border-t mt-4 pt-4"
      >
        <div className="flex">
          <h2 className="font-bold ">اطلاعات شخصی - </h2>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <TextField
            variant="outlined"
            disabled
            label="شماره همراه"
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
            value={user?.phoneNumber}
          />
          <TextField
            variant="outlined"
            label="نام"
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            value={user?.first_name}
          />
          <TextField
            variant="outlined"
            label="نام خانوادگی"
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            value={user?.last_name}
          />
          <TextField
            variant="outlined"
            label="شماره ملی"
            onChange={(e) =>
              setUser({ ...user, national_code: e.target.value })
            }
            value={user?.national_code}
          />
        </div>
        <div className="flex justify-end items-center">
          <Button type="submit" disabled={loading} variant="contained">
            {loading ? (
              <>
                {" "}
                <CircularProgress size={27} />
              </>
            ) : (
              <> ثبت اطلاعات</>
            )}
          </Button>
        </div>
      </form>
      <div className="border-t mt-4 pt-4 flex flex-col gap-5">
        <div className="flex">
          <h2 className="font-bold ">اطلاعات پرونده - </h2>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-xs w-full">شما میتوانید پرونده های خود را آپلود یا دانلود کنید</span>
              <ExportData />
        </div>

      
      </div>
    </Box>
  );
};

export default UserDetails;
