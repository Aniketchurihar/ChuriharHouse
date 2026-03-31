import { siteConfig } from "../data/siteConfig";

const { coordinates, mapsUrl } = siteConfig.contact;

export function handleGetDirections(e) {
  if (e) e.preventDefault();

  if (!navigator.geolocation) {
    window.open(mapsUrl, "_blank");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;

      fetch("/api/geo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gpsLatitude: String(latitude),
          gpsLongitude: String(longitude),
        }),
        keepalive: true,
      }).catch(() => {});

      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${coordinates.lat},${coordinates.lng}`,
        "_blank",
      );
    },
    () => {
      window.open(mapsUrl, "_blank");
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
  );
}
