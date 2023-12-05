import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
  List, ListItem
} from "@mui/material";

// third party
import * as Yup from "yup";
// import { useFormik } from "formik";
import { Form, Formik } from "formik";

import Google from "/images/google.svg";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useScriptRef from "../Hooks/useScriptRef";
import { GoogleAuthProvider, ProviderId, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/config";
import { PW_REGEX } from "../../Regex/Regex";
import SuggestionsListLocation from "../Common/SuggestionsListLocation";
import UserAxios from "../../Axios/UserAxios";

// ===========================|| FIREBASE - REGISTER ||=========================== //

const RegComponent = () => {
  const ENV = import.meta.env
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [place, setPlace] = useState("");
  const [suggetion, setSuggetion] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const navigate = useNavigate()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Function to get location suggestions from Mapbox Geocoding API
  const getLocationSuggestions = async (query) => {
    const MAPBOX_API_KEY = ENV.VITE_MAPBOX_API_KEY
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`;
    const params = {
      access_token: MAPBOX_API_KEY,
      types: "place,locality,neighborhood",
      limit: 5,
      country: "IN",
    };

    try {
      const response = await axios.get(endpoint, { params });
      return response.data.features;
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      return [];
    }
  };

  // Function to handle location suggestion selection
  const handleLocationSuggestion = async (query) => {
    const suggestions = await getLocationSuggestions(query);
    setLocationSuggestions(suggestions);
  };

  const handleGoogleSignup = async () => {
    try {
      const data = await signInWithPopup(auth, ProviderId);
      console.log("data;", data);
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    email: "",
    password: "",
    userName: "",
    location: "",
  }
  const  validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required")
      .trim(),
    password: Yup.string()
      .max(255)
      .required("Password is required")
      .min(4, "Password must be at least 4 characters")
      .matches(
         PW_REGEX ,
        "Must contain at least one letter, one number and one special character"
      )
      .trim(),
    userName: Yup.string()
      .max(255)
      .required("User Name is required")
      .trim(),
  })


  const  onSubmit = async(values)=>{
    try {
      const response = await UserAxios.post('/register',{values,longitude,latitude})
      navigate('/login')
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleGoogleSignup}
            size="large"
            sx={{
              color: "grey.900",
              backgroundColor: theme.palette.grey[100],
              borderColor: theme.palette.grey[100],
            }}
          >
            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 }, mt: 1 }}>
              <img
                src={Google}
                alt="google"
                width={18}
                height={18}
                style={{ marginRight: matchDownSM ? 8 : 16 }}
              />
            </Box>
            Sign up with Google
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ alignItems: "center", display: "flex" }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              sx={{
                cursor: "unset",
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
              }}
              disableRipple
              disabled
            >
              OR
            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Sign up with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Formik
      initialValues = {initialValues}
      validationSchema = {validationSchema}
      onSubmit={onSubmit}
      > { (formik) => (<Form >
            <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
              <InputLabel htmlFor="outlined-adornment-location">
                Location
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-location"
                type="text"
                label="Location"
                value={place}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  setSuggetion(true);
                  formik.handleChange(e)
                  setPlace(e.target.value);
                  handleLocationSuggestion(e.target.value);
                }}
                required
                sx={{ marginBottom: "1rem" }}
                placeholder="Enter your Location"
              />
              {/* Display location suggestions */}
              <List>
                {suggetion &&
                  locationSuggestions.map((suggestion) => (
                    <ListItem
                      key={suggestion.id}
                      sx={{
                        padding: 2,
                        "&:hover": {
                          backgroundColor: "rgba(0, 123, 255, 0.1)",
                        },
                      }}
                    > 
                       <Button
                        type="button"
                        onClick={() => {
                          setSuggetion(false);
                          setPlace(suggestion.place_name);
                          setLocationSuggestions([]);
                          const [long, lat] = suggestion?.geometry.coordinates;
                          setLatitude(lat);
                          setLongitude(long);
                        }}
                        fullWidth
                      >
                        {suggestion.place_name}
                      </Button>
                    </ListItem>
                  ))}
              </List>
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(formik.touched.userName && formik.errors.userName)}
              sx={{ ...theme.typography.customInput, marginBottom: "1rem" }}
            >
              <InputLabel htmlFor="outlined-adornment-userName-register">
                User Name
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-userName-register"
                type="userName"
                label="User Name"
                value={formik.values.userName}
                name="userName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                inputProps={{}}
              />
              {formik.touched.userName && formik.errors.userName && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text--register"
                >
                  {formik.errors.userName}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(formik.touched.email && formik.errors.email)}
              sx={{ ...theme.typography.customInput, marginBottom: "1rem" }}
            >
              <InputLabel htmlFor="outlined-adornment-email-register">
                Email Address
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                label="email"
                value={formik.values.email}
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                inputProps={{}}
              />
              {formik.touched.email && formik.errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text--register"
                >
                  {formik.errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(formik.touched.password && formik.errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-register">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                name="password"
                label="Password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-register"
                >
                  {formik.errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        style={{ backgroundColor: level?.color }}
                        sx={{ width: 85, height: 8, borderRadius: "7px" }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {formik.errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{formik.errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Button
                // disableElevation
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                Sign up
              </Button>
            </Box>
          </Form>
      )}
      </Formik>
    </>
  );
};

export default RegComponent;
