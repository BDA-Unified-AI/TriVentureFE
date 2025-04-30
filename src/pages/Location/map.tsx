import { useEffect, useRef } from "react";
import maplibre, { Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function MyMap({ long, lat }: { long: number; lat: number }) {
  const mapContainer = useRef(null);
  const mapRef = useRef<maplibre.Map | null>(null);
  const markerRef = useRef<Marker | null>(null);

  useEffect(() => {
    const myAPIKey = "83d2db0a6a084dff8966ad6eb70bee6c";
    const mapStyle = "https://maps.geoapify.com/v1/styles/osm-carto/style.json";
    const initialCoordinates: [number, number] = [long, lat];
    const zoomLevel = 13;

    if (mapContainer.current) {
      const map = new maplibre.Map({
        container: mapContainer.current,
        style: `${mapStyle}?apiKey=${myAPIKey}`,
        center: initialCoordinates,
        zoom: zoomLevel,
      });

      mapRef.current = map;

      // Create initial marker
      const marker = createMarker(initialCoordinates);
      marker.addTo(map);
      markerRef.current = marker;

      // Add click event to map
      map.on("click", (e) => {
        const coordinates: [number, number] = [e.lngLat.lng, e.lngLat.lat];

        if (markerRef.current) {
          markerRef.current.setLngLat(coordinates);
        }
      });

      return () => {
        if (markerRef.current) {
          markerRef.current.remove();
        }
        map.remove();
      };
    }
  }, []);

  const createMarker = (coordinates: [number, number]) => {
    const markerElement = document.createElement("div");
    markerElement.className = "marker";
    markerElement.style.width = "25px";
    markerElement.style.height = "25px";
    markerElement.style.backgroundImage =
      "url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)";
    markerElement.style.backgroundSize = "cover";
    markerElement.style.cursor = "pointer";

    return new maplibre.Marker(markerElement).setLngLat(coordinates);
  };

  return (
    <div
      className="w-full h-4/5"
      ref={mapContainer}
      style={{ height: "100vh", width: "100%" }}
    />
  );
}

export default MyMap;
