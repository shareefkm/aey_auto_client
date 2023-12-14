import React, { useEffect, useState } from "react";
import { Stack, Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import MobileOtp from "../Common/MobileOtp";
import { PHONE_REGEX } from "../../Regex/Regex";
import { auth } from "../../config/config";
import DriverAxios from "../../Axios/DriverAxios";

function MobileLoginDriver() {
  const [number, setNumber] = useState("");
  const [validNumber, setValidNumber] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState({});
  const [existDriver,setExistDriver] = useState(null)

  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {},
          "expired-callback": () => {},
        }
      );
    }
  }

  async function onSignup() {
    try {
      const response = await DriverAxios.post("/mobilelogin", {number});
      if (response) {
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;
        const formatNum = "+" + number;
        signInWithPhoneNumber(auth, formatNum, appVerifier)
          .then((confirmationResult) => {
            setConfirmationResult(confirmationResult);
            setIsOtp(true);
            setExistDriver(true)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      if (error.response.status === 404) {
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;
        const formatNum = "+" + number;
        signInWithPhoneNumber(auth, formatNum, appVerifier)
          .then((confirmationResult) => {
            setConfirmationResult(confirmationResult);
            setIsOtp(true);
            setExistDriver(false)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  useEffect(() => {
    onCaptchVerify();
  }, []);

  useEffect(() => {
    const result = PHONE_REGEX.test(number);
    setValidNumber(result);
  }, [number]);

  return (
    <>
      <div id="recaptcha-container"></div>
      {isOtp ? (
        <MobileOtp
          role={'Driver'}
          setExistDriver={setExistDriver}
          driverStatus={existDriver}
          confirmationResult={confirmationResult}
          setIsOtp={setIsOtp}
        />
      ) : (
        <Box
          sx={{
            backgroundImage: `url('/images/passangerLog.jpeg')`,
            backgroundSize: "cover",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "blueGrey.light",
              opacity: "80%",
              height: "130px",
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
              boxShadow:
                "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 8px 10px rgba(0, 0, 0, 0.1), 0px 12px 14px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Stack
              spacing={2}
              direction={{ xs: "column", md: "row" }}
              sx={{ padding: isSmallScreen ? 2 : 0 }}
            >
              <PhoneInput
                country={"in"}
                value={"number"}
                onChange={setNumber}
                inputStyle={{
                  borderColor: validNumber ? "black" : "red",
                }}
                containerStyle={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
                inputClass={`MuiOutlinedInput-notchedOutline ${
                  validNumber ? "" : "Mui-error"
                }`}
              />
              <Button
                size="small"
                color="secondary"
                disabled={!validNumber}
                variant={validNumber ? "contained" : "text"}
                onClick={onSignup}
              >
                Send
              </Button>
            </Stack>
          </Box>
        </Box>
      )}
    </>
  );
}

export default MobileLoginDriver;
