import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData, getWeatherData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildclicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);


  // 新的 useEffect，合并 type 依赖
  useEffect(() => {
    if (places.length) {
      //console.log("Current rating threshold:", rating);
      const filtered = places.filter((place) => Number(place.rating) > rating);
      setFilteredPlaces(filtered);
    }
  }, [rating, places, type]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      // getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
      //   setWeatherData(data)
      // );

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        if (data) {
          const filtered = data.filter(
            (place) => place.name && place.num_reviews > 0
          );
          setPlaces(filtered);
        } else {
          setPlaces([]);
        }
        setIsLoading(false);
      });
    }
  }, [type, bounds, coordinates]);

  console.log("Places:", places);
  console.log("Filtered Places:", filteredPlaces);
  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : []}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : []}
            setChildclicked={setChildclicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
