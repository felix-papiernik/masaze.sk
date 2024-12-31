'use client';

import { useState } from "react";
import { authenticateUsingFormData } from "../../lib/actions";
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { validateLoginData } from "@/lib/zodValidations";


export default function Page() {

  const credentials = {
    email: "",
    password: "",
  }
  
  const [errors, setErrors] = useState({ ...credentials, general: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
  }


  return (
    <Box sx={{ width: { xs: "100%", md: "60vw", lg: "600px" }, mx: "auto" }}>
      <Typography variant="h1" mb={2} textAlign={"center"}>Prihlásenie</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
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
        <Button type="submit" disabled={isSubmitting} variant="contained">Prihlásiť sa</Button>
      </Box>
    </Box>
  )
}
