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


  console.log(process.env.JWT_SECRET)

  return (
    <>
      <h1>Hello World</h1>
      <p>
        Welcome to <strong>Create Next App!</strong>
      </p>
    </>
  )
}
