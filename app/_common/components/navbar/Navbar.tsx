import Link from 'next/link';
import React from 'react';
import { links } from '@/_common/constants/constants';
import styles from './Navbar.module.scss';

export const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <Link href={links.home.href} className={styles.link}>
                {links.home.text}
            </Link>

            <Link href={links.menu1.href} className={styles.link}>
                {links.menu1.text} <span>-&gt;</span>
            </Link>

            <Link href={links.menu2.href} className={styles.link}>
                {links.menu2.text} <span>-&gt;</span>
            </Link>
        </nav>
    );
};
