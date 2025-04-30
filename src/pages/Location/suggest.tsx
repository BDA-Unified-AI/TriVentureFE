import { useState } from "react";
import ReactMapGL, { ViewportProps } from "@goongmaps/goong-map-react";

interface Viewport extends ViewportProps {
  width: number;
  height: number;
}

function Map() {
  const [viewport, setViewport] = useState<Viewport>({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport: Viewport) => setViewport(nextViewport)}
    />
  );
}

export default Map;
