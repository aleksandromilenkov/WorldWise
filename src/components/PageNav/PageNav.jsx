import React from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../Logo/Logo";
import { useAuth } from "../../contexts/AuthProvider";
import Button from "../Button/Button";
const PageNav = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        {!isAuthenticated ? (
          <li>
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        ) : (
          <Button onClick={() => logout()} type={"primary"}>
            Logout
          </Button>
        )}
      </ul>
    </nav>
  );
};

export default PageNav;
