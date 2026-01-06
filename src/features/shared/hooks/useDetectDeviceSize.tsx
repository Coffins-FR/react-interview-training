import { useState, useEffect } from "react";

const useDetectDeviceSize = () => {
  const [deviceSize, setDeviceSize] = useState<"mobile" | "tablet" | "desktop">(
    () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width < 768) return "mobile";
        if (width < 1024) return "tablet";
        return "desktop";
      }
      return "desktop"; // Default to desktop for server-side rendering
    }
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceSize("mobile");
      } else if (width < 1024) {
        setDeviceSize("tablet");
      } else {
        setDeviceSize("desktop");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceSize;
};

export default useDetectDeviceSize;
