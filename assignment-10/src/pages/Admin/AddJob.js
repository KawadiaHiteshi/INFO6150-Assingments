import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { addJob } from "../../store/jobSlice";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const AddJob = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    companyName: "",
    jobTitle: "",
    description: "",
    salary: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await axios.post(`${API_BASE}/user/create/job`, form);
      dispatch(addJob(res.data.job));
      setSuccess("Job created successfully!");
      setForm({ companyName: "", jobTitle: "", description: "", salary: "" });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Add New Job
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Fill in the details to post a new job listing.
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Company Name"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Job Title"
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={4}
            margin="normal"
          />
          <TextField
            label="Salary"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            placeholder="e.g. $80,000 - $100,000"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddCircleOutlineIcon />}
            sx={{ mt: 3, py: 1.5, fontWeight: 700 }}
          >
            {loading ? "Creating..." : "Create Job"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddJob;