import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Box,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import CompanyCard from "../../components/CompanyCard/CompanyCard";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5050";

// Real companies with their actual websites
const realCompanies = [
  { name: "Google", website: "https://www.google.com" },
  { name: "Apple", website: "https://www.apple.com" },
  { name: "Microsoft", website: "https://www.microsoft.com" },
  { name: "Amazon", website: "https://www.amazon.com" },
  { name: "Meta", website: "https://www.meta.com" },
  { name: "Netflix", website: "https://www.netflix.com" },
  { name: "Tesla", website: "https://www.tesla.com" },
  { name: "Spotify", website: "https://www.spotify.com" },
];

const CompanyShowcase = () => {
  const [backendImages, setBackendImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${API_BASE}/user/getAll`);
        const usersWithImages = res.data.users.filter((u) => u.imagePath);
        setBackendImages(usersWithImages);
      } catch (err) {
        setError("Could not load images from backend.");
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  // Merge: assign backend images to real companies in order
  const companies = realCompanies.map((company, index) => ({
    ...company,
    imageUrl: backendImages[index]
      ? `${API_BASE}${backendImages[index].imagePath}`
      : null,
  }));

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Company Showcase
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Explore top companies that are actively hiring. Click to visit their websites.
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {loading && (
        <Box textAlign="center" py={8}>
          <CircularProgress />
          <Typography color="text.secondary" mt={2}>Loading companies...</Typography>
        </Box>
      )}

      {!loading && error && (
        <Alert severity="warning" sx={{ mb: 3 }}>{error}</Alert>
      )}

      {!loading && (
        <Grid container spacing={3}>
          {companies.map((company, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <CompanyCard
                imageUrl={company.imageUrl}
                name={company.name}
                website={company.website}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CompanyShowcase;
