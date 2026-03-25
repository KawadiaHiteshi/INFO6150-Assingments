import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useAuth } from "../../context/AuthContext";

const stats = [
  { icon: <SearchIcon sx={{ fontSize: 40, color: "primary.main" }} />, label: "Open Positions", value: "6+" },
  { icon: <PeopleIcon sx={{ fontSize: 40, color: "primary.main" }} />, label: "Companies", value: "8+" },
  { icon: <TrendingUpIcon sx={{ fontSize: 40, color: "primary.main" }} />, label: "Career Growth", value: "100%" },
];

const Home = () => {
  const { user } = useAuth();

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
          color: "white",
          py: { xs: 8, md: 14 },
          px: 2,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={800} gutterBottom sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
            Find Your Dream Job Today
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, fontWeight: 400 }}>
            Explore hundreds of opportunities from top companies and take the next step in your career.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              component={Link}
              to="/jobs"
              variant="contained"
              size="large"
              sx={{ bgcolor: "white", color: "primary.main", fontWeight: 700, px: 4, "&:hover": { bgcolor: "#f0f0f0" } }}
            >
              Browse Jobs
            </Button>
            {!user && (
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
                sx={{ borderColor: "white", color: "white", fontWeight: 700, px: 4 }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      {/* Stats */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {stats.map((stat) => (
            <Grid item xs={12} sm={4} key={stat.label}>
              <Paper elevation={2} sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
                {stat.icon}
                <Typography variant="h4" fontWeight={800} color="primary.main">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA */}
      <Box sx={{ bgcolor: "grey.100", py: 8, textAlign: "center" }}>
        <Container maxWidth="sm">
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Ready to explore companies?
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Discover top companies and see what makes them great places to work.
          </Typography>
          <Button component={Link} to="/companies" variant="contained" size="large" sx={{ px: 4 }}>
            View Companies
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
