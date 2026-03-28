import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import { useSelector } from "react-redux";

// Shared components
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";

// Employee pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import JobListings from "./pages/JobListings/JobListings";
import CompanyShowcase from "./pages/CompanyShowcase/CompanyShowcase";
import Contact from "./pages/Contact/Contact";

// Admin pages
import AdminEmployees from "./pages/Admin/AdminEmployees";
import AddJob from "./pages/Admin/AddJob";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#f50057" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: { borderRadius: 8 },
});

const AppRoutes = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (user.type === "admin") {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/admin/employees" element={<AdminEmployees />} />
          <Route path="/admin/add-job" element={<AddJob />} />
          <Route path="*" element={<Navigate to="/admin/employees" replace />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<JobListings />} />
        <Route path="/companies" element={<CompanyShowcase />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;