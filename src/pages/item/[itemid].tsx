import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import styles from '../../styles/pages/item.module.scss';
import Layout from '../../components/layout';
import commaSeparator from '../../utils/commaSeparator';

const PROFILE_PIC_SIZE = 60;

const Item: FC<ITokenData> = props => {
  const { 
    file, tokenName, tokenDescription, price, creatorName, ownerName, history 
  } = props;

  return (
    <Layout className={styles.body}>
      <div>
        <div>
          <Image src={file} alt="Image" layout='fill' objectFit='contain' />
        </div>
        <div>
          <h3>{tokenName}</h3>
          <div>
            <div>
              <Image src="/placeholder.jpg" width={PROFILE_PIC_SIZE} height={PROFILE_PIC_SIZE} />
              <div>
                <span>Created by:</span>
                <Link href="/"><a>{creatorName}</a></Link>
              </div>
            </div>
            <div>
              <Image src="/placeholder.jpg" width={PROFILE_PIC_SIZE} height={PROFILE_PIC_SIZE} />
              <div>
                <span>Owned by:</span>
                <Link href="/"><a>{ownerName}</a></Link>
              </div>
            </div>
          </div>
          <p>{tokenDescription}</p>
          <h5>Info Hadiah untuk Pemenang</h5>
          <section>
            {history.map(event => {
              const now = new Date();
              const eventTime = new Date(JSON.parse(event.time));
              const millisecondsAgo = now.getTime() - eventTime.getTime();
              const daysAgo = Math.floor(millisecondsAgo / (1000 * 60 * 60 * 24));
              return (
                <div>
                  <Image src="/placeholder.jpg" width={PROFILE_PIC_SIZE} height={PROFILE_PIC_SIZE} />
                  <div>
                    <span>{event.description}</span>
                    <span>{daysAgo} days ago.</span>
                    <span>by <Link href="/"><a>{event.by}</a></Link></span>
                  </div>
                </div>
              );
            })}
            </section>
          <span>Harga: <span>Rp.{commaSeparator(price)}</span></span>
          <button>Beli Lelang</button>
        </div>
      </div>
    </Layout>
  );
}

export { getServerSideProps };
export default Item;

const getServerSideProps: GetServerSideProps<ITokenData> = async (context) => {
  const daysBefore = (days: number) => {
    const now = new Date();
    const then = new Date(now.setDate(now.getDate() - days));
    return JSON.stringify(then);
  }
  const testData = {
    file: "https://liquipedia.net/commons/images/a/a0/Apex_Legends_M600_Spitfire.jpg",
    tokenName: "M300 Spitfire",
    tokenDescription: `
      The M600 Spitfire Mk3 is a light machine gun manufactured by Jaewon Industries. 
      Descended from the Frontier War-era Mk1 and Mk2, the design and operation of 
      the Mk3 seems to be a mix of both of its ancestors, retaining the gas operated, 
      rotating bolt locking mechanism of the Mk1 but using the light composite frame 
      of the Mk2. Improvements to initial recoil and accuracy makes it a good weapon 
      for sustained suppressive fire.
    `,
    price: 10000,
    creatorName: "Bangalore",
    ownerName: "Wraith",
    history: [
      {
        description: "Offered 8 ETH for 1 edition",
        time: daysBefore(2),
        by: "Pathfinder"
      },
      {
        description: "Put on sale for 10 ETH",
        time: daysBefore(5),
        by: "Gibraltar"
      },
      {
        description: "Sale cancelled",
        time: daysBefore(8),
        by: "Bloodhound"
      }
    ]
  };

  return { props: { ...testData } };
}

interface ITokenData {
  file: string
  tokenName: string
  tokenDescription: string
  price: number
  creatorName: string
  ownerName: string
  history: Array<{
    description: string
    time: string
    by: string
  }>
}