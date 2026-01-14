import { HistorySchema } from "../types/metric";
import { createMetric } from "../actions/metric";

function getVisitorId() {
  try {
    let id = localStorage.getItem("visitorId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("visitorId", id);
    }
    return id;
  } catch {
    return null;
  }
}

function parseHistory() {
  try {
    const jsonStr = localStorage.getItem("history");
    if (!jsonStr) return [];
    const parsedJson = JSON.parse(jsonStr);
    const parsed = HistorySchema.parse(parsedJson);
    return parsed;
  } catch {
    return [];
  }
}

function readDate(key: string) {
  return parseHistory().find((entry) => entry.key === key)?.lastVisited || null;
}

function writeDate(key: string) {
  const cleanHistory = parseHistory().filter((entry) => entry.key !== key);
  cleanHistory.push({ key, lastVisited: new Date() });
  localStorage.setItem("history", JSON.stringify(cleanHistory));
}

export async function syncMetric(key: string) {
  const lastDate = readDate(key);
  writeDate(key);
  if (lastDate && Date.now() - lastDate.getTime() <= 30 * 60 * 1000) return;
  let retries = 0;
  while (retries < 3) {
    if ((await createMetric({ target: key, visitorId: getVisitorId() })).ok) {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    retries++;
  }
}
