import { FC, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import fetch from 'isomorphic-unfetch';

import styles from '../../../styles/pages/settings.module.scss';
import { IAccount } from '../../api/profile/[profileid]/settings';
import Layout from '../../../components/layout';
import Loading from '../../../components/loading';

import PublicInfo from '../../../components/settings/public';
import ShippingAddress from '../../../components/settings/address';
import LinkAccounts from '../../../components/settings/link-accounts';
import ConnectWallet from '../../../components/settings/wallet';
import PaymentMethods from '../../../components/settings/payment';

export interface IPageProps {
  data: IAccount | null
}

interface IButtonProps {
  index: number
}

const Settings: FC = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const { profileid } = router.query;

  const pages = useRef(null);
  const [page, setPage] = useState<number>(0);
  
  const [accountData, setAccountData] = useState<any>(null);
  useEffect(fetchData, [loading, profileid]);

  function fetchData() {
    if (!loading && profileid) {
      if (session) {
        fetch(`/api/profile/${profileid}/settings`)
        .then(data => data.json())
        .then(account => setAccountData(account))
        .catch(() => router.push('/500'));
      }
      else {
        router.push('/404');
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

  if (loading || !accountData) {
    return <Loading />;
  }
  if (!pages.current) {
    pages.current = [
      <PublicInfo data={accountData} />,
      <ShippingAddress data={accountData} />,
      <LinkAccounts data={accountData} />,
      <ConnectWallet data={accountData} />,
      <PaymentMethods data={accountData} />
    ];
  }
  return (
    <Layout title="Settings">
      <div className={styles.container}>
        <aside>
          <Button index={0}>Informasi Publik</Button>
          <Button index={1}>Alamat</Button>
          <Button index={2}>Tautkan Akun</Button>
          <Button index={3}>Wallet Eksternal</Button>
          <Button index={4}>Pembayaran</Button>
        </aside>
        {pages.current[page]}
      </div>
    </Layout>
  );
}

export default Settings;