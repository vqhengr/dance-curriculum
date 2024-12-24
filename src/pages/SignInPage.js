import React from "react";
import { Button, Box, Typography, Container } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import supabase from "../services/supabaseClient";

const SignInPage = () => {
  const handleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        console.error("Error during sign-in:", error.message);
        alert("Failed to sign in. Please try again.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Vi's Dance App
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        Please sign in using your Google account to continue.
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<GoogleIcon />}
          onClick={handleSignIn}
          sx={{
            textTransform: "none",
            backgroundColor: "#4285F4", // Google Blue
            "&:hover": {
              backgroundColor: "#357ae8",
            },
          }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default SignInPage;
