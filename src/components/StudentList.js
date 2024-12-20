import React from "react";
import { Grid } from "@mui/material";
import StudentCard from "./StudentCard";

const StudentList = ({ students, onStudentClick }) => (
  <Grid container spacing={4}>
    {students.map((student, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <StudentCard student={student} onClick={() => onStudentClick(student)} />
      </Grid>
    ))}
  </Grid>
);

export default StudentList;
