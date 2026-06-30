import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import PieChartDevice from "./PieChartDevice";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b","#6642ec","#f45684"];

export default function UsersbyDevice({props}) {

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
        fontWeight={600}
        mb={2}
      >
        Users by Device
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid xs={8}>
       <PieChartDevice data={props} />
        </Grid>
        <Grid xs={4}>
          {props?.map((item,index) => (
            <Box
              key={item?.device}
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
                    bgcolor: COLORS[index],
                  }}
                />
                <Typography>{item?.device}</Typography>
              </Box>

              <Typography fontWeight={500}>
                {item?.users} (
                {((item?.users / total) * 100).toFixed(1)}%)
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