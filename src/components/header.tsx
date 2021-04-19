import { FC, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Session } from 'next-auth';
import { useSession, signOut } from 'next-auth/client';

import styles from '../styles/components/layout.module.scss';

interface IProps {
  loginOrRegister: () => void
}

interface IProfileProps {
  session: Session
}

const ProfileButton: FC<IProfileProps> = props => {
  const { session } = props;

  function handleSignOut() {
    signOut({ redirect: false });
  }

  return (
    <div className={styles.profile}>
      <button>
        <Link href="/"><a>{session.user.name}</a></Link>
        <Image src="/placeholder.jpg" width={40} height={40} />
      </button>
      <div>
        <Link href="/"><button>Profile</button></Link>
        <Link href="/settings"><button>Settings</button></Link>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
}

const Header: FC<IProps> = props => {
  const { loginOrRegister } = props;
  const [session, loading] = useSession();

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
        {session ? (
          <ProfileButton session={session} />
        ) : (
          <button className={styles.login} onClick={loginOrRegister}>Daftar / Masuk</button>
        )}
      </div>
    </header>
  );
}

export default Header;