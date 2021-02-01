const timeout = (seconds) => new Promise((_, reject) => {
  setTimeout(() => {
    reject(new Error(`Request took too long! Timeout after ${seconds} seconds`));
  }, seconds * 1000);
});

export const getJSON = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  return data;
};

export const getHash = () => window.location.hash?.slice(1) ?? null;
