import React, { useState, useRef, useEffect } from "react";
import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MobileOtp({confirmationResult, setIsOtp, userStatus, setExistUser}) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [remainingTime, setRemainingTime] = useState(60); 

  const navigate = useNavigate()

  const otpFields = Array.from({ length: 6 }, (_, index) => useRef(null));

  const handleOtpChange = (value, index, e) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (e.key === "Backspace" && index > 0 && value === "") {
      otpFields[index - 1].current.focus();
    }

    if (index < otpFields.length - 1 && value !== "") {
      otpFields[index + 1].current.focus();
    }
  };

  function onOTPVerify(){
      const formattedOTP = otp.join("")
      confirmationResult.confirm(formattedOTP).then(async(res)=>{
      setIsOtp(false)
      if (userStatus) {
        navigate('/')
      }else{
        navigate('/register')
      }
    }).catch((err)=>{
      console.log(err);
    })
    setExistUser(null)
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer); 
  }, []); 

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        color="white"
        sx={{ marginBottom: "16px" }}
      >
        Enter OTP
      </Typography>
      <Box>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {otp.map((data, index) => (
            <Grid item key={index} color="white">
              <TextField
                size="small"
                variant="outlined"
                color="success"
                inputProps={{ maxLength: 1 }}
                value={otp[index]}
                onChange={(e) => handleOtpChange(e.target.value, index, e)}
                inputRef={otpFields[index]}
                autoComplete="off"
                sx={{
                  width: "40px",
                  textAlign: "center",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "& input": {
                    color: "white",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Button onClick={onOTPVerify} color="secondary" variant="contained" sx={{ marginTop: "16px" }}>
        Submit
      </Button>
      <Typography
        component="p"
        color="white"
        sx={{ fontSize: "0.7rem", fontWeight: "normal", marginTop: "16px" }}
      >
       Resend OTP in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Typography>
    </Box>
  );
}

export default MobileOtp;
