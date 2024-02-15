import { API_URL } from "../config";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useNavigate } from "react-router-dom";
import isAuth from "../auth/AuthService";

const Signout = (btn) => {
  const navigate = useNavigate();
  // Signout
  btn.onclick = () => {
    if (isAuth()) {
      fetch(`${API_URL}api/signout`)
        .then(() => {
          toastr.info("Vous Êtes Déconnecter.", "", {
            positionClass: "toast-top-center",
          });
          localStorage.removeItem("jwt_info");
          navigate("/signin");
        })
        .catch((err) => console.log(err));
    }else{
      toastr.error("Vous Êtes Déjà Déconnecter!", "", {
        positionClass: "toast-top-center",
      });
      navigate("/signin");
    }
  };
};
export default Signout;
