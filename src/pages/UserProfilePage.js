import React, { useEffect, useState } from "react";
import { Container, Typography, Box, CircularProgress, Alert } from "@mui/material";
import supabase from "../services/supabaseClient";

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get the authenticated user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setError("No user data found. Please log in.");
          setLoading(false);
          return;
        }

        // Fetch user-specific data from the "users" table
        const { data, error } = await supabase
          .from("users")
          .select("name, role_id, roles(name)")
          .eq("id", user.id)
          .single();

        if (error) {
          throw error;
        }

        // Combine user data with role information
        const userInfo = {
          name: data.name,
          role: data.roles?.name || "N/A",
        };

        setUserData(userInfo);
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
        console.error("Error fetching user data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ marginTop: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        User Profile
      </Typography>
      <Box
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h6" gutterBottom>
          <strong>Name:</strong> {userData.name || "N/A"}
        </Typography>
        <Typography variant="h6" gutterBottom>
          <strong>Role:</strong> {userData.role || "N/A"}
        </Typography>
      </Box>
    </Container>
  );
};

export default UserProfilePage;
