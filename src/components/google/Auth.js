import { useEffect,useState } from "react";
import {useCookies,withCookies} from 'react-cookie';



import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableFooter from '@mui/material/TableFooter'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import TablePagination from '@mui/material/TablePagination'

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip'

export default function Auth() {

    const [cookies, setCookie,removeCookie] = useCookies(['name','all']);
//console.log("client_id:",  cookies.all.clie)
//console.log("user_id:",  cookies.all.uid)

    const [code, setCode] = useState(null);
    const [data2, setData] = useState({});

    const [conns,setConns]=useState([]);
     const [page,setPage]=useState(0)
  const [rowsperpage,setrowsperpage]=useState(10)

 function handlepagechange(e,page){
    setPage(page)
  }

function handlerowschange(e){
    setrowsperpage(e.target.value)
  }


  useEffect(() => {

   const hash = window.location.hash;
   const queryString = hash.split("?")[1];

  if(queryString){

    const params = new URLSearchParams(queryString);
    const code = params.get("code");
    setCode(code);
    //console.log("Auth Code:", code);
      fetch(`${process.env.REACT_APP_API_BASE_URL}/google/google_exchange.php`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    code: code
  })
})
.then(res => res.json())
.then(data => {
   const finalData = {
    ...data,
    uid: cookies.all.uid,
    clie: cookies.all.clie
  };

  setData(finalData);

if(finalData.access_token && finalData.refresh_token){

fetch(`${process.env.REACT_APP_API_BASE_URL}/google/add-google-token.php`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(finalData)
}).then(res => res.json())
.then(data => {
  console.log("Token added to database:", data);
})
.catch(err => {
  console.error("Error adding token to database:", err);
});

}

  })
}


fetch(`${process.env.REACT_APP_API_BASE_URL}//google/google-connections.php?client_id=${cookies.all.clie}`)
.then((response)=>response.json())
.then((data)=>{
 // console.log(data)
  setConns(data)
})
.catch((err)=>console.log(err));


}, []);


const stages_sort=conns.map((items,ind,arr)=>sort_data(items,ind,arr))


  function sort_data(item,ind,arr){

return <TableRow>

<TableCell align="left" sx={{color:'#575757'}}>{ind+1}</TableCell>

<TableCell align="left" sx={{color:'#575757'}}>
<Chip label="Google" ></Chip>
</TableCell>

<TableCell align="left" sx={{color:'#575757'}}>
{item.google_name}
<p style={{fontSize:'12px',marginTop:'1px',marginBottom:'1px',color:'grey'}}>{item.useid}</p>
</TableCell>


<TableCell align="left" sx={{color:'#575757'}}>
{item.google_email}

</TableCell>



<TableCell align="left" sx={{color:'#575757'}}>
<Chip label={item.created_at} color="success" variant="outlined"></Chip>
</TableCell>

</TableRow>

  }



  return (
       <Box sx={{pt:10}}>
<Paper sx={{m:1}}>

<span style={{float:'left',margin:'25px',marginTop:'35px',fontSize:'18px',fontWeight:600}}>Connected Google Accounts</span>

<Button variant="outlined" startIcon={<AddIcon />} sx={{float:'right',m:3}} onClick={connectGoogle}>
Connect New User
</Button>

<TableContainer>
<Table>
<TableHead>

<TableRow>

<TableCell align="left" sx={{backgroundColor:'#f4f6f8', color:'#637381'}}>Sr. No.</TableCell>
<TableCell align="left" sx={{backgroundColor:'#f4f6f8', color:'#637381'}}>Platform</TableCell>
<TableCell align="left" sx={{backgroundColor:'#f4f6f8', color:'#637381'}}>User Name</TableCell>
<TableCell align="left" sx={{backgroundColor:'#f4f6f8', color:'#637381'}}>email</TableCell>
<TableCell align="left" sx={{backgroundColor:'#f4f6f8', color:'#637381'}}>On Date</TableCell>

</TableRow>

</TableHead>

<TableBody>
{stages_sort}
</TableBody>

<TableFooter>

<TablePagination 
count={conns.length}
page={page}
rowsPerPage={rowsperpage}
onPageChange={(e,page)=>handlepagechange(e,page)}
onRowsPerPageChange={(e)=>handlerowschange(e)}
/>

</TableFooter>

</Table>
</TableContainer>




</Paper>

</Box>
    )
}



function connectGoogle() {

  const clientId = "265387977597-glgeq931o2l870q9qcq9vdu2iuj9s6a7.apps.googleusercontent.com";

  const redirectUri =
    "http://localhost:3000/google-callback.html";

  const scope = [
    "openid",
    "email",
    "profile",
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/business.manage"
  ].join(" ");

  const url =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    "?client_id=" + encodeURIComponent(clientId) +
    "&redirect_uri=" + encodeURIComponent(redirectUri) +
    "&response_type=code" +
    "&access_type=offline" +
    "&prompt=consent" +
    "&scope=" + encodeURIComponent(scope);

  window.location.href = url;
}

