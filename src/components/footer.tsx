import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { CompanyName, Email, WhatsApp, Instagram, Twitter, YouTube } from '../data.json';
import styles from '../styles/components/layout.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <section>
          <div>
            <Image src="/logo.png" alt="Logo" width={32} height={32} layout='intrinsic' />
            <h3>{CompanyName}</h3>
          </div>
          <span>© 2021 {CompanyName}</span>
        </section>
        <section>
          <h5>Community</h5>
          <a href={Instagram}>Instagram</a>
          <a href={Twitter}>Twitter</a>
          <a href={YouTube}>YouTube</a>
        </section>
        <section>
          <h5>For Artists</h5>
          <Link href="/"><a>Submit artist profile</a></Link>
        </section>
        <section>
          <h5>Contact</h5>
          <span>WA: {WhatsApp}</span>
          <a href={`mailto:${Email}`}>Email: {Email}</a>
        </section>
      </div>
    </footer>
  ); 
}

export default Footer;