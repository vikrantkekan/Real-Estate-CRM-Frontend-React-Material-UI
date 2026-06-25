import { useEffect,useState } from "react";
import {useCookies,withCookies} from 'react-cookie';

export default function Auth() {

    const [cookies, setCookie,removeCookie] = useCookies(['name','all']);
//console.log("client_id:",  cookies.all.clie)
//console.log("user_id:",  cookies.all.uid)

    const [code, setCode] = useState(null);
    const [data2, setData] = useState({});
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
}, []);




  return (
        <div style={{padding:'100px'}}>
            <button onClick={connectGoogle}>
  Connect Google
</button>
            <h3 style={{fontSize:'120px',color:'#000'}}>Connecting google</h3>
            </div>
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

