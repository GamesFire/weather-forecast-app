import { RefObject } from "react";

export function adjustAppContainerHeight(
  appContainerRef: RefObject<HTMLDivElement> | null
) {
  if (!appContainerRef || !appContainerRef.current) {
    return;
  }

  const roleAttribute = appContainerRef.current.getAttribute("role");

  if (roleAttribute !== "app-container") {
    console.error("Invalid app container reference provided.");
    return;
  }

  const screenHeight = window.screen.height;
  const orientation = window.screen.orientation.type;
  const portrait =
    orientation === "portrait-primary" || orientation === "portrait-secondary";
  const landscape =
    orientation === "landscape-primary" ||
    orientation === "landscape-secondary";
  const windowHeight = window.innerHeight;
  const maxContentHeight = 850;
  const contentHeight = appContainerRef.current.scrollHeight;

  appContainerRef.current.classList.remove("h-full", "h-screen");

  if (portrait) {
    if (contentHeight > maxContentHeight || screenHeight < 600) {
      appContainerRef.current.classList.add("h-full");
    } else {
      appContainerRef.current.classList.add("h-screen");
    }
  }

  if (landscape) {
    if (contentHeight > windowHeight) {
      appContainerRef.current.classList.add("h-full");
    } else {
      appContainerRef.current.classList.add("h-screen");
    }
  }

  return;
}
