import { ChangeEvent, FC, Fragment, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/Layout.module.scss';
import Blanket from './blanket';

type Mode = 'default' | 'search' | 'menu';

const Header: FC = () => {
  const [mode, setMode] = useState<Mode>('default');

  function onInput(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  function onSearch() {
    console.log('Search');
  }

  const defaultHeader = (
    <header className={styles.header}>
      <div className={styles.center}>
        <Link href="/">
          <a><Image src="/token.svg" alt="Icon" width={40} height={40} layout='intrinsic' /></a>
        </Link>
        <div>
          <button onClick={() => setMode('search')}>
            <Image src="/search.svg" alt="Search" width={24} height={24} layout='intrinsic' />
          </button>
          <button onClick={() => setMode('menu')}>
            <Image src="/menu.svg" alt="Menu" width={26} height={26} layout='intrinsic' />
          </button>
        </div>
        <div>
          <div>
            <Image src="/search.svg" alt="Search" width={20} height={20} layout='intrinsic' />
            <input onChange={onInput} onSubmit={onSearch} placeholder="Search LimitedTokens" />
          </div>
          <Link href="/"><a>Home</a></Link>
          <Link href="/market"><a>Marketplace</a></Link>
          <Link href="/aboutnft"><a>What are NFTs</a></Link>
          <Link href="/login"><a>Login</a></Link>
          <Link href="/signup"><a>Sign Up</a></Link>
        </div>
      </div>
    </header>
  );

  const searchHeader = (
    <Fragment>
      <Blanket onClick={() => setMode('default')} />
      <header className={styles.headerSearch}>
        <div className={styles.center}>
          <button onClick={() => setMode('default')}>
            <Image src="/back.svg" alt="Back" width={22} height={22} layout='intrinsic' />
          </button>
          <input onChange={onInput} placeholder="Search LimitedTokens" />
          <button onClick={onSearch}>
            <Image src="/search.svg" alt="Search" width={24} height={24} layout='intrinsic' />
          </button>
        </div>
      </header>
    </Fragment>
  );

  const menuHeader = (
    <Fragment>
      <Blanket onClick={() => setMode('default')} />
      <header className={styles.headerMenu}>
        <Link href="/"><a>Home</a></Link>
        <Link href="/market"><a>Marketplace</a></Link>
        <Link href="/aboutnft"><a>What are NFTs</a></Link>
        <hr />
        <Link href="/login"><a>Login</a></Link>
        <Link href="/signup"><a>Sign Up</a></Link>
      </header>
    </Fragment>
  );

  switch (mode) {
    case 'search':
      return searchHeader;
    case 'menu':
      return menuHeader;
    default:
      return defaultHeader;
  }
}

export default Header;