import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WorkIcon from "@mui/icons-material/Work";
import { useAuth } from "../../context/AuthContext";

const employeeLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Job Listings", path: "/jobs" },
  { label: "Companies", path: "/companies" },
  { label: "Contact", path: "/contact" },
];

const adminLinks = [
  { label: "Employees", path: "/admin/employees" },
  { label: "Add Job", path: "/admin/add-job" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navLinks = user?.type === "admin" ? adminLinks : employeeLinks;

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    navigate("/login");
  };

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "";

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: user?.type === "admin" ? "#212121" : "primary.main" }}>
        <Toolbar>
          <WorkIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            to={user?.type === "admin" ? "/admin/employees" : "/"}
            sx={{ fontWeight: 700, color: "inherit", textDecoration: "none", flexGrow: isMobile ? 1 : 0, mr: 4 }}
          >
            {user?.type === "admin" ? "Admin Portal" : "JobPortal"}
          </Typography>

          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: "flex", gap: 0.5 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  component={Link}
                  to={link.path}
                  color="inherit"
                  sx={{
                    fontWeight: location.pathname === link.path ? 700 : 400,
                    borderBottom: location.pathname === link.path ? "2px solid white" : "2px solid transparent",
                    borderRadius: 0,
                    px: 1.5,
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: "auto" }}>
            <Avatar sx={{ bgcolor: "secondary.main", width: 36, height: 36, fontSize: 14, fontWeight: 700 }}>
              {initials}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem disabled>
              <Typography variant="body2" color="text.secondary">
                {user?.fullName} ({user?.type})
              </Typography>
            </MenuItem>
            <MenuItem disabled>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12 }}>
                {user?.email}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              Logout
            </MenuItem>
          </Menu>

          {isMobile && (
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)} sx={{ ml: 1 }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.path} disablePadding>
                <ListItemButton component={Link} to={link.path} selected={location.pathname === link.path}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;