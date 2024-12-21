import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  Typography,
  CircularProgress,
  Button,
  Box,
  Grid,
} from "@mui/material";
import supabase from "../services/supabaseClient";

const CurriculumDialog = ({ student, onClose }) => {
  const [danceRoutines, setDanceRoutines] = useState([]);
  const [loadingRoutines, setLoadingRoutines] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!student) return;

    const fetchDanceRoutines = async () => {
      setLoadingRoutines(true);
      try {
        const { data, error } = await supabase
          .from("danceroutine")
          .select(
            "id, link, description, priority_id, source:source_id(source_name), status:status_id(status_name)"
          )
          .eq("performer_id", student.id)
          .not("priority_id", "is", null) // Exclude records where priority_id is null
          .order("priority_id", { ascending: false })
          .limit(5);

        if (error) {
          throw error;
        }

        setDanceRoutines(data);
      } catch (err) {
        setError("Failed to fetch dance routines. Please try again.");
        console.error("Error fetching dance routines:", err.message);
      } finally {
        setLoadingRoutines(false);
      }
    };

    fetchDanceRoutines();
  }, [student]);

  const getStatusStyle = (statusName) => {
    switch (statusName) {
      case "Not Started":
        return { color: "#FFB74D", fontWeight: "bold" }; // Soft Orange
      case "In Progress":
        return { color: "#64B5F6", fontWeight: "bold" }; // Light Blue
      case "Completed":
        return { color: "#81C784", fontWeight: "bold" }; // Soft Green
      default:
        return { color: "#BDBDBD", fontWeight: "bold" }; // Light Grey for unknown status
    }
  };

  return (
    <Dialog open={!!student} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {student?.display_name
          ? `${student.display_name}'s Curriculum`
          : "Dance Routines"}
      </DialogTitle>
      <DialogContent>
        {loadingRoutines ? (
          <Box display="flex" justifyContent="center" marginTop={2}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="body2" color="error" textAlign="center">
            {error}
          </Typography>
        ) : danceRoutines.length > 0 ? (
          <List>
            {danceRoutines.map((routine) => (
              <ListItem key={routine.id} divider>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Routine ID: {routine.id}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Description:</strong>{" "}
                      {routine.description || "No description available"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      <strong>Priority:</strong> {routine.priority_id || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="body2"
                      sx={getStatusStyle(routine.status?.status_name)}
                    >
                      <strong>Status:</strong> {routine.status?.status_name || "Unknown"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Source:</strong> {routine.source?.source_name || "Unknown"}
                    </Typography>
                  </Grid>
                  {routine.link && (
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        href={routine.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          textTransform: "none",
                          marginBottom: 2,
                        }}
                      >
                        View Routine
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" textAlign="center" color="textSecondary">
            No dance routines available for this student.
          </Typography>
        )}

        <Box textAlign="center" marginTop={2}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: "#1e88e5",
              color: "#1e88e5",
              "&:hover": {
                borderColor: "#1565c0",
                backgroundColor: "#e3f2fd",
              },
            }}
          >
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CurriculumDialog;
