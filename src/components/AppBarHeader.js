import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const AppBarHeader = () => (
  <AppBar position="static" sx={{ backgroundColor: "#1e88e5" }}>
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Dance Curriculum
      </Typography>
    </Toolbar>
  </AppBar>
);

export default AppBarHeader;
