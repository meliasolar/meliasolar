import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Services from "./Services";

// Map URL paths to section IDs
const sectionMap: Record<string, string> = {
  "/solar": "solar",
  "/supercharger": "tesla",
  "/hvac": "hvac",
  "/title24": "roofing",
  "/fans": "quietcool",
};

const ServiceSection = () => {
  const location = useLocation();

  useEffect(() => {
    const sectionId = sectionMap[location.pathname];
    if (sectionId) {
      // Small delay to ensure the page is rendered
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location.pathname]);

  return <Services />;
};

export default ServiceSection;
