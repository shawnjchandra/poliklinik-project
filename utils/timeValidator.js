export const isValidTime = (time) => {
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  return timeRegex.test(time);
};

export const isValidRange = (startTime, endTime) => {
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  return timeToMinutes(startTime) < timeToMinutes(endTime);
};
