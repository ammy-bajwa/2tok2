export const getLatestAdminSettings = () => {
  return new Promise((resolve, reject) => {
    fetch("/admin-settings/get")
      .then((res) => res.json())
      .then((data) => {
        const latestSettings = data?.latestSettings;
        resolve(latestSettings);
      })
      .catch(reject);
  });
};

export const setLatestAdminSettings = (timeOutDuration) => {
  return new Promise((resolve, reject) => {
    fetch("/admin-settings/post", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idleTimeLogout: timeOutDuration,
      }),
    })
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};
