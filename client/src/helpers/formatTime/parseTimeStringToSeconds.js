export const parseTimeStringToSeconds = (timeString) => {
  const convertToSeconds = (hours, minutes = 0) => parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60;

  const timePatterns = [
    { pattern: /^(\d{1,2})[.:](\d{2})$/, handler: (matches) => convertToSeconds(matches[1], matches[2]) },
    { pattern: /^(\d{1,2})[-](\d{2})$/, handler: (matches) => convertToSeconds(matches[1], matches[2]) },
    { pattern: /^(\d+(\.\d+)?)$/, handler: (matches) => parseFloat(matches[1]) * 3600 },
  ];

  for (const { pattern, handler } of timePatterns) {
    const matches = timeString.match(pattern);
    if (matches) {
      return handler(matches);
    }
  }

  return 0;
};
