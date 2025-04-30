import { useState, useEffect } from "react";
import { getLocationDetail, getNearLocations } from "../../apis/location";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import MyMap from "./map";
import useAppState from "../../components/Context/state";

const Location = () => {
  const [isCurrentLocation, setIsCurrentLocation] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useAppState((state) => state.location);
  const setLocation = useAppState((state) => state.setLocation);
  const [detailLocation, setDetailLocation] = useState<{
    location: string;
  } | null>(null);
  const [nearLocation, setNearLocation] = useState<
    { properties: { name: string; kinds: string } }[] | null
  >(null);

  const fetchLocationDetails = async (lat: number, long: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const detailResponse = await getLocationDetail(lat, long);
      setDetailLocation(detailResponse.data as { location: string });

      const nearResponse = await getNearLocations(lat, long, 5000);
      setNearLocation(
        (
          nearResponse.data as {
            places: { properties: { name: string; kinds: string } }[];
          }
        ).places,
      );
    } catch {
      setError("Failed to fetch location details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          setLocation({ lat, long });
          fetchLocationDetails(lat, long);
        },
        () => {
          setError("Failed to get current location");
          setIsLoading(false);
        },
      );
    }
  };

  const handlePlaceSelect = (place: {
    properties: { lat: number; lon: number };
  }) => {
    if (place?.properties) {
      const lat = place.properties.lat;
      const long = place.properties.lon;
      setLocation({ lat, long });
      fetchLocationDetails(lat, long);
    }
  };

  useEffect(() => {
    if (isCurrentLocation) {
      handleCurrentLocation();
    }
  }, [isCurrentLocation]);

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-4">
        <button
          className={`px-4 py-2 rounded ${
            isCurrentLocation ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setIsCurrentLocation(true)}
        >
          Current Location
        </button>
        <button
          className={`px-4 py-2 rounded ${
            !isCurrentLocation ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setIsCurrentLocation(false)}
        >
          Search Location
        </button>
      </div>

      {!isCurrentLocation && (
        <div className="mb-4">
          <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_API_KEY}>
            <GeoapifyGeocoderAutocomplete
              placeholder="Search for a location..."
              placeSelect={handlePlaceSelect}
            />
          </GeoapifyContext>
        </div>
      )}

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {isLoading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <>
          {location && <MyMap long={location.long} lat={location.lat} />}
          {location && (
            <div className="mb-4">
              <div>Longitude: {location.long}</div>
              <div>Latitude: {location.lat}</div>
              <div>Location: {detailLocation?.location}</div>
            </div>
          )}

          {nearLocation && (
            <div className="grid gap-4">
              {nearLocation.map((item, index) => (
                <div key={index} className="border p-4 rounded">
                  <div className="font-bold text-orange-700">
                    {item.properties.name}
                  </div>
                  <div className="text-gray-600">{item.properties.kinds}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Location;
