export function setTrackHistoryInLocalStorage(dataTrack) {
  let existingHistoryQueue = JSON.parse(localStorage.getItem("trackHistory"));

  if (existingHistoryQueue === null) {
    existingHistoryQueue = [];
  }

  existingHistoryQueue.push(dataTrack);

  localStorage.setItem("trackHistory", JSON.stringify(existingHistoryQueue));

  return existingHistoryQueue.length;
}

export function setTrackQueueInLocalStorage(dataTrack) {
  let existingTrackQueue = JSON.parse(localStorage.getItem("trackQueue"));

  if (existingTrackQueue === null) {
    existingTrackQueue = [];
  }

  existingTrackQueue.push(dataTrack);

  localStorage.setItem("trackQueue", JSON.stringify(existingTrackQueue));

  return existingTrackQueue.length;
}

export function resetPositionInHistory() {
  const historyLength = JSON.parse(
    localStorage.getItem("trackHistory"),
  )?.length;
  return historyLength > 1 ? historyLength - 2 : 0;
}
