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

export const updateUserPassword = (password, token, email) => {
  return new Promise((resolve, reject) => {
    try {
      fetch("/api/change-password", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          token,
          email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.error) {
            reject(data?.error);
          } else {
            resolve(data?.message);
          }
        })
        .catch(reject);
    } catch (error) {
      console.error(error);
      reject();
    }
  });
};
