'use client';

import { useState } from "react";
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { validateLoginData } from "@/lib/zod";
import { useEntity } from "../../context/EntityContext";
import { redirect, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { useAuth } from "@/context/AuthContext";
import { createSession } from "@/lib/actions";


export default function Page() {

  const { setEntity } = useEntity();
  const { setAuth } = useAuth();
  const router = useRouter();
  //TODO
  const credentials = {
    email: "felixpapiernik42@gmail.com",
    password: "heslo123",
  }

  const handleLogin = async () => {
    event?.preventDefault();
    setIsSubmitting(true);

    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(credentials),
    // });

    // if (response.ok) {
    //   const data = await response.json();
    //   setEntity(data.entity);
    //   //setUser(data.user); // Uloženie používateľa do Contextu
    //   //console.log("user set in context", data.user);
    //   router.push("/dashboard");
    // } else {
    //   //todo
    //   setErrors({ ...credentials, general: "Nepodarilo sa prihlasit felixa" });
    // }
    const response = await fetch('/api/loginAuth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    
    const createAuthSession = await createSession(credentials.email, credentials.password);

    if (createAuthSession) {
      setAuth(createAuthSession);
      redirect("/dashboard");
    } else {
      //todo
      setErrors({ ...credentials, general: "Nepodarilo sa prihlasit" });
    }
    setIsSubmitting(false);
  };



  const [errors, setErrors] = useState({ ...credentials, general: "" });
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
