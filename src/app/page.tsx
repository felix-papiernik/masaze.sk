import { verifySession } from "@/lib/actions"
import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"
import "./index.css"
import Image from "next/image";

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
    <Box sx={{ width: { xs: "100%", md: "60vw", lg: "700px" }, mx: "auto" }} className="container">
      <Typography variant="h1" className="hero-title">
        Vitaj u nás na
        <Typography variant="h1" component="span" className="highlighted-text">
          {" "}citaj.sk
        </Typography>
      </Typography>
      <img className="hero-image" src="https://images.photowall.com/products/84850/vintage-bookshelf.jpg?h=699&q=85" alt="Bookshelf" />
      <Typography variant="body1" className="description">
        Táto stránka slúži na prezeranie kníh, autorov a žánrov, no hlavne na vedenie zoznamu kníh, ktoré si si už prečítal alebo si ešte len chceš prečítať.
      </Typography>

      {auth == null ? (
        <>
          <Typography variant="body1" className="login-message">
            Pre prístup k tejto funkcionalite sa musíš prihlásiť alebo sa zaregistrovať.
          </Typography>

          <div className="auth-buttons">
            <Link href="/prihlasenie">
              <Button variant="contained" className="button-primary">Prihlásiť sa</Button>
            </Link>
            <Link href="/registracia">
              <Button variant="outlined" className="button-secondary">Zaregistrovať sa</Button>
            </Link>
          </div>

          <p className="explore-text">
            Ak však nemáš záujem, kľudne si iba <Link href="/knihy" className="explore-link">prezri knihy</Link>.
          </p>
        </>
      ) : (
        <>
          <p className="welcome-message">
            Momentálne si prihlásený, preto neváhaj a začni si prezerať knihy a pridávať si ich do zoznamu!
          </p>
          <Link href="/knihy">
            <Button variant="contained" className="button-primary">Prezerať knihy</Button>
          </Link>
        </>
      )}
    </Box>
  )
}