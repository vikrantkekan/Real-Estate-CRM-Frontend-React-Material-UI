
import {
  Box,
  Typography,
} from "@mui/material";

import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

export default function AvgPosition(){

    return(
        <>
       <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    p: 1.5,
    borderRadius: 3,
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    
  }}
>
  {/* Left Icon */}
  <Box
    sx={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      bgcolor: "#d4fbff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <ListOutlinedIcon
      sx={{
        fontSize: 24,
        color: "#08a8b9",
      }}
    />
  </Box>

  {/* Right Content */}
  <Box sx={{ flex: 1, ml: 3 }}>
    <Typography
      variant="body2"
      sx={{
        color: "#757575",
        fontWeight: 500,
      }}
    >
    Avg. Position
    </Typography>

    <Typography
      variant="h5"
      sx={{
        fontWeight: 700,
        mt: 0.5,
      }}
    >
      6.5
    </Typography>

    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mt: 1,
      }}
    >
      <ArrowUpwardOutlinedIcon
        sx={{
          color: "#2E7D32",
          fontSize: 18,
          mr: 0.5,
        }}
      />

      <Typography
        sx={{
          color: "#2E7D32",
          fontWeight: 600,
        }}
      >
        12%
      </Typography>

    </Box>
     
      <Typography
        sx={{
          ml: 1,
          color: "#9E9E9E",
          fontSize: 11,
        }}
      >
        vs Apr 26 – May 26
      </Typography>
  </Box>
 
</Box>

        
        </>
    )
}