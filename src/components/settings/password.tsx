import { FC, useState } from 'react';
import { useRouter } from 'next/router';

import post from '../../lib/post-json';
import withSession from '../../components/withSession';
import { IPageProps } from '../../pages/profile/[profileid]/settings';
import styles from '../../styles/pages/settings.module.scss';

async function savePassword (profileId: string, password: string) {
  // here
}

const Password: FC<IPageProps> = props => {
  const { data, showPrompt } = props;
  const { credentials } = data;

  const router = useRouter();
  const { profileid } = router.query;

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>(null);
  const [passwordExists, setPasswordExists] = useState<boolean>(credentials.password);

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  function handleSetPassword() {
    if (password === confirmPassword) {
      if (password.length >= 8) {
        setSubmitted(true);
        savePassword(profileid as string, password)
        .then(() => {
          setPasswordExists(true);
          showPrompt("Kata Sandi berhasil disetel.");
        })
        .catch(() => setError("Masalah terjadi."))
        .finally(() => setSubmitted(false));
      }
      else setError("Kata Sandi minimum 8 huruf.");
    }
    else setError("Kata Sandi tidak cocok.");
  }

  return (
    <main className={styles.form}>
      <h3>Kata Sandi</h3>
      {!passwordExists && <p>Akun anda saat ini belum disetel kata sandi.</p>}
      <label>
        Kata Sandi
        <input type='password' size={70} value={password}
          onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Konfirmasi Kata Sandi
        <input type='password' size={70} value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)} />
      </label>
      <div>
        <button disabled={submitted} onClick={handleSetPassword}>
          {passwordExists ? 'Ubah' : 'Setel'} Kata Sandi
        </button>
        {error && <span>ⓘ {error}</span>}
      </div>
    </main>
  );
}

export default withSession(Password);