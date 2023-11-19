import { useEffect, useState } from "react";
import {
  Stack,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { PHONE_REGEX } from "../../Regex/Regex";

function MobileLoginDriver() {
  const [number, setNumber] = useState("");
  const [validNumber, setValidNumber] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  useEffect(() => {
    const result = PHONE_REGEX.test(number);
    setValidNumber(result);
  }, [number]);
  return (
    <Box
      sx={{
        backgroundImage: `url('/images/driverLog.jpeg')`,
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
          <img src="https://flagcdn.com/in.svg" width="25" alt="India" />
          <TextField
            label="Enter Phone Number"
            size="small"
            color="secondary"
            helperText={
              !number
                ? "Enter Your Phone Number"
                : !validNumber
                ? "Enter Valid Number"
                : ""
            }
            required
            error={number && !validNumber}
            sx={{
              "& fieldset": {
                borderColor: "black",
              },
            }}
            value={number}
            onChange={handleChange}
          />
          <Button
            color="secondary"
            disabled={!validNumber}
            variant={validNumber ? "contained" : "text"}
          >
            submit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default MobileLoginDriver;