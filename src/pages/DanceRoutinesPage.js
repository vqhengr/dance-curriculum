import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import RoutineCard from "../components/RoutineCard";
import supabase from "../services/supabaseClient";

const DanceRoutinesPage = () => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const { data, error } = await supabase
          .from("danceroutine")
          .select("*");

        if (error) {
          throw error;
        }

        setRoutines(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching routines:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutines();
  }, []);

  if (loading) {
    return (
      <Container sx={{ marginTop: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" marginTop={2}>
          Loading dance routines...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Alert severity="error">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Dance Routines
      </Typography>
      <Grid container spacing={4}>
        {routines.map((routine) => (
          <Grid item xs={12} sm={6} md={4} key={routine.id}>
            <RoutineCard routine={routine} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DanceRoutinesPage;
