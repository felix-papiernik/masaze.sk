'use client';

import { useState } from "react";
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { validateLoginData } from "@/lib/zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createSession, tryToLogin } from "@/lib/actions";
import { pouzivatel } from "@prisma/client";
import { redirectUrlAfterLogin } from "@/lib/utils";


export default function Page() {

  const { setAuth } = useAuth();
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    generalError: "",
    isSubmitting: false,
  });

  const handleLogin = async () => {
    event?.preventDefault();
    //console.log(JSON.stringify(formState));
    setFormState({ ...formState, isSubmitting: true });

    const validatedLoginData = validateLoginData({
      email: formState.email.value,
      password: formState.password.value
    });

    if (validatedLoginData.error) {
      //console.log("zod error")
      setFormState({
        ...formState, isSubmitting: false,
        email: {
          value: formState.email.value,
          error: validatedLoginData.error.issues?.find(issue => issue.path[0] == "email")?.message ?? ""
        },
        password: {
          value: formState.password.value,
          error: validatedLoginData.error.issues?.find(issue => issue.path[0] == "password")?.message ?? ""
        }
      });
      return;
    }

    //const createAuthSession = await createSession(credentials.email, credentials.password);
    let userLoginTry = await tryToLogin({ email: formState.email.value, password: formState.password.value });
    // console.log("userLoginTry", userLoginTry);
    if ("error" in userLoginTry) {
      setFormState({ ...formState, isSubmitting: false, generalError: userLoginTry.error });
      return;
    }

    const pouzivatel = userLoginTry as pouzivatel;
    await createSession({ pouzivatel });
    setAuth({ pouzivatel });
    //refresh kvoli server header
    router.push(redirectUrlAfterLogin(pouzivatel.je_admin));
    router.refresh();

    //redirect(redirectUrlAfterLogin(pouzivatel.je_admin));
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box sx={{ width: { xs: "100%", md: "60vw", lg: "600px" }, mx: "auto" }}>
      <Typography variant="h1" mt={4} mb={2} textAlign={"center"}>Prihlásiť sa</Typography>
      <Box component="form" onSubmit={handleLogin} sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Email"
          type="email"
          required
          error={formState.email.error !== ""}
          helperText={formState.email.error}
          value={formState.email.value}
          onChange={(e) => setFormState({ ...formState, email: { value: e.target.value, error: formState.email.error } })}
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="password">Heslo</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            error={formState.password.error !== ""}
            value={formState.password.value}
            onChange={(e) => setFormState({ ...formState, password: { value: e.target.value, error: formState.password.error } })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText error>{formState.password.error}</FormHelperText>
        </FormControl>
        <Typography color="error">{formState.generalError}</Typography>
        <Button type="submit" disabled={formState.isSubmitting} variant="contained">Prihlásiť</Button>
      </Box>
    </Box>
  )
}