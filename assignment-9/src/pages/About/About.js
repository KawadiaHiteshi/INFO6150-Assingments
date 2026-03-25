import { Container, Typography, Box, Grid, Paper, Divider } from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import HandshakeIcon from "@mui/icons-material/Handshake";
import StarIcon from "@mui/icons-material/Star";

const values = [
  {
    icon: <EmojiObjectsIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "Innovation",
    desc: "We leverage the latest technology to connect talent with opportunity.",
  },
  {
    icon: <HandshakeIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "Trust",
    desc: "Building genuine relationships between job seekers and employers.",
  },
  {
    icon: <StarIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "Excellence",
    desc: "Committed to delivering the best experience for all our users.",
  },
];

const About = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        About JobPortal
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.9 }}>
        JobPortal is a modern job discovery platform designed to bridge the gap between talented
        professionals and innovative companies. Founded with the mission of making career
        opportunities accessible to everyone, we curate top job listings and company profiles to
        help you find your perfect fit.
      </Typography>

      <Typography variant="h5" fontWeight={700} gutterBottom>
        Our Mission
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.9 }}>
        To empower job seekers with the tools, resources, and connections they need to build
        fulfilling careers — while helping companies discover exceptional talent.
      </Typography>

      <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
        Our Values
      </Typography>
      <Grid container spacing={3}>
        {values.map((v) => (
          <Grid item xs={12} sm={4} key={v.title}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, textAlign: "center", height: "100%" }}>
              <Box sx={{ mb: 1 }}>{v.icon}</Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                {v.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {v.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default About;
