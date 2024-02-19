import { RefObject } from "react";

export function adjustAppContainerHeight(
  appContainerRef: RefObject<HTMLDivElement> | null
): () => void {
  function handleResize() {
    if (!appContainerRef || !appContainerRef.current) {
      return undefined;
    }

    const roleAttribute = appContainerRef.current.getAttribute("role");

    if (roleAttribute !== "app-container") {
      console.error("Invalid app container reference provided.");
      return undefined;
    }

    const windowHeight = window.innerHeight;
    const contentHeight = appContainerRef.current.scrollHeight;
    const hasVerticalScrollbar = contentHeight > windowHeight;

    if (hasVerticalScrollbar) {
      appContainerRef.current.classList.remove("h-screen");
      appContainerRef.current.classList.add("h-full");
    } else {
      appContainerRef.current.classList.remove("h-full");
      appContainerRef.current.classList.add("h-screen");
    }
  }

  handleResize();

  const intervalId = setInterval(handleResize, 500);

  return () => clearInterval(intervalId);
}
