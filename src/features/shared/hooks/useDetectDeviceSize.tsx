import { useState, useEffect } from "react";

type DeviceSize = "mobile" | "tablet" | "desktop";
type DeviceSizes = {
  mobile: number;
  tablet: number;
  desktop?: number;
};

export const DEVICE_SIZES: DeviceSizes = {
  mobile: 768,
  tablet: 1024,
};

const useDetectDeviceSize = ({ mobile, tablet }: DeviceSizes) => {
  const [deviceSize, setDeviceSize] = useState<DeviceSize>(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < mobile) return "mobile";
      if (width < tablet) return "tablet";
      return "desktop";
    }
    return "desktop"; // Default to desktop for server-side rendering
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < mobile) {
        setDeviceSize("mobile");
      } else if (width < tablet) {
        setDeviceSize("tablet");
      } else {
        setDeviceSize("desktop");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobile, tablet]);

  return deviceSize;
};

export default useDetectDeviceSize;
