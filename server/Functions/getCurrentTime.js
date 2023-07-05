const getCurrentTime = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const microseconds = currentTime.getMilliseconds();

  const formattedTime = `${hours}:${minutes}:${seconds}:${microseconds}`;

  return formattedTime;
};

module.exports = {
  getCurrentTime: getCurrentTime,
};
