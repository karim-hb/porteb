import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { http } from "../../scripts/api";
import { API_ENDPOINTS } from "../../scripts/api/routes";

const Payments = ({ payment, userData }) => {
  const [user, setUser] = useState({});
  const urlSearchParams = new URLSearchParams(window.location.search);
  console.log(window.location,'urlSearchParams')
  useEffect(() => {
    http
      .get(API_ENDPOINTS.me, {
        headers: {
          authorization: `Bearer ${
            userData?.token
              ? userData?.token
              : localStorage.getItem("userInfo") &&
                JSON.parse(localStorage.getItem("userInfo"))?.token
          }`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {});
  }, []);

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
      <div className="flex flex-col items-center justify-center gap-5">
        <div>
          {payment === "success" ? (
            <img src="/images/success-t.png" alt="success pay" />
          ) : (
            <img src="/images/apppash-no-300x300.png" alt="faild pay" />
          )}
        </div>
        <div>
          {payment === "success" ? (
            <h4 className="text-lg font-bold text-green-500">
              پرداخت شما موفقیت آمیز بود
            </h4>
          ) : (
            <h4 className="text-lg font-bold text-red-500">
              پرداخت شما انجام نشد مجدد تلاش کنید
            </h4>
          )}
        </div>
        {user?.accountExpiryDate &&
        new Date(user?.accountExpiryDate) > new Date() ? (
          <div className="flex text-xs items-center gap-3">
            <span className="text-xs">تاریخ انقضا حساب شما</span>
            <span className="text-xs">
              {new Date(user?.accountExpiryDate).toLocaleDateString("fa-IR")}
            </span>
            (
            <span className="text-xs font-bold">
              {Math.ceil(
                Math.abs(new Date(user?.accountExpiryDate) - new Date()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              روز باقی مانده
            </span>
            )
          </div>
        ) : (
          <div>حساب شما غیر فعال می باشید</div>
        )}
        <span>شماره پیگیری تراکنش :{urlSearchParams.get('refId')}</span>
      </div>
    </Box>
  );
};

export default Payments;
