import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
} from "../../store/jobSlice";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const AdminEmployees = () => {
  const dispatch = useDispatch();
  const { jobs: employees, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    const fetchEmployees = async () => {
      dispatch(fetchJobsStart());
      try {
        const res = await axios.get(`${API_BASE}/user/getAll`);
        dispatch(fetchJobsSuccess(res.data.users));
      } catch (err) {
        dispatch(fetchJobsFailure("Could not load employees."));
      }
    };
    fetchEmployees();
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        All Employees
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Manage all registered users in the system.
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {loading && (
        <Box textAlign="center" py={8}>
          <CircularProgress />
          <Typography color="text.secondary" mt={2}>
            Loading employees...
          </Typography>
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">{error}</Alert>
      )}

      {!loading && !error && (
        <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: "#212121" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>Full Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((emp, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:hover": { bgcolor: "grey.50" } }}
                >
                  <TableCell>{emp.fullName}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={emp.type}
                      color={emp.type === "admin" ? "error" : "primary"}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminEmployees;