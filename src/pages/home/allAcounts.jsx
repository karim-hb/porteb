import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../../scripts/api";
import { API_ENDPOINTS } from "../../scripts/api/routes";

const AllAcount = ({ userData }) => {
  const [loading2, setLoading2] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const handleTransaction = (type) => {
    setLoading2(true);
    const gateway = 2;
    http
      .post(
        API_ENDPOINTS.gates,
        {
          gateway,
          plan: type?._id,
          reasone:`خرید اشتراک ${type.day} روزه به مبلغ ${type.price} هزار تومن  به نام ${type.title}`
        },
        {
          headers: {
            authorization: `Bearer ${
              userData?.token
                ? userData?.token
                : localStorage.getItem("userInfo") &&
                  JSON.parse(localStorage.getItem("userInfo"))?.token
            }`,
          },
        }
      )
      .then((res) => {
        if (gateway === 2) {
          window.open(
            `https://api.payping.ir/v2/pay/gotoipg/${res.data.data.code}`,
            "_self"
          );
        } else {
          window.open(
            `https://www.zarinpal.com/pg/StartPay/${res.data.data.data.authority}`,
            "_self"
          );
        }
        /*       */

        setLoading2(false);
      })
      .catch((err) => {
        setLoading2(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    http
      .get(
        API_ENDPOINTS.prices,

        {
          headers: {
            authorization: `Bearer ${
              userData?.token
                ? userData?.token
                : localStorage.getItem("userInfo") &&
                  JSON.parse(localStorage.getItem("userInfo"))?.token
            }`,
          },
        }
      )
      .then((res) => {
        setPlans(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);
  console.log(plans, "plans");
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
      <div className="py-4 px-3  mb-4 flex justify-between items-center border-b">
        <span className="text-2xl font-bold"> اشتراک ها</span>
        <div></div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {loading ? (
          <></>
        ) : (
          <>
            {plans?.map((item, index) => (
              <div
                key={index}
                className="border rounded-md h-full flex flex-col"
                style={{ borderColor: item.color }}
              >
                <div
                  style={{ background: item.color }}
                  className="rounded-t-md w-full flex justify-center text-white items-center py-7"
                >
                  <h3>{item.title}</h3>
                </div>
                <ul className="flex flex-col gap-3 px-3 my-4 text-sm ">
                  <li> - {item.day} روزه-</li>
                  {item.description}
                </ul>
                <h5 className="text-center font-bold my-4">
                  {item.price?.toLocaleString("en")} <small>تومان</small>
                </h5>
                <Button
                  onClick={() => handleTransaction(item)}
                  variant="contained"
                >
                  خرید
                </Button>
              </div>
            ))}
          </>
        )}
      </div>
    </Box>
  );
};

export default AllAcount;
