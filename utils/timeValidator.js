export const isValidTime = (time) => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

  return timeRegex.test(time);
};

export const isValidRange = (startTime, endTime) => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

  if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
    return false;
  }

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  return timeToMinutes(startTime) < timeToMinutes(endTime);
};
