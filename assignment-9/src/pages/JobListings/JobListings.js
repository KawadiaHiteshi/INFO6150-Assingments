import { Container, Typography, Grid, Box, Divider, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import jobPosts from "../../data/jobPosts";
import JobCard from "../../components/JobCard/JobCard";

const JobListings = () => {
  const [search, setSearch] = useState("");

  const filtered = jobPosts.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
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
        placeholder="Search by title or skill..."
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

      {filtered.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography color="text.secondary">No jobs match your search.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default JobListings;
