export const calculateCompletionPercentage = (creationDate, deadline) => {
  const currentDate = new Date();
  const creationDateTime = new Date(creationDate).getTime();
  const deadlineTime = new Date(deadline).getTime();

  const totalDuration = deadlineTime - creationDateTime;

  const passedDuration = currentDate.getTime() - creationDateTime;

  const completionPercentage = (passedDuration / totalDuration) * 100;

  return Math.min(Math.max(completionPercentage, 0), 100);
};
