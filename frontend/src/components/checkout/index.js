import React from "react";
import {
  TextField,
  Typography,
  Box,
  Stack,
  Button,
  Container,
} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL;

const Checkout = () => {
  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [adress, setAddress] = React.useState();
  const [postalCode, setPostalCode] = React.useState();
  const [city, setCity] = React.useState();
  const [country, setCountry] = React.useState();
  const [province, setProvince] = React.useState();
  const [cardName, setCardName] = React.useState();
  const [cardNumber, setCardNumber] = React.useState();
  const [cardExpiry, setCardExpiry] = React.useState();
  const [cvv, setCVV] = React.useState();
  const navigate = new useNavigate();
  
  const getCheckoutAttempts = async ()=>{
    return  axios({
      method: 'get',
      url: baseUrl + '/api/admin/checkout'
    }).then((response) => {
      return response.data ;
      });
  }

  const updateCheckoutAttempts = async ()=>{
    return  axios({
      method: 'post',
      url: baseUrl + '/api/admin/checkout'
    }).then((response) => {
      return response.data ;
      });
  }
  var checkoutAttempts;

  
  const handleClick = async ()=>{
    if(typeof firstName !== 'undefined' && typeof lastName !== 'undefined' && typeof adress !== 'undefined' && typeof postalCode !== 'undefined'
      && typeof city !== 'undefined' && typeof country !== 'undefined' && typeof province !== 'undefined' && typeof cardName !== 'undefined' && typeof cardNumber !=='undefined'
      && typeof cardExpiry !== 'undefined' && typeof cvv !== 'undefined')
      {
        
        checkoutAttempts =await  getCheckoutAttempts();
        console.log(checkoutAttempts[0].Count)
        if( (checkoutAttempts[0].Count +1) % 3 === 0 )
        {
          alert("error credit card denied. Try again")
        }
        else{
          alert("success")
          //go to next page
          navigate('/review');
        }
       await updateCheckoutAttempts();
       console.log(checkoutAttempts[0].Count)
      }
      else{
        alert("error please fill out the form")
      }

      
  }

  return (
    <>
      <Container sx={{ width: "50%" }}>
        <Box
          sx={{
            width: 300,
            height: 350,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h6">Shipping Address</Typography>
            <Stack spacing={2} direction="row">
              <TextField
                label="First Name*"
                variant="standard"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></TextField>
              <TextField
                label="Last Name*"
                variant="standard"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></TextField>
            </Stack>

            <TextField
              label="Adress*"
              variant="standard"
              value={adress}
              onChange={(e) => setAddress(e.target.value)}
            ></TextField>

            <Stack spacing={2} direction="row">
              <TextField
                label="City*"
                variant="standard"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></TextField>
              <TextField
                label="Province*"
                variant="standard"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              ></TextField>
            </Stack>
            <Stack spacing={2} direction="row">
              <TextField
                label="Postal Code*"
                variant="standard"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              ></TextField>
              <TextField
                label="Country*"
                variant="standard"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {" "}
              </TextField>
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            width: 300,
            height: 350,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h6">Payment Details</Typography>
            <Stack spacing={2} direction="row">
              <TextField
                label="Name on Card*"
                variant="standard"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              ></TextField>
              <TextField
                label="Card Number*"
                variant="standard"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              ></TextField>
            </Stack>
            <Stack spacing={2} direction="row">
              <TextField
                label="Expiry Date*"
                variant="standard"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
              ></TextField>
              <TextField
                label="CVV*"
                variant="standard"
                value={cvv}
                onChange={(e) => setCVV(e.target.value)}
              ></TextField>
            </Stack>
            <Button onClick = {handleClick} variant="contained">Checkout</Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
};
export default Checkout;
