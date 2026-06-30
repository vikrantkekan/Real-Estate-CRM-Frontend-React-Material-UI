
import {
  Box,
  Typography,
} from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

export default function TopPages({props}){

   const pagelist=props?.map((itm)=><TableRow>
              <TableCell>{itm.page}</TableCell>
              <TableCell align="left">{itm.impressions}</TableCell>
               <TableCell align="left">{itm.clicks}</TableCell>
              <TableCell align="left">{itm.ctr} </TableCell>
              <TableCell align="left">{itm.position} </TableCell>
            </TableRow>)

    return(
        <>
       <Box
  sx={{
    p: 1.5,
    borderRadius: 3,
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    
  }}
>
  <Box sx={{ flex: 1, ml: 1 }}>
    <Typography variant="body2" sx={{ color: "#757575", fontWeight: 500,}} >
    Top Pages
    </Typography>
    </Box>
     

     <Table sx={{ minWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Page</TableCell>
            <TableCell align="left">Impression</TableCell>
            <TableCell align="left">Clicks</TableCell>
            <TableCell align="left">CTR</TableCell>
            <TableCell align="left">Position</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pagelist}
        </TableBody>
      </Table>
    
  </Box>


        
        </>
    )
}