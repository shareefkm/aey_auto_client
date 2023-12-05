// SuggestionsListLocation
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const SuggestionsListLocation = () => {

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
  return (
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
  );
};

export default SuggestionsListLocation;
