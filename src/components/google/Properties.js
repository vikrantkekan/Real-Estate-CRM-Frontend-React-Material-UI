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

import Modal from '@mui/material/Modal';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

export default function Properties() {

    const [cookies, setCookie,removeCookie] = useCookies(['name','all']);
//console.log("client_id:",  cookies.all.clie)
//console.log("user_id:",  cookies.all.uid)

    const [code, setCode] = useState(null);
    const [dataaccount, setData] = useState([]);

    const [conns,setConns]=useState([]);
     const [page,setPage]=useState(0)
  const [rowsperpage,setrowsperpage]=useState(10)

  const [addmodal,setAddmodal]=useState(0);

const [selaccount,setselAccount]=useState(null)
const [selprop,setSelprop]=useState(null)

const [property,setProperty]=useState([])

const[selanalytic,setAnalytic]=useState(null);

const[analyticacclist,setAnalyticacclist]=useState([]);

    function handle_add_modal(v){
    if(cookies.all.uroles[0].meta_campaign.indexOf("add_campaign")!=-1){
    if(addmodal===0){
      setAddmodal(1)
    }else{
      setAddmodal(0)
    }
  }else{
    alert('Access Permission Required');
  }
  }

 function handlepagechange(e,page){
    setPage(page)
  }

function handlerowschange(e){
    setrowsperpage(e.target.value)
  }


async function handleAccountChange(event) {
  const id = event.target.value;

  setselAccount(id);

    const tokenRes = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/google/refresh-token.php`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
            }),
        }
    );

    const tokenData = await tokenRes.json();
    console.log(tokenData);

  const accessToken = tokenData.access_token;

  const res = await fetch(
    "https://analyticsadmin.googleapis.com/v1alpha/accounts",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await res.json();

  //console.log(data);

  setAnalyticacclist(data.accounts || []);
}


async function handleAnalyticsChange(event) {
  const analyticsAccount = event.target.value;

  setAnalytic(analyticsAccount);

  const tokenRes = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/google/refresh-token.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selaccount,
      }),
    }
  );

  const tokenData = await tokenRes.json();

  const accessToken = tokenData.access_token;

  const res = await fetch(
    `https://analyticsadmin.googleapis.com/v1alpha/properties?filter=parent:${analyticsAccount}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await res.json();

  //console.log(data);

  setProperty(data.properties || []);
}



async function saveProperty(e) {
     e.preventDefault();

  const selectedProperty = property.find(
    (item) => item.name === selprop
  );

  const selectedAnalytics = analyticacclist.find(
    (item) => item.name === selanalytic
  );

  const body = {
    google_account_id: selaccount,
    analytics_account_id: selectedAnalytics.name,
    analytics_account_name: selectedAnalytics.displayName,
    property_id: selectedProperty.name,
    property_name: selectedProperty.displayName,
    clie: cookies.all.clie,
    uid: cookies.all.uid,
  };

  console.log(body);

 const response= await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/google/add-property.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

console.log("Status:", response.status);
console.log("Response:", data);

}

  useEffect(() => {

fetch(`${process.env.REACT_APP_API_BASE_URL}//google/google-connections.php?client_id=${cookies.all.clie}`)
.then((response)=>response.json())
.then((data)=>{
  console.log(data)
  setData(data)
})
.catch((err)=>console.log(err));


fetch(`${process.env.REACT_APP_API_BASE_URL}//google/google-property.php?client_id=${cookies.all.clie}`)
.then((response)=>response.json())
.then((data)=>{
  console.log(data)
  setConns(data)
})
.catch((err)=>console.log(err));

}, []);



const allaccountlist=dataaccount.map((itm)=><MenuItem value={itm.id}>{itm.google_email} ({itm.google_name})</MenuItem>);

const analyticsAccountList = analyticacclist.map((item) => (
  <MenuItem key={item.name} value={item.name}>
    {item.displayName}
  </MenuItem>
));

const propertylist = property.map((item) => (<MenuItem key={item.name} value={item.name}>{item.displayName} {item.name}</MenuItem>));

function add_property(){
    fetch(`${process.env.REACT_APP_API_BASE_URL}/google/add-google-token.php`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({})
}).then(res => res.json())
.then(data => {
  console.log("Property added to database:", data);
})
.catch(err => {
  console.error("Error adding property to database:", err);
});
}


