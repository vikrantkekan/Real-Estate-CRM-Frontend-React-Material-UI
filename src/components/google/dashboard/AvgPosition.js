
import {
  Box,
  Typography,
} from "@mui/material";

import ListOutlinedIcon from '@mui/icons-material/ListOutlined';

import Statcard from "./Statcard";

export default function AvgPosition({props}){

  const trend = props?.previous > props?.current ? "up" : "down";

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
      {props?.current}
    </Typography>

   <Statcard val={props?.change} trend={trend} />
     
      <Typography
        sx={{
          ml: 1,
          color: "#9E9E9E",
          fontSize: 11,
        }}
      >
        vs Apr 26 – May 26 ({props?.previous})
      </Typography>
  </Box>
 
</Box>

        
        </>
    )
}