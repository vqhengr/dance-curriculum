import React from "react";
import { Card, CardContent, CardActions, Button, Typography, CardMedia, Box } from "@mui/material";

const StudentCard = ({ student, onClick }) => (
  <Card
    elevation={5}
    sx={{
      borderRadius: 3,
      backgroundColor: "#f5f5f5",
      "&:hover": {
        transform: "scale(1.05)",
        transition: "transform 0.3s ease",
      },
    }}
  >
    {/* Media Section */}
    <CardMedia
      component="img"
      alt={student.name}
      height="140"
      image={`https://via.placeholder.com/300x140?text=${encodeURIComponent(student.name)}`}
      sx={{
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
      }}
    />
    
    {/* Content Section */}
    <CardContent>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {student.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ textAlign: "center", marginTop: 1 }}
        >
          Click below to view curriculum details
        </Typography>
      </Box>
    </CardContent>

    {/* Action Section */}
    <CardActions sx={{ justifyContent: "center" }}>
      <Button
        variant="contained"
        onClick={onClick}
        sx={{
          backgroundColor: "#1e88e5",
          color: "#fff",
          textTransform: "capitalize",
          padding: "6px 16px",
          "&:hover": { backgroundColor: "#1565c0" },
        }}
      >
        View Curriculum
      </Button>
    </CardActions>
  </Card>
);

export default StudentCard;
