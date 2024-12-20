import React, { useState } from "react";
import { Container, Typography, Tabs, Tab, Box } from "@mui/material";
import AppBarHeader from "./components/AppBarHeader";
import StudentList from "./components/StudentList";
import CurriculumDialog from "./components/CurriculumDialog";
import DanceRoutinesPage from "./pages/DanceRoutinesPage";
import students from "./data/students";

function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleStudentClick = (student) => setSelectedStudent(student);
  const handleClose = () => setSelectedStudent(null);
  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  return (
    <div>
      {/* Header */}
      <AppBarHeader />

      {/* Tabs for Navigation */}
      <Container sx={{ marginTop: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{ marginBottom: 4 }}
        >
          <Tab label="Students" />
          <Tab label="Dance Routines" />
        </Tabs>

        {/* Tab Content */}
        <Box>
          {activeTab === 0 && (
            <>
              <Typography variant="h4" gutterBottom textAlign="center">
                Students
              </Typography>
              <StudentList
                students={students}
                onStudentClick={handleStudentClick}
              />
              <CurriculumDialog
                student={selectedStudent}
                onClose={handleClose}
              />
            </>
          )}
          {activeTab === 1 && <DanceRoutinesPage />}
        </Box>
      </Container>
    </div>
  );
}

export default App;
