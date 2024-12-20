import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";

const RoutineCard = ({ routine }) => (
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
    <CardMedia
      component="img"
      alt={routine.title}
      height="200"
      image={routine.image}
      sx={{
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
      }}
    />
    <CardContent>
      <Typography
        variant="h6"
        component="div"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center" }}
      >
        {routine.title}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ textAlign: "center" }}
      >
        {routine.description}
      </Typography>
    </CardContent>
  </Card>
);

export default RoutineCard;
