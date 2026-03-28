import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Divider,
  Alert,
  Paper,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend-only: just show a success message
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Contact Us
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={4}>
        {/* Form */}
        <Grid item xs={12} md={7}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Send a Message
          </Typography>

          {submitted && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSubmitted(false)}>
              Your message has been sent! We'll get back to you soon.
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={5}
              margin="normal"
            />
            <Button type="submit" variant="contained" size="large" sx={{ mt: 2, px: 4 }}>
              Send Message
            </Button>
          </Box>
        </Grid>

        {/* Info */}
        <Grid item xs={12} md={5}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Get in Touch
          </Typography>
          <Paper elevation={0} sx={{ bgcolor: "grey.50", p: 3, borderRadius: 3 }}>
            {[
              { icon: <EmailIcon color="primary" />, label: "Email", value: "hello@jobportal.com" },
              { icon: <PhoneIcon color="primary" />, label: "Phone", value: "+1 (555) 000-1234" },
              { icon: <LocationOnIcon color="primary" />, label: "Address", value: "123 Tech Ave, Boston, MA 02101" },
            ].map((item) => (
              <Box key={item.label} sx={{ display: "flex", gap: 2, mb: 2.5, alignItems: "flex-start" }}>
                {item.icon}
                <Box>
                  <Typography variant="body2" fontWeight={700}>
                    {item.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
