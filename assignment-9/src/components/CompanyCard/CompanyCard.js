import { Card, CardMedia, Box } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";

const CompanyCard = ({ imageUrl }) => {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
      }}
    >
      {imageUrl ? (
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt="Company"
          sx={{ objectFit: "cover" }}
        />
      ) : (
        <Box
          sx={{
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.200",
          }}
        >
          <BusinessIcon sx={{ fontSize: 64, color: "grey.400" }} />
        </Box>
      )}
    </Card>
  );
};

export default CompanyCard;