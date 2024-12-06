"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CategoryIcon from "@mui/icons-material/Category";
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

function DashboardHome() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h5"><CategoryIcon />&nbsp;Categories</Typography>
            <Typography variant="h2">4</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h5"><EventIcon />&nbsp;Events</Typography>
            <Typography variant="h2">3</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h5"><PersonIcon />&nbsp;Instructors</Typography>
            <Typography variant="h2">3</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h5"><VideoLibraryIcon />&nbsp;Video Educations</Typography>
            <Typography variant="h2">6</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default DashboardHome;
