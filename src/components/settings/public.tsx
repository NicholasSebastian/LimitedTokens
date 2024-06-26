import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { signout } from 'next-auth/client';

import post from '../../lib/post-json';
import withSession from '../../components/withSession';
import { IPageProps } from '../../pages/profile/[profileid]/settings';
import { IPublicInfo } from '../../pages/api/profile/[profileid]/edit/public';
import styles from '../../styles/pages/settings.module.scss';

const Public: FC<IPageProps> = props => {
  const { data, showPrompt } = props;

  const router = useRouter();
  const { profileid } = router.query;

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>(null);

  const [username, setUsername] = useState<string>(data?._id);
  const [name, setName] = useState<string>(data?.name);
  const [description, setDescription] = useState<string>(data?.description);
  const [socialMedia, setSocialMedia] = useState<string>(data?.socialMedia);

  function uploadPhoto() {
    // TODO: here
  }

  async function saveProfile() {
    setSubmitted(true);
    const newData: IPublicInfo = { username, name, description, socialMedia };
    const response = await post(`/api/profile/${profileid}/edit/public`, newData);
    if (response.ok) {
      const usernameChanged = profileid !== username;
      if (usernameChanged) {
        signout({ redirect: false });
        showPrompt('Username telah terganti, tolong masuk ke akun lagi.', () => router.push('/'));
      }
      else {
        showPrompt('Profil berhasil diganti.');
        setSubmitted(false);
      }
    }
    else {
      if (response.status === 404) {
        setError("Username sudah terpakai.");
      }
      else {
        setError("Masalah terjadi.");
      }
    }
  }

  return (
    <main className={styles.form}>
      <h3>Informasi Publik</h3>
      <label>
        Foto Profil
        <button onClick={uploadPhoto}>Unggah Foto</button>
      </label>
      <hr />
      <label>
        Nama Pengunna
        <input type='text' size={80} value={username}
          onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Nama Penuh
        <input type='text' size={80} value={name}
          onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Deskripsi Profil
        <textarea cols={70} rows={3} value={description}
          onChange={e => setDescription(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') e.preventDefault();
          }} />
      </label>
      <label>
        Social Media
        <input type='text' size={80} value={socialMedia}
          onChange={e => setSocialMedia(e.target.value)} />
      </label>
      <div>
        <button disabled={submitted}
          onClick={saveProfile}>Simpan Perubahan</button>
        {error && <span>ⓘ {error}</span>}
      </div>
    </main>
  );
}

export default withSession(Public);