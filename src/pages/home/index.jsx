import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button, Modal } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import AudiogramPage from "../../charts/pages/AudiogramPage";
import PreviewPage from "../../charts/pages/PreviewPage";
import { http } from "../../scripts/api";
import { API_ENDPOINTS } from "../../scripts/api/routes";
import Acoustic from "../Acoustuc";
import Speech from "../speech";
import Tympanometry from "../Tympanometry";
import AllAcounts from "./allAcounts";
import ConfirmDelete from "./confirmDelete";
import Otp from "./loginModal";
import NewPatient from "./newPatient";
import Patients from "./patinets";
import Payments from "./payment";
import UserDetails from "./userDetails";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const db = new Dexie("portebP");
db.version(1).stores({
  patients: "++id,patinet_name,doctor,age,created_date,updated_date,cases",
});

const { patients } = db;
const Home = () => {
  const allPatient = useLiveQuery(() => patients.toArray(), []);
  const [openToast, setOpenToast] = React.useState(false);
  const [search, setSearch] = useState("");
  const [allItems, setAllPatient] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [openPaymentSuccess, setopenPaymentSuccess] = useState(false);
  const [openPaymentFailed, setopenPaymentFailed] = useState(false);
  const [openUserDetail, setSetOpenUserDetails] = useState(false);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCase, setSelectedCase] = useState(null);
  const [sort, setSort] = useState("new");
  const [userData, setUserData] = useState({});

  const handleOpenModal = () => {
    navigate("#newPatient");
  };
  const handleChangeIndex = (index) => {
    setValue(index += 1);
  };

  const closeModal = () => {
    navigate("/");
  };
  /* گردش به چپ . راست  */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === " ") {
        closeModal();
      }
      if (
        allItems[0]?.cases?.filter((item) => !item?.removed)?.length &&
        allItems.length > 0 &&
        selectedCase
      ) {
        if (
          (event.key === "ArrowRight" && event.ctrlKey) ||
          (event.key === "ArrowLeft" && event.ctrlKey)
        ) {
          setValue(value +=1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [value]);
  useEffect(() => {
    if (search === "") {
      setAllPatient(allPatient);
    } else {
      var temp = [...allPatient];

      const searchH = (query) =>
        temp.filter((s) => s.patinet_name.includes(query));
      setAllPatient(searchH(search));
    }
  }, [allPatient, search]);
  useEffect(() => {
    var temp = [...allItems];
    if (sort === "new") {
      setAllPatient(temp.sort((a, b) => a.created_date - b.created_date));
    } else {
      setAllPatient(temp.sort((a, b) => b.created_date - a.created_date));
    }
  }, [sort]);
  useEffect(() => {
    setOpen(location.hash === "#newPatient");
    setOpenDelete(location.hash === "#confirmDelete");
    setOpenEdit(location.hash === "#editPatient");
    setOpenLogin(location.hash === "#loginModal");
    setOpenAccount(location.hash === "#accounts");
    setopenPaymentSuccess(location.hash.split("?")[0] === "#success_pay");
    setSetOpenUserDetails(location.hash === "#userInfo")
    setopenPaymentFailed(location.hash.split("?")[0] === "#faildPay");
  }, [location.hash]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (allItems[index]?.cases?.length > 0) {
      for (var i = 0; i <= allItems[index]?.cases.length; i++) {
        if (allItems[index]?.cases[i] && !allItems[index]?.cases[i].removed) {
          setSelectedCase(allItems[index]?.cases[i].id);
          break;
        }
      }
      /*       setSelectedCase(allItems[index]?.cases[0]?.id);
       */
    } else {
      setSelectedCase(1);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };
  const handleConfirmDelete = () => {
    navigate("#confirmDelete");
  };
  const handleOpenEdit = () => {
    navigate("#editPatient");
  };
  const createNewCase = async (event) => {
    var temp = [...allItems[selectedIndex]?.cases];
    temp.unshift({
      date: new Date(),
      id: temp?.length > 0 ? temp[0].id + 1 : 1,
      charts: {},
    });
    setSelectedCase(temp?.length > 0 ? temp[0].id : 1);
    event.preventDefault();
    await patients.update(allItems[selectedIndex].id, {
      patinet_name: allItems[selectedIndex].patinet_name,
      doctor: allItems[selectedIndex].doctor,
      age: allItems[selectedIndex].age,
      updated_date: allItems[selectedIndex]?.updated_date,
      created_date: allItems[selectedIndex].created_date,
      cases: temp,
    });
  };

  const removeCase = async (id) => {
    var temp = [...allItems[selectedIndex]?.cases];
    var index = temp?.findIndex((item) => item?.id === id);
    temp[index] = { ...temp[index], removed: true };
    await patients.update(allItems[selectedIndex].id, {
      patinet_name: allItems[selectedIndex].patinet_name,
      doctor: allItems[selectedIndex].doctor,
      age: allItems[selectedIndex].age,
      updated_date: allItems[selectedIndex]?.updated_date,
      cases: temp,
    });
    if (temp.filter((item) => !item?.removed)) {
      setSelectedCase(temp);
    }
    for (var i = 0; i <= temp.length; i++) {
      if (temp[i] && !temp[i].removed) {
        setSelectedCase(temp[i].id);
        break;
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userInfo") || userData?.token) {
      syncData();
    }
  }, [userData]);
  const syncData = () => {
    http
      .get(API_ENDPOINTS.patients, {
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
        var temp = [...allPatient];
        console.log(res.data);
        res.data?.map((item) => {
          item?.patients?.map(async (pat) => {
            if (temp?.find((it) => it?.patinet_name === pat.patient_name)) {
            } else {
              var case_temp = [];
              pat?.cases?.map((ss) => {
                case_temp.push({
                  id: ss?.id,
                  date: ss?.date,
                  chart: JSON.parse(ss.chart)?.chart,
                  cases: JSON.parse(ss.chart)?.cases,
                  removed: JSON.parse(ss.chart)?.removed,
                });
              });
              console.log(case_temp, "case_tempcase_temp");
              await patients.add({
                patinet_name: pat.patient_name,
                doctor: pat.doctor,
                age: pat.age,
                created_date: pat?.created_date,
                updated_date: pat?.updated_date,
                cases: case_temp,
              });
            }
          });
        });
      })
      .catch((err) => {});
  };
  const componentRef = React.useRef(null);
  const onBeforeGetContentResolve = React.useRef(null);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);
  const reactToPrintTrigger = React.useCallback(() => {
    return (
      <Button variant="contained" color="warning">
        <img className="w-5 ml-7" src="/images/icons8-print-50.png" alt="" />
        <span>پرینت</span>
      </Button>
    ); // eslint-disable-line max-len
  }, []);
  return (
    <div className="">
      <SwipeableViews
        axis={"x-reverse"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <Patients
            handleOpenModal={handleOpenModal}
            setSearch={setSearch}
            search={search}
            setSort={setSort}
            sort={sort}
            allItems={allItems}
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
            handleConfirmDelete={handleConfirmDelete}
            handleOpenEdit={handleOpenEdit}
            createNewCase={createNewCase}
            selectedCase={selectedCase}
            setSelectedCase={setSelectedCase}
            removeCase={removeCase}
            componentRef={componentRef}
            reactToPrintContent={reactToPrintContent}
            reactToPrintTrigger={reactToPrintTrigger}
            allPatient={allPatient}
            userData={
              localStorage.getItem("userInfo")
                ? JSON.parse(localStorage.getItem("userInfo"))
                : userData
            }
            setOpenAccount={setOpenAccount}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AudiogramPage
            selectedCase={selectedCase}
            selectedIndex={selectedIndex}
            patients={patients}
            allItems={allItems}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
         <Speech />
        </TabPanel>
        <TabPanel value={value} index={3}>
         <Tympanometry />
        </TabPanel>
        <TabPanel value={value} index={4}>
         <Acoustic />
        </TabPanel>

        <TabPanel value={value} index={5}>
         <PreviewPage />
        </TabPanel>

        
      </SwipeableViews>

      <Modal open={open || openEdit} onClose={closeModal}>
        <NewPatient
          patients={patients}
          setOpen={setOpenToast}
          item={allItems && openEdit ? allItems[selectedIndex] : null}
        />
      </Modal>
      <Modal open={openLogin} onClose={closeModal}>
        <Otp handleBack={closeModal} setUserData={setUserData} />
      </Modal>
      <Modal open={openUserDetail} onClose={closeModal}>
        <UserDetails
          handleBack={closeModal}
          alluserData={
            localStorage.getItem("userInfo")
              ? JSON.parse(localStorage.getItem("userInfo"))
              : userData
          }
        />
      </Modal>
      <Modal open={openDelete} onClose={closeModal}>
        <ConfirmDelete
          item={allItems ? allItems[selectedIndex] : {}}
          removed={() => {}}
          patients={patients}
        />
      </Modal>
      <Modal open={openAccount} onClose={closeModal}>
        <AllAcounts />
      </Modal>
      <Modal
        open={openPaymentSuccess || openPaymentFailed}
        onClose={closeModal}
      >
        <Payments payment={openPaymentSuccess ? "success" : "faild"} />
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openToast}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          بیمار جدید با موفقیت ثبت شد
        </Alert>
      </Snackbar>
      {allItems[0]?.cases?.filter((item) => !item?.removed)?.length &&
        allItems.length > 0 &&
        selectedCase && (
          <>
            <Box
              sx={{
                background: "rgba(243, 244, 246, 0.5)",
                backdropFilter: "blur(7px)",
              }}
              onClick={() => setValue(value => value === 5 ? 0 : value + 1)}
              className="right-0 rounded-l-md cursor-pointer fixed top-1/2 bg-gray-100 w-[50px] flex items-center justify-center h-[50px] translate-y-1/2"
            >
              <ArrowForwardIosIcon />
            </Box>
            <Box
              sx={{
                background: "rgba(243, 244, 246, 0.5)",
                backdropFilter: "blur(7px)",
              }}
              onClick={() => setValue(value => value === 0 ? 5 : value - 1)}
              className="left-0 rounded-r-md  cursor-pointer fixed top-1/2 bg-gray-100 w-[50px] flex items-center justify-center h-[50px] translate-y-1/2"
            >
              <ArrowBackIosNewIcon />
            </Box>
          </>
        )}
    </div>
  );
};

export default Home;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          <>{children}</>
        </>
      )}
    </div>
  );
}
