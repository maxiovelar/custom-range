import Link from "next/link";
import React from "react";
import { links } from "../../_constants/constants";
import styles from "./navbar.module.scss";

export const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <Link href={links.home.href} className={styles.link}>
        <p>{links.home.text}</p>
      </Link>

      <Link href={links.menu1.href} className={styles.link}>
        <p>
          {links.menu1.text} <span>-&gt;</span>
        </p>
      </Link>

      <Link href={links.menu2.href} className={styles.link}>
        <p>
          {links.menu2.text} <span>-&gt;</span>
        </p>
      </Link>
    </nav>
  );
};
