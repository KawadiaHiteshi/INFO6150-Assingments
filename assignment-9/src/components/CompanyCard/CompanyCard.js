import { Card, CardMedia, CardContent, Typography, Box, Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const CompanyCard = ({ imageUrl, name, website }) => {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {imageUrl && (
        <CardMedia
          component="img"
          height="180"
          image={imageUrl}
          alt={name}
          sx={{ objectFit: "cover" }}
        />
      )}
      <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          {name}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<OpenInNewIcon />}
          fullWidth
        >
          Visit Website
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
