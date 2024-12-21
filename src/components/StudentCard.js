import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";

const StudentCard = ({ student, onClick }) => {
  const { display_name, key_name } = student;

  return (
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
          {display_name}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          sx={{
            textTransform: "none",
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default StudentCard;
