import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Alert,
} from "@mui/material";
import supabase from "../services/supabaseClient";

const AdminAddClassPage = () => {
  const [classDetails, setClassDetails] = useState({
    name: "",
    description: "",
    start_date: "",
    time: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("classes").insert([
        {
          name: classDetails.name,
          description: classDetails.description || null,
          start_date: classDetails.start_date,
          time: classDetails.time,
        },
      ]);

      if (error) {
        throw error;
      }

      setSuccessMessage("Class added successfully!");
      setErrorMessage("");
      setClassDetails({
        name: "",
        description: "",
        start_date: "",
        time: "",
      });
    } catch (error) {
      console.error("Error adding class:", error.message);
      setErrorMessage("Failed to add class. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" textAlign="center" marginBottom={4}>
        Add New Class
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Class Name"
              name="name"
              value={classDetails.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={classDetails.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Start Date"
              name="start_date"
              type="date"
              value={classDetails.start_date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Time"
              name="time"
              type="time"
              value={classDetails.time}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
            />
          </Grid>
          {successMessage && (
            <Grid item xs={12}>
              <Alert severity="success">{successMessage}</Alert>
            </Grid>
          )}
          {errorMessage && (
            <Grid item xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ textTransform: "none" }}
              >
                Add Class
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AdminAddClassPage;
