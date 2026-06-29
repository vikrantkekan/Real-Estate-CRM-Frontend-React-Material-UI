import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import PieChartDevice from "./PieChartDevice";


const deviceData = [
  { name: "Desktop", value: 420, color: "#3b82f6" },
  { name: "Mobile", value: 980, color: "#10b981" },
  { name: "Tablet", value: 95, color: "#f59e0b" },
];

const total = deviceData.reduce((sum, item) => sum + item.value, 0);

export default function UsersbyDevice() {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        background: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        mb={2}
      >
        Users by Device
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid xs={8}>
       <PieChartDevice />
        </Grid>
        <Grid xs={4}>
          {deviceData.map((item) => (
            <Box
              key={item.name}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: item.color,
                  }}
                />
                <Typography>{item.name}</Typography>
              </Box>

              <Typography fontWeight={600}>
                {item.value} (
                {((item.value / total) * 100).toFixed(1)}%)
              </Typography>
            </Box>
          ))}

          <Box
            sx={{
              mt: 3,
              pt: 2,
              borderTop: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontWeight={600}>
              Total Users
            </Typography>

            <Typography fontWeight={700}>
              {total.toLocaleString()}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}