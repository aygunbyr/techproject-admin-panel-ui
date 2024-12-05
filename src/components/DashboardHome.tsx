"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function DashboardHome() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">Categories</Typography>
            <Typography variant="h2">4</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">Events</Typography>
            <Typography variant="h2">6</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">Instructors</Typography>
            <Typography variant="h2">3</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">Video Educations</Typography>
            <Typography variant="h2">12</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default DashboardHome;
