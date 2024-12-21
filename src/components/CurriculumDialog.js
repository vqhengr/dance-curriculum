import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import ReactECharts from "echarts-for-react";
import supabase from "../services/supabaseClient";

const CurriculumDialog = ({ student, onClose }) => {
  const [danceStats, setDanceStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({}); // Cache for dance stats

  useEffect(() => {
    if (!student) return;

    // Check cache before fetching
    if (cache[student.id]) {
      setDanceStats(cache[student.id]);
      setError(null);
      setLoadingStats(false);
      return;
    }

    const fetchDanceStats = async () => {
      setLoadingStats(true);
      try {
        const { data, error } = await supabase
          .from("dance_stats")
          .select("*")
          .eq("performer_id", student.id)
          .single();

        if (error || !data) {
          setError("No dance stats available for this student.");
          setDanceStats(null);
        } else {
          setDanceStats(data);
          setCache((prevCache) => ({
            ...prevCache,
            [student.id]: data,
          })); // Update cache
        }
      } catch (err) {
        setError("Failed to fetch dance stats. Please try again.");
        console.error("Error fetching dance stats:", err.message);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchDanceStats();
  }, [student, cache]);

  const getRadarChartOptions = () => {
    if (!danceStats || !student) return null;

    return {
      tooltip: {
        trigger: "item",
      },
      radar: {
        indicator: [
          { name: "Frame", max: 5 },
          { name: "Control", max: 5 },
          { name: "Balance", max: 5 },
          { name: "Mobility", max: 5 },
          { name: "Musicality", max: 5 },
          { name: "Connection", max: 5 },
        ],
        shape: "circle",
      },
      series: [
        {
          name: "Dance Stats",
          type: "radar",
          data: [
            {
              value: [
                danceStats.frame,
                danceStats.control,
                danceStats.balance,
                danceStats.mobility,
                danceStats.musicality,
                danceStats.connection,
              ],
              name: student.display_name,
            },
          ],
          areaStyle: {},
        },
      ],
    };
  };

  const radarOptions = getRadarChartOptions();

  return (
    <Dialog open={!!student} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {student?.display_name
          ? `${student.display_name}'s Curriculum`
          : "Curriculum Details"}
      </DialogTitle>
      <DialogContent>
        {/* Curriculum Section */}
        {student?.curriculum?.length > 0 ? (
          <List>
            {student.curriculum.map((course, index) => (
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
        ) : (
          <Typography variant="body1" color="textSecondary" textAlign="center">
            No curriculum data available for this student.
          </Typography>
        )}

        {/* Dance Stats Section */}
        <Box marginTop={4}>
          <Typography variant="h6" textAlign="center" gutterBottom>
            Dance Stats
          </Typography>
          {loadingStats ? (
            <CircularProgress />
          ) : error ? (
            <Typography variant="body2" color="error" textAlign="center">
              {error}
            </Typography>
          ) : radarOptions ? (
            <ReactECharts
              option={radarOptions}
              style={{ height: "400px", width: "100%" }}
            />
          ) : (
            <Typography variant="body2" textAlign="center">
              No dance stats available for this student.
            </Typography>
          )}
        </Box>

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
};

export default CurriculumDialog;
