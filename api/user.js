export const sendForgetPasswordEmail = (email) => {
  return new Promise((resolve, reject) => {
    fetch("/api/forget-password", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};

export const updateUserPassword = (password, token) => {
  return new Promise((resolve, reject) => {
    fetch("/api/change-password", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        token,
      }),
    })
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};
