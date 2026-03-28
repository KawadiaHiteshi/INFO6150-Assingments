import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Divider,
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import StarIcon from "@mui/icons-material/Star";

const jobTypeColor = {
  "Full-time": "success",
  "Remote": "info",
  "Hybrid": "warning",
};

const JobCard = ({ job }) => {
  return (
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
        {/* Job Type Badge */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Chip
            label={job.jobType}
            size="small"
            color={jobTypeColor[job.jobType] || "default"}
            sx={{ fontWeight: 600 }}
          />
          <Typography variant="caption" color="text.secondary">
            {job.experience}
          </Typography>
        </Box>

        {/* Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <WorkOutlineIcon color="primary" fontSize="small" />
          <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1rem" }}>
            {job.title}
          </Typography>
        </Box>

        {/* Company */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
          <BusinessIcon fontSize="small" color="action" />
          <Typography variant="body2" fontWeight={600} color="primary.main">
            {job.company}
          </Typography>
        </Box>

        {/* Location */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
          <LocationOnIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {job.location}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
          {job.description}
        </Typography>

        <Divider sx={{ my: 1.5 }} />

        {/* Skills */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 2 }}>
          {job.skills.map((skill) => (
            <Chip key={skill} label={skill} size="small" color="primary" variant="outlined" />
          ))}
        </Box>

        {/* Salary */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
          <AttachMoneyIcon fontSize="small" color="success" />
          <Typography variant="body2" fontWeight={600} color="success.main">
            {job.salary}
          </Typography>
        </Box>

        {/* Last updated */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <AccessTimeIcon fontSize="small" color="action" />
          <Typography variant="caption" color="text.secondary">
            {job.lastUpdated}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          size="small"
          startIcon={<StarIcon />}
        >
          Apply at {job.company}
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
