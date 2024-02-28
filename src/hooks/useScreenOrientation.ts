import { useState, useEffect } from "react";
import { useAppDispatch } from "./redux";
import { setShowSidebar } from "@/store/reducers/slices/showSidebarSlice";

export const useScreenOrientation = () => {
  const dispatch = useAppDispatch();
  const [orientation, setOrientation] = useState(
    window.screen.orientation.type
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      dispatch(setShowSidebar(false));
      setOrientation(window.screen.orientation.type);
    };

    window.addEventListener("orientationchange", handleOrientationChange);
    return () =>
      window.removeEventListener("orientationchange", handleOrientationChange);
  }, [dispatch]);

  return orientation;
};
