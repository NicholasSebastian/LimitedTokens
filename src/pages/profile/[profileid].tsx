import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import fetch from 'isomorphic-unfetch';

import styles from '../../styles/pages/profile.module.scss';
import Layout from '../../components/layout';
import Loading from '../../components/loading';
import { IProfile } from '../api/profile/[profileid]';

const PROFILEPIC_SIZE = 120;
const QRCODE_SIZE = 160;

const Profile: FC = () => {
  const router = useRouter();
  const { profileid } = router.query;

  const [profileData, setProfileData] = useState<IProfile>(null);
  useEffect(fetchData, [profileid]);

  const [qrCode, setQrCode] = useState<string>(null);
  useEffect(generateQRCode, [profileData]);

  function fetchData() {
    if (profileid) {
      fetch(`/api/profile/${profileid}`)
      .then(data => data.json())
      .then(profile => setProfileData(profile))
      .catch(() => router.push('/404'));
    }
  }

  function generateQRCode() {
    const hostname = window.location.origin;
    const url = `${hostname}/profile/${profileid}`;
    fetch(`https://chart.googleapis.com/chart?cht=qr&chs=${QRCODE_SIZE}x${QRCODE_SIZE}&chl=${url}&chld=L|1`)
    .then(data => data.blob())
    .then(qrCode => {
      const objectURL = URL.createObjectURL(qrCode);
      setQrCode(objectURL);
    });
  }

  if (!profileData) return <Loading />
  return (
    <Layout className={styles.body}>
      <div className={styles.banner} />
      <section className={styles.profile}>
        <div><img src={qrCode} /></div>
        <div>
          <Image src={profileData.image || '/placeholder.png'} 
            width={PROFILEPIC_SIZE} height={PROFILEPIC_SIZE} />
          <h4>{profileData.name}</h4>
          <span>{profileData._id}</span>
          {profileData.description && <p>{profileData.description}</p>}
        </div>
        <div>
          <h5>Artis / Kolektor</h5>
          <span>0 Karya</span>
          <span>0 Koleksi</span>
        </div>
      </section>
      <section className={styles.content}>
        content here
      </section>
    </Layout>
  );
}

export default Profile;