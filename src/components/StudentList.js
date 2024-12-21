import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Typography, Alert } from "@mui/material";
import StudentCard from "./StudentCard";
import supabase from "../services/supabaseClient";

const StudentList = ({ onStudentClick }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data, error } = await supabase.from("performer").select("*");
        if (error) {
          throw error;
        }
        setStudents(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching students:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <Grid container justifyContent="center" sx={{ marginTop: 4 }}>
        <CircularProgress />
        <Typography variant="body1" marginTop={2}>
          Loading students...
        </Typography>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center" sx={{ marginTop: 4 }}>
        <Alert severity="error">Error: {error}</Alert>
      </Grid>
    );
  }

  return (
    <Grid container spacing={4}>
      {students.map((student) => (
        <Grid item xs={12} sm={6} md={4} key={student.id}>
          <StudentCard
            student={student}
            onClick={() => onStudentClick(student)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StudentList;
