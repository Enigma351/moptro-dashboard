export const logout = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  window.location.href = '/signin';
};
