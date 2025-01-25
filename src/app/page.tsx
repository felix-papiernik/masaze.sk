"use client"

import { useAuth } from "@/context/AuthContext"
import Link from "next/link"

export default function Page() {

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

  const { auth } = useAuth()

  return (
    <>
      <h1>Domov</h1>
      <p>
        Vitaj na stranke <strong>citaj.sk</strong>
      </p>
      <p style={{paddingBottom: 24}}>Táto stránka slúži na prezeranie si kníh, autorov a žánrov, no hlavne na vedenie zoznamu kníh,
        ktoré si si už prečítal alebo si ešte len chceš prečítať
      </p>
      {auth == null ? (
        <>
          <p>
            <strong>Pre prístup k tejto funkcionalite sa musíš prihlásiť alebo sa zaregistrovať</strong>
          </p>
          <Link href={"/prihlasenie"} style={{ marginRight: 16 }}>Prihlásiť sa</Link>
          <Link href={"/registracia"}>Zaregistrovať sa</Link>
        </>
      ) : (
        <>
          <p>Momentálne si prihlásený, preto neváhaj a začni si prezerať knihy a pridávať si ich do zoznamu!</p>
          <Link href={"/knihy"}>Prezerať knihy</Link>
        </>
      )}
    </>
  )
}