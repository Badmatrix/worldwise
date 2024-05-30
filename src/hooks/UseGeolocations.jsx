import { useState } from "react";

export function UseGeolocations(defaultPosition = null) {
  const [position, setPosition] = useState(defaultPosition);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  function getPosition() {
    if (!navigator.geolocation) {
      return setError("browser does not support geolocation");
    } else {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      }),
        (error) => {
          setError(error.message);
          setIsLoading(false);
        };
    }
  }
  // getPosition()
  return { isLoading, error, position, getPosition };
}
