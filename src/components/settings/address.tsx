import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import post from '../../lib/post-json';
import { IPageProps } from '../../pages/profile/[profileid]/settings';
import { IAddress } from '../../pages/api/profile/[profileid]/edit/address';
import styles from '../../styles/pages/settings.module.scss';

const Address: FC<IPageProps> = props => {
  const { shippingAddress } = props.data;

  const [session, loading] = useSession();
  useEffect(checkSession, [loading]);

  const router = useRouter();
  const { profileid } = router.query;

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>(null);

  const [address, setAddress] = useState<string>(shippingAddress?.address);
  const [city, setCity] = useState<string>(shippingAddress?.city);
  const [postalCode, setPostalCode] = useState<number>(shippingAddress?.postalCode);

  function checkSession() {
    if (!session) {
      router.push('/404');
    }
  }

  async function saveAddress() {
    setSubmitted(true);
    const newAddress: IAddress = { address, city, postalCode };
    const response = await post(`/api/profile/${profileid}/edit/address`, newAddress);
    if (response.ok) {
      router.push(`/profile/${profileid}`);
    }
    else {
      setError("Masalah terjadi.");
    }
  }

  return (
    <main className={styles.form}>
      <h3>Alamat Pribadi</h3>
      <label>
        Alamat
        <input type='text' size={80} value={address}
          onChange={e => setAddress(e.target.value)} />
      </label>
      <label>
        Kota
        <input type='text' size={60} value={city}
          onChange={e => setCity(e.target.value)} />
      </label>
      <label>
        Kode Pos
        <input type='number' size={30} value={postalCode}
          onChange={e => setPostalCode(e.target.value as any)} />
      </label>
      <div>
        <button disabled={submitted}
          onClick={saveAddress}>Simpan Perubahan</button>
        {error && <span>ⓘ {error}</span>}
      </div>
    </main>
  );
}

export default Address;