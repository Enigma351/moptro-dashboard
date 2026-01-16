export const getToken = () =>
  localStorage.getItem('token') ||
  sessionStorage.getItem('token');

export const getAuthUser = () => {
  const user =
    localStorage.getItem('user') ||
    sessionStorage.getItem('user');

  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};
