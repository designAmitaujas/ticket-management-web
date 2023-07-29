import { useCallback, useEffect, useState } from "react";

const useIsTabVisible = () => {
  const [isVisible, setIsVisible] = useState(!document.hidden);

  const handleVisibility = useCallback(() => {
    setIsVisible(!document.hidden);
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [handleVisibility]);

  return isVisible;
};

export { useIsTabVisible };
