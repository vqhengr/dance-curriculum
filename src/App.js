import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

const students = [
  {
    name: "John Doe",
    curriculum: [
      { dance: "Salsa", level: "Intermediate", progress: "75%" },
      { dance: "Bachata", level: "Beginner", progress: "50%" },
      { dance: "Hip Hop", level: "Advanced", progress: "90%" },
    ],
  },
  {
    name: "Jane Smith",
    curriculum: [
      { dance: "Waltz", level: "Beginner", progress: "40%" },
      { dance: "Cha Cha", level: "Intermediate", progress: "60%" },
      { dance: "Tango", level: "Advanced", progress: "85%" },
    ],
  },
];

function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleClose = () => {
    setSelectedStudent(null);
  };

  return (
    <div>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#1e88e5" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dance Curriculum
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Students
        </Typography>
        <Grid container spacing={4}>
          {students.map((student, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={5}
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#f9f9f9",
                  "&:hover": {
                    transform: "scale(1.02)",
                    transition: "0.3s",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {student.name}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    onClick={() => handleStudentClick(student)}
                    sx={{
                      backgroundColor: "#1e88e5",
                      "&:hover": { backgroundColor: "#1565c0" },
                    }}
                  >
                    View Curriculum
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Dialog for Curriculum */}
      {selectedStudent && (
        <Dialog open={true} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedStudent.name}'s Curriculum</DialogTitle>
          <DialogContent>
            <List>
              {selectedStudent.curriculum.map((course, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={course.dance}
                    secondary={`Level: ${course.level}, Progress: ${course.progress}`}
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    secondaryTypographyProps={{ color: "textSecondary" }}
                  />
                </ListItem>
              ))}
            </List>
            <Box textAlign="center" marginTop={2}>
              <Button
                variant="outlined"
                onClick={handleClose}
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
      )}
    </div>
  );
}

export default App;
