import {
  SpeedDial,
  SpeedDialIcon,
  Drawer,
  Button,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import YardIcon from "@mui/icons-material/Yard";
import { keyframes } from "@mui/system";


import { useState } from "react";
import ApiService from "../services/ApiService";

export default function CropBubble() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [season, setSeason] = useState("");
  const [location, setLocation] = useState("");
  const [soil, setSoil] = useState("");

  const handleGetSuggestion = async () => {
    if (!season || !location || !soil) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);
    try {
      const res = await ApiService.getGeminiCropSuggestion({
        season,
        location,
        soil,
      });

      // backend returns { success, data }
      setResult(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to get crop suggestions");
    } finally {
      setLoading(false);
    }
  };

  // Helper: parse result if it's JSON string
  let crops = [];
  if (result) {
    if (typeof result === "string") {
      try {
        crops = JSON.parse(result);
      } catch {
        crops = [result]; // fallback to string
      }
    } else if (Array.isArray(result)) {
      crops = result;
    } else {
      crops = [result];
    }
  }


  const pulseColor = keyframes`
  0% {
    transform: scale(1);
    background-color: #388e3c; /* green */
    box-shadow: 0 0 0 0 rgba(56, 142, 60, 0.7);
  }
  50% {
    transform: scale(1.12);
    background-color: #0f4d16ff; /* orange */
    box-shadow: 0 0 0 10px rgba(255, 152, 0, 0.4);
  }
  100% {
    transform: scale(1);
    background-color: #2e7d32; /* darker green */
    box-shadow: 0 0 0 0 rgba(56, 142, 60, 0.7);
  }
`;
  return (
    <>
      <SpeedDial  
        ariaLabel="Crop Advisor"
        icon={<YardIcon />}
        sx={{
    position: "fixed",
    bottom: 16,
    left: 30,

    "& .MuiFab-primary": {
      width: 55,   // 🔹 smaller size
      height: 55,  // 🔹 smaller size
      color: "#fff",
      animation: `${pulseColor} 2s infinite`,
    },

    "& .MuiFab-primary:hover": {
      backgroundColor: "rgba(13, 69, 29, 1)",
    },
  }}
        onClick={() => setOpen(true)}
      />

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div style={{ width: 400, padding: 24 }}>
          <Typography variant="h5" gutterBottom>
            Crop Suggestions
          </Typography>

          <TextField
            label="Season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Soil"
            value={soil}
            onChange={(e) => setSoil(e.target.value)}
            fullWidth
            margin="normal"
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleGetSuggestion}
            disabled={loading}
            sx={{ marginTop: 2, backgroundColor:"orange"}}
          >
            {loading ? "Loading..." : "Get Suggestions"}
          </Button>

          {crops.length > 0 && (
  <List sx={{ marginTop: 3 }}>
    {crops.map((crop, idx) => (
      <Paper key={idx} sx={{ marginBottom: 2, padding: 2 }}>
        <Typography variant="h6" sx={{ color: "#2e7d32", fontWeight: 600 }}>
          {crop.crop || "Crop"}
        </Typography>
        <Typography><strong>Duration:</strong> {crop.duration || "-"}</Typography>
        <Typography><strong>Water:</strong> {crop.water || "-"}</Typography>
        <Typography><strong>Fertilizer:</strong> {crop.fertilizer || "-"}</Typography>
        <Typography><strong>Yield:</strong> {crop.yield || "-"}</Typography>
      </Paper>
    ))}
  </List>
)}


        </div>
      </Drawer>
    </>
  );
}
