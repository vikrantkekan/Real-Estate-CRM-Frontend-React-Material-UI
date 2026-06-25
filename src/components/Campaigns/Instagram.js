import  {useState,useEffect} from 'react';
import {useCookies,withCookies} from 'react-cookie';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
//import ProjectCard from './ProjectCard'
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import InstaCard from './InstaCard';


function Instagram(props){

    const [conns,setConns]=useState({"business_discovery":{"media":{"data":[]}}});
    const [token2,setToken]=useState(null);
    const [cookies, setCookie,removeCookie] = useCookies(['name','all']);

    useEffect(
      ()=>{
      let clie={"clie":cookies.all.clie}

      if(cookies.all.uroles[0].insta){
        fetch(`${process.env.REACT_APP_API_BASE_URL}/connection.php`,{
          method:'post',
          header:{'Content-Type':'application/json'},
          body:JSON.stringify(clie)
        })
        .then((response)=>response.json())
        .then((data)=>{
          const token=data[0]['token']
          setToken(data[0]['token']);

          let url='https://graph.facebook.com/v19.0/'+data[0]['pageid']+'?fields=instagram_business_account,username&access_token='+token;
          fetch(url).then((response2)=>response2.json()).then((data2)=>{
            
            let instaid=data2.instagram_business_account.id;
            
          console.log('instaid',instaid)

            let url4='https://graph.facebook.com/v19.0/'+instaid+'?fields=username&access_token='+token
            fetch(url4).then((response4)=>response4.json()).then((data4)=>{

        
              const username=data4.username;

              let fields='business_discovery.username('+username+'){username,followers_count,name,profile_picture_url,follows_count,media_count,media{media_type,media_url,comments_count,like_count,caption,children{media_url}}}';
              
              let url2='https://graph.facebook.com/v19.0/'+instaid+'?fields='+fields+'&access_token='+token;
  
              fetch(url2).then((response3)=>response3.json()).then((data3)=>{
          
                setConns(data3)
               
              }).catch((err3)=>console.log(err3));

            }).catch((err4)=>console.log(err4))

          }).catch((err2)=>console.log(err2))


        }).catch((err)=>console.log(err));
        }
      }
      ,[1])
      

let mediacard=conns.business_discovery.media.data.map((itm)=><InstaCard data={itm} token={token2} />)

console.log('conns',conns)
    return(

        <Box sx={{pt:10}}>
        <Grid container sx={{p:2}}>

<Grid item xs={12} sx={{borderBottom:'1px solid #eee',pb:2}}>
  
  <Grid container>
    <Grid item xs={2} sx={{ml:1}}>
    <img src={conns.business_discovery.profile_picture_url} style={{height:200}} />
      </Grid> 
    <Grid item xs={6}>
    <div>
        <h3 style={{marginLeft:'10%',color:'rgb(68, 94, 130)'}}>{conns.business_discovery.name} ({conns.business_discovery.username})</h3>
        <Grid container>
        <Grid item xs={4}> 
        <center>
        <h2 style={{color:'#2b2b2b'}}>{conns.business_discovery.followers_count}</h2>
        
        <p style={{color:'#6b6a6a',marginTop:'-1vw'}}>Followers</p>
        </center>
        </Grid>
        <Grid item xs={4}> 
        <center>
        <h2 style={{color:'#2b2b2b'}}>{conns.business_discovery.media_count}</h2>
        <p style={{color:'#6b6a6a',marginTop:'-1vw'}}>Posts</p>
        </center>
        </Grid>
        <Grid item xs={4}> 
        <center>
        <h2 style={{color:'#2b2b2b'}}>{conns.business_discovery.follows_count}</h2>
        <p style={{color:'#6b6a6a',marginTop:'-1vw'}}>Following</p>
        </center>
        </Grid>

        </Grid>
      </div>
    
      </Grid> 

    </Grid>

  </Grid>

<Grid item xs={12} sx={{borderBottom:'1px solid #eee',pb:2}}>
  <Grid item xs={12} sx={{border:'1px solid #eee',p:1,m:2,borderRadius:'5px'}}>
  <h3 style={{paddingLeft:'15px',color:'rgb(68, 94, 130)'}}>Profile Insights</h3>

      <div style={{padding:'15px',color:'#2b2b2b',display:'flex',justifyContent:'start',alignItems:'center',flexWrap:'wrap'}}>
        
        <div style={{width:'100%',border:'1px solid #eee',padding:'15px',margin:'2px',borderRadius:'5px',textAlign:'center'}}>
        <p style={{color:'rgb(68, 94, 130)',fontSize:'21px'}}>1,234</p>
        <p style={{fontSize:'14px'}}  >Accounts reached</p>
        </div>

        <div style={{width:'100%',border:'1px solid #eee',padding:'15px',margin:'2px',borderRadius:'5px',textAlign:'center'}}>
        <p style={{color:'rgb(68, 94, 130)',fontSize:'21px'}}>1,234</p>
        <p style={{fontSize:'14px'}}>Profile visits</p>
        </div>

         <div style={{width:'100%',border:'1px solid #eee',padding:'15px',margin:'2px',borderRadius:'5px',textAlign:'center'}}>
        <p style={{color:'rgb(68, 94, 130)',fontSize:'21px'}}>1,234</p>
         <p style={{fontSize:'14px'}}>Accounts engaged</p>
        </div>

         <div style={{width:'100%',border:'1px solid #eee',padding:'15px',margin:'2px',borderRadius:'5px',textAlign:'center'}}>
        <p style={{color:'rgb(68, 94, 130)',fontSize:'21px'}} >1,234</p>
        <p style={{fontSize:'14px'}}>Content interactions</p>
        </div>

         <div style={{width:'100%',border:'1px solid #eee',padding:'15px',margin:'2px',borderRadius:'5px',textAlign:'center'}}>
        <p style={{color:'rgb(68, 94, 130)',fontSize:'21px'}} >1,234</p>
         <p style={{fontSize:'14px'}}>Likes</p>
        </div>

           <div style={{width:'100%',border:'1px solid #eee',padding:'15px',margin:'2px',borderRadius:'5px',textAlign:'center'}}>
        <p style={{color:'rgb(68, 94, 130)',fontSize:'21px'}} >1,234</p>
        <p style={{fontSize:'14px'}}>Shares</p>
        </div>

      </div>
  </Grid>
</Grid>

{mediacard}

  </Grid>
</Box>   

    )

}

export default Instagram;