import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import './navigation.styles.css'
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const {currentUser} = useContext(UserContext);

  console.log(currentUser)
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {currentUser? <span className="nav-link" onClick={signOutUser}>SignOut</span> :<Link className="nav-link" to="/auth">
            SignIn
          </Link>}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
