import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { goliaths } from '../data/goliaths';

export default function Home() {
  console.log('the goliaths are', goliaths);
  const [addGoliathLink, setAddGoliathLink] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Goliath Music</title>
        <meta name='description' content='Where your goliath gets its music.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Goliath Music</h1>
      <p>
        What music is associated with your goliath? (Click in the one you want
        to know)
      </p>
      <main className={styles.main}>
        {goliaths.map((x, i) => (
          <GoliathDisplay goliath={x} />
        ))}
      </main>
      {!addGoliathLink ? (
        <button onClick={() => setAddGoliathLink(prev => !prev)}>
          Add your goliath
        </button>
      ) : (
        <button onClick={() => setAddGoliathLink(prev => !prev)}>Cancel</button>
      )}
      {addGoliathLink && (
        <span>
          {' '}
          <a
            href='https://forms.gle/WNseciUrSyUcZV1c7'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.googleFormLink}
          >
            Fill google form
          </a>{' '}
          <br />
          (This link points to the following URL:
          https://forms.gle/WNseciUrSyUcZV1c7)
        </span>
      )}
    </div>
  );
}

const GoliathDisplay = ({ goliath }) => {
  const [image, setImage] = useState(goliath.imageUrl);
  const [musicDisplay, setMusicDisplay] = useState(null);
  const changeImage = () => {
    if (image === goliath.imageUrl) {
      setMusicDisplay(goliath.musicInfo);
      return setImage(goliath.musicInfo.cover);
    } else {
      setMusicDisplay(null);
      return setImage(goliath.imageUrl);
    }
  };
  return (
    <div className={styles.goliathOuterContainer}>
      {' '}
      <div
        onClick={changeImage}
        key={goliath.number}
        className={styles.goliathContainer}
      >
        <Image unoptimized={true} src={image} fill />
      </div>
      <h3># {goliath.number}</h3>
      {musicDisplay && (
        <div className={styles.musicMetadata}>
          <p>
            <strong>{musicDisplay.title}</strong>
          </p>
          <p>{musicDisplay.author}</p>
          <p>{musicDisplay.year}</p>
        </div>
      )}
    </div>
  );
};
