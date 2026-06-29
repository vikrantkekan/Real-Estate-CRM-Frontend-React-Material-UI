import React from 'react'
import Paper from '@mui/material/Paper'
import Pie from '../Charts/Pie'
import Bar from '../Charts/Bar'
import CampaignsBar from '../Charts/CampaignsBar'
import Box from '@mui/material/Box'
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
import LeadsTotal from './dashboard/LeadsTotal'
import UsersbyCountry from './dashboard/UsersbyCountry'
import UsersbyCity from './dashboard/UsersbyCity'
import UsersbyDevice from './dashboard/UsersbyDevice'
import TopTrafficSource from './dashboard/TopTrafficSource'



export default function GoogleDashboard(){

        return(

<div style={{marginTop:'60px',backgroundColor:'#f5f7fc',minHeight:'100vh',padding:'15px'}}>
<Grid container>

<Grid item xs={3} sx={{padding:'5px'}}>
<WebsiteUser />
</Grid>
<Grid item xs={3} sx={{padding:'5px'}}>
<WebsiteSession />
</Grid>
<Grid item xs={3} sx={{padding:'5px'}}>
<OrganicImpression />
</Grid>
<Grid item xs={3} sx={{padding:'5px'}}>
<OrganicClicks />
</Grid>

</Grid>

<Grid container>

<Grid item xs={3} sx={{padding:'5px'}}>
<AvgPosition />
</Grid>
<Grid item xs={3} sx={{padding:'5px'}}>
<AvgCtr />
</Grid>
<Grid item xs={3} sx={{padding:'5px'}}>
<AvgEngagetime />
</Grid>
<Grid item xs={3} sx={{padding:'5px'}}>
<LeadsTotal />
</Grid>

</Grid>

<Grid container >

<Grid item xs={6} sx={{padding:'5px'}}>
<TopKeywords />
</Grid>
<Grid item xs={6} sx={{padding:'5px'}}>
<TopPages />
</Grid>

</Grid>


<Grid container >

<Grid item xs={6} sx={{padding:'5px'}}>
<UsersbyCountry />
</Grid>
<Grid item xs={6} sx={{padding:'5px'}}>
<UsersbyCity />
</Grid>

</Grid>

<Grid container >

<Grid item xs={6} sx={{padding:'5px'}}>
<UsersbyDevice />
</Grid>
<Grid item xs={6} sx={{padding:'5px'}}>
<TopTrafficSource />
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
