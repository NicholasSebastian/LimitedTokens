import { FC, useState } from 'react';
import { useRouter } from 'next/router';

import post from '../../lib/post-json';
import withSession from '../../components/withSession';
import { IPageProps } from '../../pages/profile/[profileid]/settings';
import styles from '../../styles/pages/settings.module.scss';

async function linkFacebook (profileId: string) {
  // here
}

async function linkGoogle (profileId: string) {
  // here
}

const Accounts: FC<IPageProps> = props => {
  const { data, showPrompt } = props;
  const { credentials } = data;

  const router = useRouter();
  const { profileid } = router.query;

  const [fbSubmitted, setFbSubmitted] = useState<boolean>(false);
  const [fbLinked, setFbLinked] = useState<boolean>(credentials.facebook);
  const [ggSubmitted, setGgSubmitted] = useState<boolean>(false);
  const [ggLinked, setGgLinked] = useState<boolean>(credentials.google);

  function handleLinkFacebook() {
    setFbSubmitted(true);
    linkFacebook(profileid as string)
    .then(() => {
      setFbLinked(true);
      showPrompt('Akun Facebook anda berhasil ditaut.');
    })
    .catch(() => setFbSubmitted(false));
  }

  function handleLinkGoogle() {
    setGgSubmitted(true);
    linkGoogle(profileid as string)
    .then(() => {
      setGgLinked(true);
      showPrompt('Akun Google anda berhasil ditaut.');
    })
    .catch(() => setGgSubmitted(false));
  }
  
  return (
    <main className={styles.form}>
      <h3>Taut Akun</h3>
      <label>
        Facebook
        {fbLinked ? (
          <button disabled>Akun Tersambung</button>
        ) : (
          <button disabled={fbSubmitted} 
            onClick={handleLinkFacebook}>Tautkan Akun</button>
        )}
      </label>
      <label>
        Google
        {ggLinked ? (
          <button disabled>Akun Tersambung</button>
        ) : (
          <button disabled={ggSubmitted} 
            onClick={handleLinkGoogle}>Tautkan Akun</button>
        )}
      </label>
    </main>
  );
}

export default withSession(Accounts);