import { FC, useEffect, useState } from "react";
import getCurrentDate from "@/utils/getCurrentDate";

const CurrentDate: FC = () => {
  const [currentDate, setCurrentDate] = useState<string>(() =>
    getCurrentDate()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(getCurrentDate());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <time className="select-none" dateTime={currentDate}>
        {currentDate}
      </time>
    </div>
  );
};

export default CurrentDate;
