// src/utils/geoipMock.js
export const geoipDB = {
  "192.168.1.10": { country: "Private", city: "Internal", org: "NAT" },
  "10.0.0.1": { country: "Private", city: "VPN Gateway", org: "Internal" },
  "103.86.98.1": { country: "India", city: "Mumbai", org: "Airtel" },
  "8.8.8.8": { country: "US", city: "Mountain View", org: "Google LLC" },
};

export const badIPs = ["103.86.98.1", "66.249.66.1"];