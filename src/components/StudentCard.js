import React from "react";
import { Card, CardContent, Typography, CardActions, Button, Box } from "@mui/material";

const StudentCard = ({ student, onViewStats, onViewCurriculum }) => (
  <Card
    elevation={5}
    sx={{
      borderRadius: 3,
      backgroundColor: "#f9f9f9",
      "&:hover": {
        transform: "scale(1.03)",
        transition: "transform 0.3s ease",
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
        {student.display_name}
      </Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: "center", padding: "16px" }}>
      <Box display="flex" flexDirection="column" gap={2} alignItems="center" width="100%">
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#1976d2", // Primary blue
            "&:hover": {
              backgroundColor: "#115293", // Darker blue on hover
            },
          }}
          onClick={onViewStats}
        >
          View Dance Stats
        </Button>
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "#ff7043", // Orange border
            color: "#ff7043", // Orange text
            "&:hover": {
              backgroundColor: "#ffe0b2", // Light orange on hover
              borderColor: "#ff7043",
            },
          }}
          onClick={onViewCurriculum}
        >
          View Curriculum
        </Button>
      </Box>
    </CardActions>
  </Card>
);

export default StudentCard;
