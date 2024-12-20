import React from "react";
import { Container, Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";

// Mock Data for Dance Routines
const danceRoutines = [
  {
    title: "Salsa Basic Steps",
    description: "Learn the foundation of salsa with basic steps and timing.",
    image: "https://via.placeholder.com/300x200?text=Salsa",
  },
  {
    title: "Bachata Partner Dance",
    description: "Explore smooth and sensual moves in Bachata partner work.",
    image: "https://via.placeholder.com/300x200?text=Bachata",
  },
  {
    title: "Hip Hop Groove",
    description: "Master the groove and energy of classic hip hop routines.",
    image: "https://via.placeholder.com/300x200?text=Hip+Hop",
  },
  {
    title: "Waltz Elegance",
    description: "Experience the elegance and flow of the waltz.",
    image: "https://via.placeholder.com/300x200?text=Waltz",
  },
];

const DanceRoutinesPage = () => {
  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Dance Routines
      </Typography>
      <Grid container spacing={4}>
        {danceRoutines.map((routine, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DanceRoutinesPage;
