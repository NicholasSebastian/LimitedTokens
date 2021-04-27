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
import Password from '../../../components/settings/password';
import ConnectWallet from '../../../components/settings/wallet';
import PaymentMethods from '../../../components/settings/payment';

export interface IPageProps {
  data: IAccount | null
  showPrompt: (message: string, onOk?: () => void) => void
}

interface IButtonProps {
  index: number
}

interface IPrompt {
  message: string
  onOk?: () => void
}

const Settings: FC = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const { profileid } = router.query;

  const pages = useRef(null);
  const [page, setPage] = useState<number>(0);
  const [showPrompt, setShowPrompt] = useState<IPrompt>(null);
  
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
    const props: IPageProps = {
      data: accountData,
      showPrompt: (message, onOk) => setShowPrompt({ message, onOk })
    };

    pages.current = [
      <PublicInfo {...props} />,
      <ShippingAddress {...props} />,
      <LinkAccounts {...props} />,
      <Password {...props} />,
      <ConnectWallet {...props} />,
      <PaymentMethods {...props} />
    ];
  }

  return (
    <Layout title="Settings">
      {showPrompt && (
        <div className={styles.signout_prompt}>
          <div>
            <span>{showPrompt.message}</span>
            <div>
              <button onClick={() => {
                const effect = showPrompt.onOk;
                setShowPrompt(null);
                if (effect) effect();
              }}>OK</button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.container}>
        <aside>
          <Button index={0}>Informasi Publik</Button>
          <Button index={1}>Alamat</Button>
          <Button index={2}>Tautkan Akun</Button>
          <Button index={3}>Kata Sandi</Button>
          <Button index={4}>Wallet Eksternal</Button>
          <Button index={5}>Pembayaran</Button>
        </aside>
        {pages.current[page]}
      </div>
    </Layout>
  );
}

export default Settings;