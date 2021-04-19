import { FC, useState, useEffect } from 'react';
import Link from 'next/link';

import styles from '../../styles/components/overlay.module.scss';
import { IViewProps } from './overlay';

const Signup: FC<IViewProps> = props => {
  const { changeMode } = props;

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [socialMedia, setSocialMedia] = useState<string>('');
  const [agree, setAgree] = useState<boolean>(false);

  function handleSubmit() {
    // here
  }

  return (
    <form className={styles.content}>
      <h2>Daftar</h2>
      <a onClick={changeMode}>Sudah punya akun? Masuk disini</a>
      <input type='text' placeholder='Name Pengguna' 
        value={username} onChange={e => setUsername(e.target.value)} />
      <input type='password' placeholder='Kata Sandi' 
        value={password} onChange={e => setPassword(e.target.value)} />
      <hr />
      <p>
        Jika anda menang undian atau lelang,<br/>
        kami akan menghubungi anda dengan info:
      </p>
      <input type='text' placeholder='Nama Lengkap' 
        value={name} onChange={e => setName(e.target.value)} />
      <input type='text' placeholder='Email' 
        value={email} onChange={e => setEmail(e.target.value)} />
      <input type='text' placeholder='Nomor Telepon' 
        value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
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

export default Signup;