import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from "@mui/material";

const CurriculumDialog = ({ student, onClose }) => (
  <Dialog open={!!student} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>{student?.name}'s Curriculum</DialogTitle>
    <DialogContent>
      <List>
        {student?.curriculum.map((course, index) => (
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

export default CurriculumDialog;
