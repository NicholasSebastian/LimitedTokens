import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/components/layout.module.scss';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className='container'>
        <section>
          <Link href="/"><a><Image src="/logo.png" alt="Logo" width={48} height={48} layout='intrinsic' /></a></Link>
          <input type='text' size={50} placeholder="Cari nama, koleksi, dll" />
          <div>
            <Link href="/market"><a>Pasar</a></Link>
            <Link href="/collection"><a>Koleksi</a></Link>
            <Link href="/tutorial"><a>Tutorial</a></Link>
          </div>
        </section>
        <button>Daftar / Masuk</button>
      </div>
    </header>
  );
}

export default Header;