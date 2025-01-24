'use client';

import { useState } from "react";
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { validateLoginData } from "@/lib/zod";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createSession } from "@/lib/actions";


export default function Page() {

  const { setAuth } = useAuth();
  //TODO
  const credentials = {
    email: "felixpapiernik42@gmail.com",
    password: "heslo123",
  }

  const handleLogin = async () => {
    event?.preventDefault();
    setIsSubmitting(true);

    const validatedLoginData = validateLoginData(credentials);
    if (validatedLoginData.success) {
      console.log("validation success");
    }
    const createAuthSession = await createSession(credentials.email, credentials.password);

    if (createAuthSession) {
      setAuth(createAuthSession);
      redirect("/u/nastenka/");
    } else {
      //todo
      setErrors({ ...credentials, general: "Nepodarilo sa prihlasit" });
    }
    setIsSubmitting(false);
  };



  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  /*async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({ ...credentials, general: "" });

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const parsedUser = validateLoginData({ email, password });

    console.log("CLIENT FORM VALIDATION")

    if (!parsedUser.success) {
      let newErrors = { ...credentials };
      parsedUser.error.errors.forEach((err) => {
        const key = err.path[0];
        if (key) {
          newErrors = { ...newErrors, [key]: err.message };
        }
      });
      setIsSubmitting(false);
      setErrors({ ...newErrors, general: "Formulár obsahuje chyby" });
      return;
    }

    const res = await authenticateUsingFormData(formData);
    setIsSubmitting(false);

    if (res !== undefined) {
      setErrors({ ...credentials, general: res });
    } else {
      return Response.redirect("/dashboard");
    }
  }*/


  return (
    <Box sx={{ width: { xs: "100%", md: "60vw", lg: "600px" }, mx: "auto" }}>
      <Typography variant="h2" mt={4} mb={2} textAlign={"center"}>Prihlásiť demo účet</Typography>
      <Box component="form" onSubmit={handleLogin} sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          error={errors.email !== ""}
          helperText={errors.email}
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="password">Heslo</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            error={errors.password !== ""}
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
          <FormHelperText error>{errors.password}</FormHelperText>
        </FormControl>
        <Typography color="error">{errors.general}</Typography>
        <Button type="submit" disabled={isSubmitting} variant="contained">Prihlásiť klienta felixpapiernik42 heslo123</Button>
      </Box>
    </Box>
  )
}
