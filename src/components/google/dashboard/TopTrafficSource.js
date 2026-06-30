import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import PieChartDevice from "./PieChartDevice";
import PieChartTrafficSource from "./PieChartTrafficSource";


const deviceData = [
  { name: "Organic Search", value: 420, color: "#3b82f6" },
  { name: "Direct", value: 980, color: "#10b981" },
  { name: "Social", value: 95, color: "#6642ec" },
  { name: "Referal", value: 95, color: "#f45684" },
  { name: "Paid Search", value: 95, color: "#f59e0b" },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b","#6642ec","#f45684"];

export default function TopTrafficSource({props}) {

  const total = props?.reduce((sum, item) => sum + item.users, 0);

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
        fontWeight={500}
        mb={2}
      >
        Top Traffic Source
      </Typography>
      
      <Grid container spacing={2} alignItems="center">
        <Grid xs={8}>
       <PieChartTrafficSource data={props} />
        </Grid>
        <Grid xs={4}>
          {props?.map((item) => (
            <Box
              key={item.source}
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
                    bgcolor: COLORS[item],
                  }}
                />
                <Typography>{item.source}</Typography>
              </Box>

              <Typography fontWeight={500}>
                {item.users} (
                {((item.users / total) * 100).toFixed(1)}%)
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
            <Typography fontWeight={500}>
              Total Users
            </Typography>

            <Typography fontWeight={500}>
              {total?.toLocaleString()}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}