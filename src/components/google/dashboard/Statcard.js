import {
  Box,
  Typography,
} from "@mui/material";

import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

export default function Statcard({val,trend}){

    const isUp = trend === "up";
    
    return(
        
      <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mt: 1,
      }}
    >
      {isUp ? (
        <ArrowUpwardOutlinedIcon
          sx={{
            color: "#2E7D32",
            fontSize: 18,
            mr: 0.5,
          }}
        />
      ) : (
        <ArrowDownwardOutlinedIcon
          sx={{
            color: "#D32F2F",
            fontSize: 18,
            mr: 0.5,
          }}
        />
      )}

      <Typography
        sx={{
          color: isUp ? "#2E7D32" : "#D32F2F",
          fontWeight: 600,
        }}
      >
        {Math.abs(val)}%
      </Typography>
    </Box>

    )
}