const stages_sort=conns.map((items,ind,arr)=>sort_data(items,ind,arr))


  function sort_data(item,ind,arr){

return <TableRow>

<TableCell align="left" sx={{color:'#575757'}}>{ind+1}</TableCell>

<TableCell align="left" sx={{color:'#575757'}}>
<Chip label="Google" ></Chip>
</TableCell>

<TableCell align="left" sx={{color:'#575757'}}>
{item.analytics_account_name}
<p style={{fontSize:'12px',marginTop:'1px',marginBottom:'1px',color:'grey'}}>{item.useid}</p>
</TableCell>


<TableCell align="left" sx={{color:'#575757'}}>
{item.property_name}

</TableCell>



<TableCell align="left" sx={{color:'#575757'}}>
<Chip label={item.created_at} color="success" variant="outlined"></Chip>
</TableCell>

</TableRow>

  }



  return (
       <Box sx={{pt:10}}>
<Paper sx={{m:1}}>

<span style={{float:'left',margin:'25px',marginTop:'35px',fontSize:'18px',fontWeight:600}}>Connected Google Properties</span>

<Button variant="outlined" startIcon={<AddIcon />} sx={{float:'right',m:3}} onClick={handle_add_modal}>
Connect New Property
</Button>

<TableContainer>
<Table>
<TableHead>

<TableRow>

<TableCell align="left" sx={{backgroundColor:'#f4f6f8', color:'#637381'}}>Sr. No.</TableCell>
<TableCell align="left" sx={{backgroundColor:'#f4f6f8', color:'#637381'}}>Platform</TableCell>
<TableCell align="left" sx={{backgroundColor:'#f4f6f8', color:'#637381'}}>Account name</TableCell>
<TableCell align="left" sx={{backgroundColor:'#f4f6f8', color:'#637381'}}>Property name</TableCell>
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


<Modal
  open={addmodal}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  onClose={handle_add_modal}
>
  <Box sx={{top:'40%',left:'50%',transform: 'translate(-50%, -50%)',
  position: 'absolute',borderRadius:'5%',width:'60%',backgroundColor:'#dde8f8',p:3,borderRadius:3}} elevate='2'>
    
 <p style={{marginLeft:'20px',fontSize:'18px',color:'#193b68'}}>Add New Property</p>

<Grid container >

<Grid item xs={12}>
<FormControl sx={{p:2,width:'100%'}} >
  <InputLabel id="demo-simple-select-label" sx={{p:2}}>Select Google Account</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selaccount}
    label="Select Google Account"
    onChange={(e)=>handleAccountChange(e)}
    sx={{m:1}}
  >
 {allaccountlist}
  </Select>
</FormControl>
</Grid>

<Grid item xs={12}>
<FormControl sx={{p:2,width:'100%'}} >
  <InputLabel id="demo-simple-select-label" sx={{p:2}}>Select Analytics Account</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selanalytic}
    label="Select Page"
    onChange={(e)=>handleAnalyticsChange(e)}
    sx={{m:1}}
  >

 {analyticsAccountList} 

  </Select>
</FormControl>
</Grid>

<Grid item xs={12}>
<FormControl sx={{p:2,width:'100%'}} >
  <InputLabel id="demo-simple-select-label" sx={{p:2}}>Select Property</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selprop}
    label="Select Page"
    onChange={(e)=>setSelprop(e.target.value)}
    sx={{m:1}}
  >

 {propertylist} 

  </Select>
</FormControl>
</Grid>

<Grid item xs={12}>
<FormControl sx={{p:2}} >
<Button type="button" variant="contained" sx={{m:1}} onClick={saveProperty}>Add Campaign</Button>
</FormControl>

</Grid>

</Grid>

  </Box>

</Modal>

</Box>
    )
}



