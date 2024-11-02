import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const Navigation = () => {
  const makeClassLink = ({ isActive }) => {
    return clsx(css.navLink, isActive && css.active);
  };

  return (
    <div className={css.wrapper}>
      <nav className={css.nav}>
        <ul className={css.navList}>
          <li>
            <NavLink to="/" className={makeClassLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={makeClassLink}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
