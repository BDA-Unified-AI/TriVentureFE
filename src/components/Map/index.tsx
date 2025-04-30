import { useState, useEffect } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  FlyToInterpolator,
} from "@goongmaps/goong-map-react";
import axios from "axios";
import {
  EnvironmentFilled,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import useAppState from "../Context/state";

const Map: React.FC = () => {
  const location = useAppState((state) => state.location);
  const [viewport, setViewport] = useState({
    latitude: location?.lat,
    longitude: location?.long,
    zoom: 15,
    transitionDuration: 0,
    transitionInterpolator: new FlyToInterpolator(),
  });

  const [mapStyle, setMapStyle] = useState(
    "https://tiles.goong.io/assets/goong_map_web.json",
  );

  interface Viewport {
    latitude: number;
    longitude: number;
    zoom: number;
    transitionDuration: number;
    transitionInterpolator: FlyToInterpolator;
  }

  const handleViewportChange = (newViewport: Viewport) => {
    setViewport({
      ...newViewport,
      transitionDuration: 0,
    });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const API_KEY_MAP = import.meta.env.VITE_GOONG_MAP_API_KEY;
  const API_KEY = import.meta.env.VITE_GOONG_API_KEY;

  const handleZoomIn = () => {
    setViewport({
      ...viewport,
      zoom: viewport.zoom + 1,
      transitionDuration: 500,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const handleZoomOut = () => {
    setViewport({
      ...viewport,
      zoom: viewport.zoom - 1,
      transitionDuration: 500,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setViewport((prev) => ({
            ...prev,
            latitude: location?.lat || position.coords.latitude,
            longitude: location?.long || position.coords.longitude,
          }));
        },
        (error) => {
          console.error("Error obtaining location:", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  useEffect(() => {
    const fetchPlaces = async () => {
      if (searchQuery.length > 2) {
        try {
          const response = await axios.get(
            `https://rsapi.goong.io/Place/AutoComplete`,
            {
              params: {
                api_key: API_KEY,
                input: searchQuery,
                location: `${viewport.latitude},${viewport.longitude}`,
              },
            },
          );
          setSearchResults(response.data.predictions || []);
        } catch (error) {
          console.error("Error fetching places:", error);
        }
      } else {
        setSearchResults([]);
      }
    };

    const timeoutId = setTimeout(fetchPlaces, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, viewport.latitude, viewport.longitude]);

  const handlePlaceSelect = async (placeId: string) => {
    try {
      const response = await axios.get(`https://rsapi.goong.io/Place/Detail`, {
        params: {
          api_key: API_KEY,
          place_id: placeId,
        },
      });
      const { location } = response.data.result.geometry;
      setSelectedLocation({
        latitude: location.lat,
        longitude: location.lng,
      });
      setViewport({
        ...viewport,
        latitude: location.lat,
        longitude: location.lng,
        zoom: 16,
      });
      setSearchResults([]);
      setSearchQuery("");
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 left-4 z-10 w-72">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a place..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm"
        />
        {searchResults.length > 0 && (
          <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map(
              (result: { place_id: string; description: string }) => (
                <div
                  key={result.place_id}
                  onClick={() => handlePlaceSelect(result.place_id)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {result.description}
                </div>
              ),
            )}
          </div>
        )}
      </div>

      <div className="absolute top-4 right-20 z-10 flex space-x-2">
        <button
          onClick={() =>
            setMapStyle("https://tiles.goong.io/assets/goong_map_web.json")
          }
          className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none"
        >
          Light
        </button>
        <button
          onClick={() =>
            setMapStyle("https://tiles.goong.io/assets/goong_map_dark.json")
          }
          className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none"
        >
          Drak
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <button
          onClick={handleZoomIn}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
        >
          <PlusOutlined className="text-xl" />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
        >
          <MinusOutlined className="text-xl" />
        </button>
      </div>

      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        goongApiAccessToken={API_KEY_MAP}
        onViewportChange={handleViewportChange}
        scrollZoom={true}
        dragPan={true}
        mapStyle={mapStyle}
      >
        {selectedLocation && (
          <Marker
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
          >
            <EnvironmentFilled className="text-2xl text-red-500" />
          </Marker>
        )}
        <GeolocateControl
          style={{ right: 10, top: 300 }}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserLocation={true}
          auto
        />
      </ReactMapGL>
    </div>
  );
};

export default Map;
