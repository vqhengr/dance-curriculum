import React from "react";
import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";

const RoutineCard = ({ routine }) => {
  const { link, notes } = routine;

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
          Dance Routine
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            marginBottom: 2,
            textAlign: "center",
            wordBreak: "break-word",
          }}
        >
          {notes || "No additional notes available."}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            textTransform: "none",
          }}
        >
          View Routine
        </Button>
      </CardActions>
    </Card>
  );
};

export default RoutineCard;
