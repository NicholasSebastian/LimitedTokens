import { FC, useState, useEffect } from 'react';
import { signIn } from 'next-auth/client';

import styles from '../../styles/components/overlay.module.scss';
import { IViewProps } from './overlay';

function handleFacebook() {
  signIn('facebook');
}

function handleGoogle() {
  signIn('google');
}

const Login: FC<IViewProps> = props => {
  const { open, changeMode, closeOverlay } = props;

  const [error, setError] = useState<string>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  useEffect(reset, [open]);

  function reset() {
    setError(null);
    setUsername('');
    setPassword('');
  }

  async function handleSubmit() {
    if (username.length > 0 && password.length > 0) {
      const result = await signIn('credentials', { username, password, redirect: false });
      if (result.error) {
        if (result.status === 401) 
          setError("Email atau Kata Sandi salah.");
        else 
          setError(`${result.status}: ${result.error}`);
      }
      else if (result.ok) {
        closeOverlay();
      }
    }
    else setError("Email dan Kata Sandi harus terisi.");
  }

  return (
    <form className={styles.content}>
      <h2>Masuk</h2>
      <a onClick={changeMode}>Belum punya akun? Daftar disini</a>
      {error && <div className={styles.error}>{error}</div>}
      <input type='text' placeholder='Nama Pengguna' 
        value={username} onChange={e => setUsername(e.target.value)} />
      <input type='password' placeholder='Kata Sandi' 
        value={password} onChange={e => setPassword(e.target.value)} />
      <button type='button' onClick={handleSubmit}>Masuk</button>
      <a>Lupa Kata Sandi?</a>
      <hr/>
      <div>
        <button type='button' onClick={handleFacebook}>Sign in with Facebook</button>
        <button type='button' onClick={handleGoogle}>Sign in with Google</button>
      </div>
    </form>
  );
}

export default Login;