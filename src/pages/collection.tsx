import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import fetch from 'isomorphic-unfetch';

import styles from '../styles/pages/collection.module.scss';
import Layout from '../components/layout';
import { IProfile } from './api/trending';

interface IProfileProps {
  ranking: number
  profile: IProfile
}

const Profile: FC<IProfileProps> = props => {
  const { ranking, profile } = props;
  return (
    <Link href={`/profile/${profile._id}`}>
      <div className={styles.profile} key={ranking}>
        <span>#{ranking}</span>
        <Image src={profile.image || '/placeholder.png'} width={50} height={50} />
        <div>
          <span>{profile._id}</span>
          <span>8.671</span>
        </div>
      </div>
    </Link>
  );
}

const Collection: FC = () => {
  const [mode, setMode] = useState<boolean>(false);

  const [profiles, setProfiles] = useState<Array<IProfile>>(null);
  useEffect(() =>  {
    fetch(`/api/trending?trend=${mode ? 'collector'  : 'artist'}`)
    .then(data => data.json())
    .then(profiles => setProfiles(profiles));
  }, [mode]);

  return (
    <Layout title="Collection" className={styles.body}>
      <section className={styles.trending}>
        <div>
          <h3>Trending</h3>
          <div>
            <button onClick={() => setMode(false)} 
              className={!mode && styles.active}>Artis</button>
            <button onClick={() => setMode(true)} 
              className={mode && styles.active}>Kolektor</button>
          </div>
        </div>
        <div>
          {profiles?.map((profile, i) => <Profile ranking={i + 1} profile={profile} />)}
        </div>
      </section>
      <section className={styles.featured}>
        <h3>Unggulan</h3>
        <div>
          {/* dynamically generated content */}
        </div>
      </section>
    </Layout>
  );
}

export default Collection;
