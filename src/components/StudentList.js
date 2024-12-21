import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Typography, Alert } from "@mui/material";
import StudentCard from "./StudentCard";
import DanceStatsDialog from "./DanceStatsDialog";
import CurriculumDialog from "./CurriculumDialog";
import supabase from "../services/supabaseClient";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openDialogType, setOpenDialogType] = useState(null); // 'stats' or 'curriculum'

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

  const handleViewStats = (student) => {
    setSelectedStudent(student);
    setOpenDialogType("stats");
  };

  const handleViewCurriculum = (student) => {
    setSelectedStudent(student);
    setOpenDialogType("curriculum");
  };

  const handleCloseDialog = () => {
    setSelectedStudent(null);
    setOpenDialogType(null);
  };

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
    <>
      <Grid container spacing={4}>
        {students.map((student) => (
          <Grid item xs={12} sm={6} md={4} key={student.id}>
            <StudentCard
              student={student}
              onViewStats={() => handleViewStats(student)}
              onViewCurriculum={() => handleViewCurriculum(student)}
            />
          </Grid>
        ))}
      </Grid>

      {selectedStudent && openDialogType === "stats" && (
        <DanceStatsDialog
          student={selectedStudent}
          onClose={handleCloseDialog}
        />
      )}

      {selectedStudent && openDialogType === "curriculum" && (
        <CurriculumDialog
          student={selectedStudent}
          onClose={handleCloseDialog}
        />
      )}
    </>
  );
};

export default StudentList;
