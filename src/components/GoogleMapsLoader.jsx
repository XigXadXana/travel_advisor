import { useEffect } from 'react';

const GoogleMapsLoader = ({ onGoogleMapsLoad }) => {
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadGoogleMaps = async () => {
      try {
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        await loadScript(`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`);
        if (onGoogleMapsLoad) {
          onGoogleMapsLoad();
        }
      } catch (error) {
        console.error('Error loading Google Maps API:', error);
      }
    };

    loadGoogleMaps();
  }, [onGoogleMapsLoad]);

  return null;
};

export default GoogleMapsLoader;
