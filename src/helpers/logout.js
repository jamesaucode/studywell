const logout = e => {
  fetch("/logout", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    Vary: "Cookie"
  }).then(res => res.status);
};

export default logout;
