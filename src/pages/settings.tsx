import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import fetch from 'isomorphic-unfetch';

import styles from '../styles/pages/settings.module.scss';
import Layout from '../components/layout';
import Loading from '../components/loading';

interface IButtonProps {
  index: number
}

const Settings: FC = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  const [page, setPage] = useState<number>(0);
  const [accountData, setAccountData] = useState<any>(null);
  useEffect(fetchData, [loading]);

  function fetchData() {
    if (!loading) {
      if (session) {
        fetch('/api/auth/settings')
        .then(data => data.json())
        .then(account => setAccountData(account))
        .catch(() => router.push('/500'));
      }
      else {
        router.push('/');
      }
    }
  }

  const Button: FC<IButtonProps> = props => {
    const { children, index } = props;
    return (
      <button onClick={() => setPage(index)} 
        className={page === index ? styles.active : undefined}>
        {children}
      </button>
    );
  }

  if (loading || !accountData) return <Loading />;
  return (
    <Layout title="Settings">
      <div className={styles.container}>
        <aside>
          <Button index={0}>Public Information</Button>
          <Button index={1}>Shipping Address</Button>
          <Button index={2}>Link Accounts</Button>
          <Button index={3}>Use External Wallet</Button>
          <Button index={4}>Payment Methods</Button>
          <hr />
          <Button index={5}>Language</Button>
          <Button index={6}>Help and Support</Button>
        </aside>
        <main>
          content here
        </main>
      </div>
    </Layout>
  );
}

export default Settings;