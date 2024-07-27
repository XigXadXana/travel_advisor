import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import GoogleMapsLoader from "./components/GoogleMapsLoader";
import { getPlacesData, getWeatherData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);



  const handleGoogleMapsLoad = () => {
    setGoogleMapsLoaded(true);
  };

  useEffect(() => {
    if (googleMapsLoaded) {
      console.log('Google Maps API loaded', googleMapsLoaded);
    }
  }, [googleMapsLoaded]);

  const handleNavigate = (place) => {
    if (place) {
      const destination = `${place.latitude},${place.longitude}`;
      const origin = `${coordinates.lat},${coordinates.lng}`;
      window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`);
    } else {
      console.error('Cannot navigate: Invalid place object or missing coordinates.');
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (places.length) {
      const filtered = places.filter((place) => Number(place.rating) > rating);
      setFilteredPlaces(filtered);
    }
  }, [rating, places, type]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

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

  return (
    <>
      <GoogleMapsLoader onLoad={handleGoogleMapsLoad} />
      <CssBaseline />
      <Header setCoordinates={setCoordinates} googleMapsLoaded={googleMapsLoaded} />
      <div id="root">
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
              onNavigate={filteredPlaces.length ? handleNavigate : undefined}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={filteredPlaces.length ? filteredPlaces : []}
              setChildClicked={setChildClicked}
              weatherData={weatherData}
              googleMapsLoaded={googleMapsLoaded}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default App;
