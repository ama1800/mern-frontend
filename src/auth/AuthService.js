
const AuthService = () => {
  // Check Authentification
  const jwt = localStorage.getItem("jwt_info");
  if (jwt) {
    return JSON.parse(jwt);
  }
  return false;
};
export default AuthService;
