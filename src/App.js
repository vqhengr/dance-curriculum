import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab, Box } from "@mui/material";
import AppBarHeader from "./components/AppBarHeader";
import StudentList from "./components/StudentList";
import CurriculumDialog from "./components/CurriculumDialog";
import DanceRoutinesPage from "./pages/DanceRoutinesPage";
import AdminAddClassPage from "./pages/AdminAddClassPage";
import UserProfilePage from "./pages/UserProfilePage"; // Import UserProfilePage
import SignInPage from "./pages/SignInPage";
import supabase from "./services/supabaseClient";

function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    // Fetch current user on initial load
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    fetchUser();

    // Cleanup subscription
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleStudentClick = (student) => setSelectedStudent(student);
  const handleClose = () => setSelectedStudent(null);
  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  if (!user) {
    return <SignInPage />;
  }

  return (
    <div>
      {/* Header */}


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
          <Tab label="Add Class" />
          <Tab label="Profile" /> {/* New Tab for User Profile */}
        </Tabs>

        {/* Tab Content */}
        <Box>
          {activeTab === 0 && (
            <>
              <StudentList
                students={[]}
                onStudentClick={handleStudentClick}
              />
              <CurriculumDialog
                student={selectedStudent}
                onClose={handleClose}
              />
            </>
          )}
          {activeTab === 1 && <DanceRoutinesPage />}
          {activeTab === 2 && <AdminAddClassPage />}
          {activeTab === 3 && <UserProfilePage />} {/* Render UserProfilePage */}
        </Box>
      </Container>
    </div>
  );
}

export default App;
