import { verifySession } from "@/lib/actions"
import { Box, Typography } from "@mui/material"
import Link from "next/link"

export default async function Page() {

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

  const session = await verifySession();
  const auth = session ? session.pouzivatel : undefined;

  return (
    <Box sx={{ width: { xs: "100%", md: "60vw", lg: "700px" }, mx: "auto" }}>
      <Typography variant="h1" my={4} textAlign={"center"}>
        Vitaj u nás na stranke
        <Typography variant="h1" component={"span"} color="primary"> citaj.sk</Typography>
      </Typography>
      <Typography variant="body1">Táto stránka slúži na prezeranie si kníh, autorov a žánrov, no hlavne na vedenie zoznamu kníh,
        ktoré si si už prečítal alebo si ešte len chceš prečítať
      </Typography>
      {auth == null ? (
        <>
          <Typography variant="body1" mt={4} mb={1}>Pre prístup k tejto funkcionalite sa musíš prihlásiť alebo sa zaregistrovať</Typography>

          <Link href={"/prihlasenie"} style={{ marginRight: 16 }}>Prihlásiť sa</Link>
          <Link href={"/registracia"}>Zaregistrovať sa</Link>
          <p>Ak však nemáš záujem, kľudne si iba <Link href={"/knihy"}>prezri knihy</Link></p>
        </>
      ) : (
        <>
          <p>Momentálne si prihlásený, preto neváhaj a začni si prezerať knihy a pridávať si ich do zoznamu!</p>
          <Link href={"/knihy"}>Prezerať knihy</Link>
        </>
      )}
    </Box>
  )
}