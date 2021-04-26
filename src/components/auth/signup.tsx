import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';

import styles from '../../styles/components/overlay.module.scss';
import post from '../../lib/post-json';
import { UserDetails } from '../../pages/api/auth/signup';
import { IViewProps } from './overlay';

const Signup: FC<IViewProps> = props => {
  const { open, changeMode, closeOverlay } = props;
  const router = useRouter();

  const [error, setError] = useState<string>(null);
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [agree, setAgree] = useState<boolean>(false);

  useEffect(reset, [open]);
  function reset() {
    setError(null);
    setName('');
    setUsername('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
    setAgree(false);
  }

  async function handleSignIn() {
    const result = await signIn('credentials', { username, password, redirect: false });
    if (result.error) {
      setError(`${result.status}: ${result.error}`);
    }
    else if (result.ok) {
      closeOverlay();
      router.push(`/profile/${username}`);
    }
  }

  async function handleSubmit() {
    const values = [username, password, name, email];
    const noBlank = values.every(value => value.length > 0);
    if (noBlank) {
      if (agree) {
        const newUser: UserDetails = {
          _id: username,
          credentials: { password },
          name, email, phoneNumber
        };
        const response = await post('/api/auth/signup', newUser);
        if (response.ok) {
          handleSignIn();
        }
        else setError("Error terjadi.");
      }
      else setError("Anda harus menyetujui syarat dan ketentuan.");
    }
    else setError("Semua bidang harus terisi.");
  }

  return (
    <form className={styles.content}>
      <h2>Daftar</h2>
      <a onClick={changeMode}>Sudah punya akun? Masuk disini</a>
      {error && <div className={styles.error}>{error}</div>}
      <input type='text' placeholder='Nama Lengkap' 
        value={name} onChange={e => setName(e.target.value)} />
      <input type='text' placeholder='Name Pengguna' 
        value={username} onChange={e => setUsername(e.target.value)} />
      <input type='email' placeholder='Email' 
        value={email} onChange={e => setEmail(e.target.value)} />
      <input type='password' placeholder='Kata Sandi' 
        value={password} onChange={e => setPassword(e.target.value)} />
      <hr />
      <p>
        Jika anda menang undian atau lelang,<br/>
        kami akan menghubungi anda dengan info:
      </p>
      <input type='tel' placeholder='Nomor Telepon' 
        value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
      <label>
        <input type='checkbox' checked={agree} onChange={e => setAgree(e.target.checked)} />
        Dengan mencentang kotak ini, anda menyetujui{' '}
        <Link href="/"><a>syarat dan ketentuan</a></Link> kami.
      </label>
      <button type="button" onClick={handleSubmit}>Daftar</button>
    </form>
  );
}

export default Signup;