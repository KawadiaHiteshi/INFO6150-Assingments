import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Grid,
  Box,
  Divider,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BusinessIcon from "@mui/icons-material/Business";
import {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
} from "../../store/jobSlice";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const JobListings = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      dispatch(fetchJobsStart());
      try {
        const res = await axios.get(`${API_BASE}/user/jobs`);
        dispatch(fetchJobsSuccess(res.data.jobs));
      } catch (err) {
        dispatch(fetchJobsFailure("Could not load jobs."));
      }
    };
    fetchJobs();
  }, [dispatch]);

  const filtered = jobs.filter(
    (job) =>
      job.jobTitle?.toLowerCase().includes(search.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Job Listings
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {filtered.length} position{filtered.length !== 1 ? "s" : ""} available
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <TextField
        placeholder="Search by title or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      {loading && (
        <Box textAlign="center" py={8}>
          <CircularProgress />
          <Typography color="text.secondary" mt={2}>
            Loading jobs...
          </Typography>
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">{error}</Alert>
      )}

      {!loading && !error && filtered.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography color="text.secondary">No jobs found.</Typography>
        </Box>
      )}

      {!loading && !error && filtered.length > 0 && (
        <Grid container spacing={3}>
          {filtered.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={2}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                    <WorkOutlineIcon color="primary" fontSize="small" />
                    <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1rem" }}>
                      {job.jobTitle}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
                    <BusinessIcon fontSize="small" color="action" />
                    <Typography variant="body2" fontWeight={600} color="primary.main">
                      {job.companyName}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {job.description}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <AttachMoneyIcon fontSize="small" color="success" />
                    <Typography variant="body2" fontWeight={600} color="success.main">
                      {job.salary}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="small"
                  >
                    Apply Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default JobListings;