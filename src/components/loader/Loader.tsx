import { FC } from "react";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store/store";
import "./loader.css";

const Loader: FC = () => {
  const { showSidebar } = useAppSelector(
    (state: RootState) => state.showSidebarReducer
  );

  return (
    <div className="flex justify-center items-center">
      <div className={`loader ${showSidebar && "h-14 w-14"}`} />
    </div>
  );
};

export default Loader;
