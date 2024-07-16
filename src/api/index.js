import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "X-RapidAPI-Key":
            process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// export const getWeatherData = async (lat, long) => {
//   try {
//     const { data } = await axios.get(
//       "https://yahoo-weather5.p.rapidapi.com/weather",
//       {
//         params: {
//           lat: lat,
//           long: long,
//           format: "json",
//           u: "f",
//         },
//         headers: {
//           "x-rapidapi-key":
//             "c58694fe87mshe8399187f9317f2p17fc49jsn81ebdfb514b0",
//           "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
//         },
//       }
//     );
//     return data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };
