'use client';

import { useActionState, useEffect, useState } from "react";
import { authenticate } from "../../lib/actions";
import { Box, Button, FormControl, Icon, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


export default function Page() {

  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <Box sx={{ width: { xs: "100%", md: "60vw", lg: "600px" }, mx: "auto" }}>
      <Typography variant="h1" mb={2} textAlign={"center"}>Prihlásenie</Typography>
      <Box component="form" action={formAction} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Email"
          name="email"
          type="email"
          required
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="password">Heslo</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
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
        </FormControl>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <Button type="submit" disabled={isPending} variant="contained">Prihlásiť sa</Button>
      </Box>
    </Box>
  )
}
