import { NavLink } from "react-router-dom";
import styles from './NavBar.module.css'
import Logo from "./Logo";

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <Logo/>
          <ul>  
              <li><NavLink to='/product'>product</NavLink></li>
              <li><NavLink to='/pricing'>pricing</NavLink></li>
              <li><NavLink to='/login' className={styles.ctaLink}>login</NavLink></li>
      </ul>
    </nav>
  )
}
