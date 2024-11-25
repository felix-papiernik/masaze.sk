'use client';

import { useActionState } from "react";
import { authenticate } from "../../lib/actions";


export default function Page() {

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <div>
      <h1>Prihlásenie</h1>
      <form action={formAction}>
        <input type="text" placeholder="email" id="email" name="email"/>
        <input type="text" placeholder="password" id="password" name="password"/>
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit">prihlasenie</button>
      </form>
    </div>
  )
}