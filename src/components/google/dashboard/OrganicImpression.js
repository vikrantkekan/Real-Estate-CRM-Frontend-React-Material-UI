
import {
  Box,
  Typography,
} from "@mui/material";

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import Statcard from "./Statcard";

export default function OrganicImpression({props}){

    const trend = props?.previous < props?.current ? "up" : "down";


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
      bgcolor: "#fff0de",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <RemoveRedEyeOutlinedIcon
      sx={{
        fontSize: 24,
        color: "#fd9110",
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
    Impression
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