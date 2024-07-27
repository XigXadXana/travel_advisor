import { useEffect } from "react";

const GoogleMapsLoader = ({ onLoad }) => {
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        // Check if the script is already loaded
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }

        // Create a new script element
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadGoogleMaps = async () => {
      try {
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
          throw new Error("Google Maps API key is missing");
        }

        // Load the Google Maps script
        await loadScript(
          `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`
        );

        // Call the onLoad callback once the script is loaded
        if (typeof google !== "undefined") {
          console.log("Google Maps API successfully loaded");
          if (onLoad) {
            onLoad();
          }
        } else {
          throw new Error("Google Maps API failed to load");
        }
      } catch (error) {
        console.error("Error loading Google Maps script:", error);
      }
    };

    loadGoogleMaps();
  }, [onLoad]);

  return null;
};

export default GoogleMapsLoader;
