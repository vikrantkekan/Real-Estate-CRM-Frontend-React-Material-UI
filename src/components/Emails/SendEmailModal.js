import React, { useState, useEffect  } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

const SendEmailModal = ({lid,uid,email,name,clientid}) => {

 const [subject, setSubject] = useState("");
  const [templates, setTemplates] = useState([]);
const [mailid, setMailid] = useState(0);

   useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/email_template_list.php?clie=${clientid}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data); // assuming array response
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mailid) {
      alert("Please select email type");
      return;
    }

    let urlapi='https://www.3dotsdesign.in/demo/demo/email';

      fetch(`${urlapi}/send-mail.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      tempid: mailid,
      clientid: clientid,
      name: name,
      email: email,
      uid:uid,
      lid:lid
    })
  })
    .then((res) => res.json())
    .then((data) => {
     // console.log("response:", data);
      alert("Email sent");
    })
    .catch((err) => console.error(err));

    console.log("Sending email with subject:", mailid);

    // API call here
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: '100%' }}
    >
        <p>{email}</p>
      <FormControl fullWidth>
        <InputLabel>Select Email</InputLabel>
        <Select
  value={subject?.id || ""}
  label="Email Type"
  onChange={(e) => {
    const selected = templates.find(t => t.id === e.target.value);
    setSubject(selected); // store full object
    setMailid(e.target.value)
  }}
>
  <MenuItem value="">Select Email</MenuItem>

  {templates.map((tpl) => (
    <MenuItem key={tpl.id} value={tpl.id}>
      {tpl.subject}
    </MenuItem>
  ))}
</Select>
      </FormControl>

{subject && (
  <iframe
    title="email-preview"
    srcDoc={subject.body}
    style={{
      width: "100%",
      height: "300px",
      border: "1px solid #ddd",
      marginTop: "15px"
    }}
  />
)}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
      >
        Send Email
      </Button>
    </Box>
  );
};

export default SendEmailModal;