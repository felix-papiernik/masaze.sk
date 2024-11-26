import Image from "next/image";

export default function Home() {

  /**
   * Nezabudni skusit pouzit Image komponentu z Next.js
   * <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
   */

  return (
    <>
      <h1>Domov</h1>
      <p>
        Vitaj na stranke <strong>masaze.sk</strong>
      </p>
    </>
  )
}
