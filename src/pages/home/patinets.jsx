import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { http } from "../../scripts/api";
import { API_ENDPOINTS } from "../../scripts/api/routes";
import ExportData from "./exportData";
import SettingsIcon from '@mui/icons-material/Settings';
const Patients = ({
  handleOpenModal,
  setSearch,
  search,
  setSort,
  sort,
  allItems,
  selectedIndex,
  handleListItemClick,
  handleConfirmDelete,
  handleOpenEdit,
  createNewCase,
  selectedCase,
  setSelectedCase,
  removeCase,
  componentRef,
  reactToPrintContent,
  reactToPrintTrigger,
  allPatient,
  userData,
  setOpenAccount,
  setSetOpenUserDetails
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState({
    content: "",
    type: "success",
  });
  const handleSynce = () => {
    setLoading(true);
    console.log(localStorage.getItem("userInfo"), "item");
    var allPatients = [];
    allPatient?.map((item) => {
      var temp = [];
      item?.cases?.map((it) => {
        temp.push({
          date: it.date,
          id: it?.id,
          chart: JSON.stringify({
            chart: it.chart,
            cases: it.cases,
            removed: it.removed,
          }),
        });
      });
      var data = {
        patient_name: item?.patinet_name,
        doctor: item?.doctor,
        age: item?.age,
        updated_date: item?.updated_date,
        created_date: item?.created_date,
        cases: temp,
      };
      allPatients.push(data);
    });
    http
      .post(
        API_ENDPOINTS.patients,
        { patients: allPatients },
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
        setLoading(false);
        setMessage({
          content: "اطلاعات با موفقیت بارگزاری شد ",
          type: "success",
        });
      })
      .catch((err) => {
        setLoading(false);
        setMessage({
          content: "خطا در بارگزاری اطلاعات لطفا مجدد تلاش کنید   ",
          type: "error",
        });
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };
  return (
    <div className="grid grid-cols-2 min-h-[100vh] gap-4">
      <div className="flex flex-col ">
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
        {/* قسمت بالایی سایت مخصوص افزودن بیمار جدید */}

        {/* قسمت انتخاب بیماران و پرونده های آن ها */}
        {/*     {allItems?.length === 0 && !search ? (
    <div className="flex justify-center items-center mt-5">
      <span onClick={handleOpenModal}>
        بیمار ثبت شده ندارید لطفا بیمار جدید ثبت کنید
      </span>
    </div>
  ) : ( */}
        <div className="grid h-full grid-cols-2">
          <div className=" pr-5 min-h-[100vh] h-full bg-gray-100 ml-2 ">
            <div className="flex items-center justify-center my-4 pl-5 relative">
              {userData?.phoneNumber || localStorage.getItem("userInfo") ? (
                <>
                  {userData?.phoneNumber ? (
                    <>
                      <div className="h-[54px] w-full border rounded-sm text-center font-bold flex items-center justify-center text-green-800">
                        {userData?.phoneNumber}{" "}
                      </div>
                    </>
                  ) : localStorage.getItem("userInfo") ? (
                    <div className="h-[54px] w-full border rounded-sm text-center font-bold flex items-center justify-center text-green-800">
                      {
                        JSON.parse(localStorage.getItem("userInfo"))
                          ?.phoneNumber
                      }
                    </div>
                  ) : (
                    <></>
                  )}
                  <SettingsIcon onClick={() => navigate("#userInfo")} className="absolute top-[16px] left-10 text-gray-800 cursor-pointer" />
                </>
              ) : (
                <>
                  {" "}
                  <Button
                    sx={{
                      display: "flex",
                      gap: 2,
                      /*   background: "#14c01c !important", */
                      position: "relative",
                      height: "54px !important",
                    }}
                    variant="outlined"
                    color="success"
                    onClick={() => navigate("#loginModal")}
                    fullWidth
                  >
                    <div className="text-2xl "> ورود</div>
                  </Button>
                </>
              )}
            </div>
            <div className="flex items-center justify-center border-b pb-4 my-4 pl-5">
              <Button
                sx={{
                  display: "flex",
                  gap: 2,
                  background: "#14c01c !important",
                  position: "relative",
                  height: "54px !important",
                }}
                variant="contained"
                color="success"
                onClick={handleOpenModal}
                fullWidth
              >
                <div className="text-2xl ml-14">ثبت بیمار جدید</div>
                <div className="absolute top-0 h-full flex justify-center items-center left-0 bg-green-800 rounded-l-md px-2">
                  <img src="/images/icons8-plus-48.png" alt="icons" />
                </div>
              </Button>
            </div>{" "}
            <div className="pl-5 grid grid-cols-3 gap-2">
              <div className="flex gap-2 mb-4 items-center col-span-2 rounded-[40px] border-gray-400 background bg-white  px-2 max-w-lg w-full">
                <img
                  className="w-4"
                  src="/images/magnifying-glass.png"
                  alt="icons"
                />
                <input
                  placeholder="جست و جو نام بیمار  ..."
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  className="border-0 rounded-l-3xl text-sm border-r border-[#747373] pr-2 outline-none w-[95%] py-2 bg-white text-black "
                />
              </div>
              <div className="flex gap-2 mb-4 items-center rounded-[40px] border-gray-400 background bg-white  px-2 max-w-lg w-full">
                <img
                  className="w-3"
                  src="/images/arrow-down-sign-to-navigate.png"
                  alt="icons"
                />
                <select
                  className="h-full bg-white text-xs rounded-l-[40px] border-r border-[#747373] pr-2"
                  onChange={(e) => setSort(e.target.value)}
                  value={sort}
                >
                  <option value={"new"}>جدید ترین</option>
                  <option value={"old"}>قدیمی ترین</option>
                </select>{" "}
              </div>
            </div>
            <div className="flex border-b justify-between pl-5 items-center mt-5 pb-2 mb-3">
              <span className="text-lg">نام و نام خانوادگی</span>
              <div className="flex gap-1 items-center text-xs">
                <span>نتایج یافت شده :‌</span>
                <span>{allItems?.length}</span>
                <span>مورد</span>
              </div>
            </div>
            <nav aria-label="اسامی بیماران ثبت شده">
              <List
                sx={{
                  ".Mui-selected": {
                    backgroundColor: "#fff !important",
                    borderTopLeftRadius: "30px",
                    borderBottomLeftRadius: "30px",
                    span: {
                      fontWeight: "bold !important",
                    },
                  },
                  ".MuiListItemButton-root": {
                    ":hover": {
                      background: "transparent !important",
                    },
                  },
                }}
              >
                {allItems?.map((item, index) => (
                  <ListItem
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index)}
                    key={item?.patinet_name + index + "names"}
                    disablePadding
                    secondaryAction={
                      <div className="flex gap-0 items-center">
                        <IconButton onClick={handleConfirmDelete}>
                          <img
                            className="w-6"
                            src="/images/delete.png"
                            alt=""
                          />
                        </IconButton>
                        <IconButton onClick={handleOpenEdit}>
                          {" "}
                          <img className="w-6" src="/images/eDITE.png" alt="" />
                        </IconButton>
                      </div>
                    }
                  >
                    <ListItemButton>
                      <ListItemText primary={item?.patinet_name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </nav>
          </div>
          {allItems[selectedIndex] ? (
            <div className="mx-3">
              <div className="flex flex-col border-b mb-2 pb-2 justify-center items-center mx-2 gap-2">
                <div className="flex gap-2 items-center justify-between w-full mt-3">
                  <span className="text-base"> پرونده های :‌</span>
                  <span className="text-lg font-bold">
                    {allItems && allItems[selectedIndex]?.patinet_name}‌
                  </span>
                </div>
               

              </div>
              <div className="flex justify-end mt-6 items-center gap-5">
                <Button
                  onClick={createNewCase}
                  variant="outlined"
                  color="success"
                >
                  ثبت پرونده جدید
                </Button>
              </div>
              {allItems && (
                <>
                  {" "}
                  {allItems[selectedIndex]?.cases?.filter(
                    (item) => !item?.removed
                  )?.length === 0 ? (
                    <div className="w-full text-center mt-6">
                      <span>
                        این بیمار پرونده ثبت شده ندارد ، پرونده جدید ثبت کنید
                      </span>
                    </div>
                  ) : (
                    <>
                      {" "}
                      <div className="mt-5 mb-2 pb-1 border-b grid grid-cols-3 gap-3">
                        <span className="text-sm">شماره پرونده</span>
                        <span className="text-sm">تاریخ ثبت</span>
                        <span className="text-sm"></span>
                      </div>
                      {allItems[selectedIndex]?.cases?.map((item, i) => (
                        <Fragment key={i}>
                          {!item?.removed && (
                            <Box
                              sx={{
                                border:
                                  selectedCase === item?.id
                                    ? "1px solid blue"
                                    : "1px solid #fff",
                                background:
                                  selectedCase === item?.id
                                    ? "rgb(219 234 254)"
                                    : "#fff",
                              }}
                              onClick={() => setSelectedCase(item?.id)}
                              className="mt-1 transition-all duration-300 px-2 rounded-[40px] mb-1 items-center grid grid-cols-3 gap-3"
                            >
                              <span className="text-lg">{item?.id}</span>
                              <span className="text-lg">
                                {new Date(item.date).toLocaleDateString("fa")}
                              </span>
                              <div className="flex gap-1 items-center justify-end">
                                <IconButton
                                  onClick={() => removeCase(item?.id)}
                                >
                                  <img
                                    className="w-6"
                                    src="/images/delete.png"
                                    alt=""
                                  />
                                </IconButton>
                                <IconButton /* onClick={() => removeCase(item?.id)} */
                                >
                                  <img
                                    className="w-6"
                                    src="/images/left-arrow.png"
                                    alt=""
                                  />
                                </IconButton>
                              </div>
                            </Box>
                          )}
                        </Fragment>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {/*           )}  */}
      </div>
      <div className="relative">
        {allItems?.length === 0 ||
        allItems[selectedIndex]?.cases?.length === 0 ? (
          <></>
        ) : (
          <>
            <img ref={componentRef} src="/images/download.png" alt="download" />
            <div className="bg-white absolute bottom-0 pb-2 left-0 w-full h-[50px] flex justify-center gap-5">
              <ReactToPrint
                content={reactToPrintContent}
                documentTitle={"AwesomeFileName"}
                removeAfterPrint
                trigger={reactToPrintTrigger}
              />
              {!localStorage.getItem("userInfo") ? (
                <Button
                  onClick={() => navigate("#loginModal")}
                  variant="contained"
                  color="primary"
                >
                  <img
                    className="w-5 ml-7"
                    src="/images/icons8-forward-arrow-50.png"
                    alt=""
                  />
                  <span>اشتراک</span>
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => navigate("#accounts")}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                  >
                    <img
                      className="w-5 ml-7"
                      src="/images/icons8-forward-arrow-50.png"
                      alt=""
                    />
                    <span>اشتراک</span>
                  </Button>
                  {userData?.accountExpiryDate &&
                    new Date(userData?.accountExpiryDate) > new Date() && (
                      <>
                        {" "}
                        <Button
                          onClick={handleSynce}
                          variant="contained"
                          color="primary"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              {" "}
                              <CircularProgress size={27} />
                            </>
                          ) : (
                            <>
                              {" "}
                              <img
                                className="w-5 ml-7"
                                src="/images/icons8-forward-arrow-50.png"
                                alt=""
                              />
                            </>
                          )}

                          <span>sync</span>
                        </Button>
                      </>
                    )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Patients;
