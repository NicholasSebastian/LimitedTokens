import { FC } from 'react';
import Link from 'next/link';
import styles from '../styles/Layout.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <h3>Limited Tokens</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Magnam sint doloremque laudantium qui necessitatibus, error aperiam, itaque deleniti.
      </p>
      <hr />
      <h4>LimitedTokens</h4>
      <span>© 2021 LimitedTokens</span>
    </footer>
  ); 
}

export default Footer;