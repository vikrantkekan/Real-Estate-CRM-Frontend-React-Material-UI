
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

export default function UsersbyCity({props}){

  const citylist=props?.map((itm)=><TableRow>
            <TableCell>{itm.city}</TableCell>
            <TableCell align="left">{itm.users}</TableCell>
            <TableCell align="left">{itm.newUsers}</TableCell>
            <TableCell align="left">{itm.screenPageViews} </TableCell>
            <TableCell align="left">{itm.averageSessionDuration} </TableCell>
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
    Users By City
    </Typography>
    </Box>
     

     <Table sx={{ minWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>City</TableCell>
            <TableCell align="left">Users</TableCell>
            <TableCell align="left">New Users</TableCell>
            <TableCell align="left">Page Views</TableCell>
            <TableCell align="left">Avg. Eng. Time</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>

          {citylist}

        </TableBody>
      </Table>

  </Box>
        
        </>
    )
}