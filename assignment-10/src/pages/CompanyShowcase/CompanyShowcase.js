import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container, Typography, Grid, Box,
  Divider, CircularProgress, Alert,
} from "@mui/material";
import CompanyCard from "../../components/CompanyCard/CompanyCard";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5050";

const CompanyShowcase = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${API_BASE}/user/getAll`);
        const withImages = res.data.users.filter((u) => u.imagePath);
        setCompanies(withImages);
      } catch (err) {
        setError("Could not load images. Make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Company Showcase
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Companies actively hiring on JobPortal.
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {loading && (
        <Box textAlign="center" py={8}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="warning">{error}</Alert>
      )}

      {!loading && !error && companies.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography color="text.secondary">
            No images uploaded yet.
          </Typography>
        </Box>
      )}

      {!loading && companies.length > 0 && (
        <Grid container spacing={3}>
          {companies.map((company, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <CompanyCard
                imageUrl={`${API_BASE}${company.imagePath}`}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CompanyShowcase;