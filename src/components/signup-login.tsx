import { FC, useState } from 'react';
import Link from 'next/link';

import styles from '../styles/components/overlay.module.scss';

interface IProps {
  open: boolean
  closeOverlay: () => void
}

interface IViewProps {
  changeMode: () => void
}

const Overlay: FC<IProps> = props => {
  const { open, closeOverlay } = props;
  const [mode, setMode] = useState<boolean>(false);

  const view = mode ? (
    <Signup changeMode={() => setMode(false)} />
  ) : (
    <Login changeMode={() => setMode(true)} />
  )

  return (
    <div className={styles.blackout}
      style={{ display: open ? 'block' : 'none' }}>
      <div>
        <button onClick={closeOverlay}>X</button>
        {view}
      </div>
    </div>
  );
}

const Login: FC<IViewProps> = props => {
  const { changeMode } = props;

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleSubmit() {
    // here
  }

  return (
    <form className={styles.content}>
      <h2>Masuk</h2>
      <a onClick={changeMode}>Belum punya akun? Daftar disini</a>
      <input type='text' placeholder='Email' 
        value={email} onChange={e => setEmail(e.target.value)} />
      <input type='password' placeholder='Kata Sandi' 
        value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Masuk</button>
      <a>Lupa Kata Sandi?</a>
    </form>
  );
}

const Signup: FC<IViewProps> = props => {
  const { changeMode } = props;

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [socialMedia, setSocialMedia] = useState<string>('');
  const [agree, setAgree] = useState<boolean>(false);

  function handleSubmit() {
    // here
  }

  return (
    <form className={styles.content}>
      <h2>Daftar</h2>
      <a onClick={changeMode}>Sudah punya akun? Masuk disini</a>
      <input type='text' placeholder='Email' 
        value={email} onChange={e => setEmail(e.target.value)} />
      <input type='password' placeholder='Kata Sandi' 
        value={password} onChange={e => setPassword(e.target.value)} />
      <hr />
      <p>
        Jika anda menang undian atau lelang,
        <br/>
        kami akan menghubungi anda dengan info:
      </p>
      <input type='text' placeholder='Nama Lengkap' 
        value={name} onChange={e => setName(e.target.value)} />
      <input type='text' placeholder='Nomor Telepon' 
        value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
      <input type='text' placeholder='Alamat' 
        value={address} onChange={e => setAddress(e.target.value)} />
      <input type='text' placeholder='Social Media' 
        value={socialMedia} onChange={e => setSocialMedia(e.target.value)} />
      <label>
        <input type='checkbox' checked={agree} onChange={e => setAgree(e.target.checked)} />
        Dengan mencentang kotak ini, anda menyetujui{' '}
        <Link href="/"><a>syarat dan ketentuan</a></Link> kami.
      </label>
      <button onClick={handleSubmit}>Daftar</button>
    </form>
  );
}

export default Overlay;