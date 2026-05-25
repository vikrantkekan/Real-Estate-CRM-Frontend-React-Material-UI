import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Chip from '@mui/material/Chip'
import {useState,useEffect} from 'react'

function CallTimeline(props){

const [timeline,setTimeline]=useState([]);


useEffect(
()=>{
    let url=`${process.env.REACT_APP_API_BASE_URL}/call-timeline.php?lid=${props.data}`;
    fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data)
        setTimeline(data);
    })
}
,[]
    );

let q=timeline.map((itm)=>{

    let playrec=`${process.env.REACT_APP_API_BASE_URL}recording-play.php?callSid=${itm.call_sid}`;
   
return <Step index={0} active = {true}>
<StepLabel label="one">
<a href={playrec} target="_blank">
<Chip sx={{fontSize:'14px',color:'#4f4f4d',fontWeight:400}} label={'Play recording'} ></Chip>  
</a>
</StepLabel>
 <StepContent sx={{color:'#4f4f4d',fontSize:'13px'}} > 
 <span style={{fontSize:'12px',color:'#4f4f4d'}}> {itm.on_date} <span style={{fontSize:'13px'}}><b>Call by {itm.fullname}</b></span> </span>
 <p>{itm.call_type}</p>
 </StepContent>
</Step>

})

    return(

<Stepper activeStep={0,1} orientation="vertical">
{q}
</Stepper>

        )
}

export default CallTimeline