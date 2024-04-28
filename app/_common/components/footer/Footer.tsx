import React from "react";
import { links } from "@/_common/constants/constants";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.description}>
        <p>
          Range exercise developed with{" "}
          <a href={links.nextjs.href} target="_blank" rel="noopener noreferrer">
            <strong>{links.nextjs.text}</strong>
          </a>{" "}
          by{" "}
          <a href={links.github.href} target="_blank" rel="noopener noreferrer">
            {links.github.text}
          </a>
          .
        </p>
      </div>
    </footer>
  );
};
