import React from 'react'

import { useEffect,useState } from "react";
import {useCookies,withCookies} from 'react-cookie';

import Paper from '@mui/material/Paper'


import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'


import Box from '@mui/material/Box'
import {Button} from '@mui/material';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import WebsiteUser from './dashboard/WebsiteUser'
import WebsiteSession from './dashboard/WebsiteSession'
import OrganicImpression from './dashboard/OrganicImpression'
import OrganicClicks from './dashboard/OrganicClicks'
import TopKeywords from './dashboard/TopKeywords'
import TopPages from './dashboard/TopPages'
import AvgPosition from './dashboard/AvgPosition'
import AvgCtr from './dashboard/AvgCtr'
import AvgEngagetime from './dashboard/AvgEngagetime'
import UsersbyCountry from './dashboard/UsersbyCountry'
import UsersbyCity from './dashboard/UsersbyCity'
import UsersbyDevice from './dashboard/UsersbyDevice'
import TopTrafficSource from './dashboard/TopTrafficSource'
import PageViews from './dashboard/PageViews';

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function GoogleDashboard(){

        const [cookies, setCookie,removeCookie] = useCookies(['name','all']);

        const [property,setProperty]=useState([]);

        const[selprop,setSelprop]=useState(null);

        const[analytics,setAnalytics]=useState(null)

        const[sconsole,setSconsole]=useState(null)

        const [startDate, setStartDate] = useState(dayjs().subtract(29, "day"));
        const [endDate, setEndDate] = useState(dayjs());

        
          useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/google/google-property.php?client_id=${cookies.all.clie}`)
        .then((response)=>response.json())
        .then((data)=>{
          console.log(data)
          setProperty(data)
        })
        .catch((err)=>console.log(err));
        
        }, []);
        

        const propertylist = property.map((item) => (<MenuItem key={item.id} value={item.id}>{item.property_name}</MenuItem>));
        

        async function fetchAnalytics(e){
               let propid= e.target.value;

               setSelprop(e.target.value);

               const selectedAccid = property.find(item => item.id === propid);

               const body = {
                 id: selectedAccid.google_account_id,
                  property_id: selectedAccid.property_id,
                  domain: selectedAccid.domain
                        };

        const response= await fetch(`${process.env.REACT_APP_API_BASE_URL}/google/anayltics-dashboard-overview.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

        const data = await response.json();
        setAnalytics(data);

        console.log(data);

  const responsecon= await fetch(`${process.env.REACT_APP_API_BASE_URL}/google/search-console-dashboard-overview.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const data2 = await responsecon.json();
  setSconsole(data2);
console.log(data2)

        }
  
        return(

<div style={{marginTop:'60px',backgroundColor:'#f5f7fc',minHeight:'100vh',padding:'15px'}}>

<Grid container>

<Grid item xs={3}>
<FormControl sx={{p:1,width:'100%'}} >
  <InputLabel id="demo-simple-select-label-prop" sx={{p:2}}>Select Property</InputLabel>
  <Select
    labelId="demo-simple-select-label-prop"
    id="demo-simple-select"
    value={selprop}
    label="Select Property"
    onChange={(e)=>fetchAnalytics(e)}
    sx={{m:1}}
  >
 {propertylist} 
  </Select>
</FormControl>
</Grid>

<Grid item xs={6}>
<FormControl sx={{p:2,width:'100%'}} >
 <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
    <DatePicker
      label="From"
      value={startDate}
      onChange={(newValue) => setStartDate(newValue)}
    />

    <DatePicker
      label="To"
      value={endDate}
      onChange={(newValue) => setEndDate(newValue)}
    />

    <Button
      variant="contained"
      onClick={(e)=>fetchAnalytics(e)}
    >
      Apply
    </Button>
  </Box>
</LocalizationProvider>
</FormControl>
</Grid>

</Grid>

<Grid container>

<Grid item xs={3} sx={{padding:'5px'}}>
<WebsiteUser props={analytics?.kpis?.users} />
</Grid>
<Grid item xs={3} sx={{padding:'5px'}}>
<WebsiteSession props={analytics?.kpis?.sessions} />
</Grid>
<Grid item xs={3} sx={{padding:'5px'}}>
<OrganicImpression props={sconsole?.kpis?.impressions} />
</Grid>
<Grid item xs={3} sx={{padding:'5px'}}>
<OrganicClicks props={sconsole?.kpis?.clicks} />
</Grid>

</Grid>

<Grid container>

<Grid item xs={3} sx={{padding:'5px'}}>
<AvgPosition props={sconsole?.kpis?.position} />
</Grid>
<Grid item xs={3} sx={{padding:'5px'}}>
<AvgCtr props={sconsole?.kpis?.ctr}  />
</Grid>
<Grid item xs={3} sx={{padding:'5px'}}>
<AvgEngagetime props={analytics?.kpis?.avgSessionDuration} />
</Grid>
<Grid item xs={3} sx={{padding:'5px'}}>
<PageViews props={analytics?.kpis?.pageViews} />
</Grid>
</Grid>


<Grid container >
<Grid item xs={6} sx={{padding:'5px'}}>
<TopKeywords props={sconsole?.keywords} />
</Grid>
<Grid item xs={6} sx={{padding:'5px'}}>
<TopPages props={sconsole?.pages} />
</Grid>

</Grid>


<Grid container >

<Grid item xs={6} sx={{padding:'5px'}}>
<UsersbyCountry props={analytics?.country} />
</Grid>
<Grid item xs={6} sx={{padding:'5px'}}>
<UsersbyCity props={analytics?.cities} />
</Grid>

</Grid>

<Grid container >

<Grid item xs={6} sx={{padding:'5px'}}>
<UsersbyDevice props={analytics?.devices} />
</Grid>
<Grid item xs={6} sx={{padding:'5px'}}>
<TopTrafficSource props={analytics?.trafficSources} />
</Grid>

</Grid>

{/* 
<Grid item xs={12}>
<Paper sx={{p:'5px'}}>
<CampaignsBar />
</Paper>
</Grid>

<Grid item xs={6}>
<Paper sx={{p:'5px'}}>
<Pie />
</Paper>
</Grid>
<Grid item xs={6}>
<Paper sx={{p:'5px'}}>
<Bar />
</Paper>
</Grid>
*/}


</div>

)

}
