import React from 'react';
import { links } from '@/_constants/constants';
import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer data-testid="footer" className={styles.footer}>
            <div data-testid="footer-text" className={styles.description}>
                <p>
                    Range exercise developed with{' '}
                    <a data-testid="link-nextjs" href={links.nextjs.href} target="_blank" rel="noopener noreferrer">
                        <strong>{links.nextjs.text}</strong>
                    </a>{' '}
                    by{' '}
                    <a data-testid="link-github" href={links.github.href} target="_blank" rel="noopener noreferrer">
                        {links.github.text}
                    </a>
                    .
                </p>
            </div>
        </footer>
    );
};
