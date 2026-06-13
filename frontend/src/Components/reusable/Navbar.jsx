import React, { useContext } from "react";
import { LogIn, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { UserContext } from "../Context/UserContext";

const Navbar = () => {
  const { loggedIn, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="w-full flex justify-between  h-20 items-center bg-transparent rounded-2xl  py-5 backdrop-blur-xl   ">
      <div className="flex font-bold">Otino</div>
      <div className="flex w-3/4 items-center justify-center ">
        <SearchBar />
      </div>
      <div className="flex">
        <ul className="flex gap-5 text-[14px] font-medium">
          <Link to="/">Home</Link>
          <Link to="/browse">Browse Notes</Link>
          <Link to="/profile">{loggedIn ? <User size={20} /> : <User size={20} />}</Link>
          {loggedIn ? (
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 text-[14px]"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <Link to="/login" className="inline-flex items-center gap-2">
              <LogIn size={18} />
              Login
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

