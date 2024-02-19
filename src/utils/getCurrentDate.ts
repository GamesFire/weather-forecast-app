const getCurrentDate = (): string => {
  const today = new Date();
  const currentDay =
    today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const currentMonth =
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1;
  return `${currentDay}.${currentMonth}.${today.getFullYear()}`;
};

export default getCurrentDate;
