import InputIcon from "@mui/icons-material/Input";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

import { http } from "../../scripts/api";
import { API_ENDPOINTS } from "../../scripts/api/routes";
import { persianToEnglish, toEnglish } from "../../scripts/functions";
import { useCountdown } from "../../scripts/hooks/userCountdown";

function Otp({ handleBack, setUserData }) {
  const [data, setData] = useState({ codeTypeCode: "PreLoginByOTPForTaxApp" });
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState({
    content: "",
    type: "success",
  });
  const navigate = useNavigate();
  const [err, setError] = useState("");
  const [step, setStep] = useState(1);
  const { minutes, seconds, reset } = useCountdown(120);
  const isMd = useMediaQuery("(min-width:900px)");
  const otpGenrator = (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    http
      .post(API_ENDPOINTS.auth.genrateOtp, { phoneNumber: data.phoneNumber })
      .then((res) => {
        setLoading(false);
        setStep(2);
        reset();
      })
      .catch((err) => {
        setOpenToast(true);
        setMessage({
          content: err.response.data,
          type: "error",
        });
        setLoading(false);
      });
  };
  const checkOtp = () => {
    setLoading2(true);
    http
      .post(API_ENDPOINTS.auth.login, {
        phoneNumber: data.phoneNumber,
        OTP: data.code,
      })
      .then((res) => {
        setLoading2(false);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ ...res.data, phoneNumber: data?.phoneNumber })
        );
        setUserData({ ...res.data, phoneNumber: data?.phoneNumber });
        setMessage({
          content: "با موفقیت وارد شدید",
          type: "success",
        });
        navigate("/");
      })
      .catch((err) => {
        setOpenToast(true);
        setMessage({
          content: err.response?.data,
          type: "error",
        });
        setLoading2(false);
      });
  };
  useEffect(() => {
    if (data?.code?.length === 3) {
      checkOtp();
    }
  }, [data?.code]);
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
        maxWidth: "500px",
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
      <div className="px-4">
        {step === 1 ? (
          <>
            <Box
              sx={{
                px: "15px",
                fontSize: "1.25rem",
                mt: "19.5px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              ورود با رمز عبور یک بار مصرف
            </Box>
            <form onSubmit={otpGenrator}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  py: "12px",
                  height: "100%",
                  gap: 3,
                  borderRadius: {
                    md: "4px 0px 0px 4px",
                    xs: "0px 0px 4px 4px",
                  },
                  mt: 3,
                }}
              >
                {/*   <h3 className="font-bold text-lg mb-5">
                شماره همراه خود را وارد کنید
              </h3> */}
                <TextField
                  id="outlined-basic"
                  label="تلفن همراه"
                  variant="outlined"
                  fullWidth
                  type="tel"
                  name="user_name"
                  focused
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1");
                  }}
                  error={err}
                  helperText={err}
                  onChange={(e) => {
                    if (e.target.value.length < 12) {
                      setData({
                        ...data,
                        phoneNumber: persianToEnglish(e.target.value),
                      });
                      if (e.target.value.length < 10) {
                      } else {
                        setError("");
                      }
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value.length < 10) {
                      setError("تلفن همراه وارد شده معتبر نمی باشد");
                    } else {
                      setError("");
                    }
                  }}
                  value={data?.phoneNumber || ""}
                  inputProps={{ maxLength: 11 }}
                />
              </Box>
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: "12px",
                  mt: 2,
                  gap: 1,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    fontSize: "1rem",

                    width: "150px !important",
                  }}
                  onClick={handleBack}
                >
                  <InputIcon
                    sx={{ width: "18px", height: "18px", mr: "5px" }}
                  />
                  بازگشت
                </Button>{" "}
                <Button
                  variant="contained"
                  disabled={!data?.phoneNumber || loading}
                  sx={{
                    fontSize: "1rem",
                    backgroundColor: "#0091ea",
                    width: "150px !important",
                  }}
                  type="submit"
                  /*    onClick={otpGenrator} */
                >
                  {loading ? (
                    <>
                      {" "}
                      <CircularProgress size={27} />
                    </>
                  ) : (
                    <> ثبت</>
                  )}
                </Button>{" "}
              </Box>
            </form>
          </>
        ) : (
          <div>
            <Box
              sx={{
                px: "15px",
                fontSize: "1.25rem",
                mt: "19.5px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              ورود با رمز عبور یک بار مصرف
            </Box>
            <Box
              component={"form"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: "12px",
                height: "100%",
                gap: 5,
                borderRadius: { md: "4px 0px 0px 4px", xs: "0px 0px 4px 4px" },
              }}
            >
              <h3 className="font-light text-lg mb-5">
                {" "}
                کد ارسالی را وارد کنید
              </h3>
              <div className="w-full border bg-blue-50 border-blue-300 rounded-sm py-4 flex flex-col justify-center items-center gap-3">
                <span>
                  کد تاییدی به شماره <strong>{data?.phoneNumber}</strong> ارسال
                  شد.
                </span>
                <Button
                  onClick={() => {
                    setStep(1);
                    setData({ ...data, code: "" });
                  }}
                >
                  تغیر شماره موبایل
                </Button>
              </div>
              <OtpInput
                isDisabled={minutes === 0 && seconds === 0}
                separator={<span></span>}
                value={data?.code | ""}
                onChange={(code) => setData({ ...data, code: toEnglish(code) })}
                numInputs={3}
                shouldAutoFocus
                isInputNum={true}
                inputStyle={{
                  width: isMd ? "2rem" : "1.2rem",
                  height: isMd ? "2rem" : "1.2rem",
                  margin: " 1rem",
                  fontSize: isMd ? "2rem" : "1.3rem",
                  borderBottom: "1px solid rgba(0,0,0,0.2)",
                  direction: "rtl !important",
                  float: "right !important",
                  outline: "none",
                  fontFamily: "IRANYekanX !important",
                }}
                containerStyle={{
                  flexDirection: "row-reverse",
                }}
              />
              <div className="flex items-center justify-between gap-4  px-2 sm:px-8">
                {Number(minutes) > 0 || Number(seconds) > 0 ? (
                  <>
                    {" "}
                    <span className="text-xs sm:text-sm">
                      {" "}
                      زمان باقی مانده تا ارسال مجدد رمز :{" "}
                    </span>
                    <span className="text-xs sm:text-sm">
                      {`${minutes}`}:{`${seconds}`}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xs ">کد را دریافت نکرده اید؟ </span>
                    <Button
                      variant="outlined"
                      className=" text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed"
                      size="small"
                      sx={{ fontSize: " 0.75rem !important" }}
                      onClick={() => otpGenrator()}
                      type="button"
                    >
                      دریافت مجدد کد{" "}
                    </Button>
                  </>
                )}
              </div>
            </Box>
            <Box
              component={"div"}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: "12px",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  fontSize: "1rem",

                  width: "150px !important",
                }}
                onClick={() => {
                  setStep(1);
                  setData({ ...data, code: "" });
                }}
              >
                <InputIcon sx={{ width: "18px", height: "18px", mr: "5px" }} />
                بازگشت
              </Button>{" "}
              <Button
                variant="contained"
                disabled={!data?.code || loading2}
                sx={{
                  fontSize: "1rem",
                  backgroundColor: "#0091ea",
                  width: "150px !important",
                }}
                onClick={checkOtp}
              >
                {loading2 ? (
                  <>
                    {" "}
                    <CircularProgress size={27} />
                  </>
                ) : (
                  <> ثبت</>
                )}
              </Button>
            </Box>
          </div>
        )}
      </div>
    </Box>
  );
}

export default Otp;
