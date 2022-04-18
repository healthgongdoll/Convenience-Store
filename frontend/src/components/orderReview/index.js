import React from "react";
import {
  TextField,
  Typography,
  Box,
  Stack,
  Button,
  Container,

} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL;

const OrderReview = () => {
  const [shoppingCart, setShoppingCart] = React.useState();
  const [items, setItems] = React.useState([]);
  const userId = localStorage.getItem("UserID");
  const token = localStorage.getItem("Token");
  const[order, setOrder] = React.useState([]);
  const[totalCost, setTotalCost] = React.useState();
  const navigate = new useNavigate();
  

 //get all of the orders
 React.useEffect(async ()=>{   
  const itemData = await fetchItems();
  const cartData = await fetchCart();

 await handleFilter(itemData, cartData);
  
}, []);

const handleFilter = (itemData, cartData) =>{

  console.log({itemData, cartData})
 
    var index1 = Number(cartData.length);
    var index2 = Number(itemData.length)
    var newItems = [];
    var tempOrder = [[]];
    var index =0;
    var tempCost =0;

    for(var i =0; i< index1; i++)
    {
      for(var j =0; j<index2 ; j++)
      {
        if(cartData[i].itemNo === itemData[j].itemNo)
        {
          newItems.push(itemData[j])   
          tempOrder[index] = [itemData[j].itemNo, itemData[j].name, itemData[j].price, cartData[i].quantity, Number(cartData[i].quantity)*Number(itemData[j].price)]
          index++;
        }
      }
    }

    for( i=0; i< tempOrder.length; i++)
        {
         tempCost += Number(tempOrder[i][2])* Number(tempOrder[i][3])
        }

    setItems(newItems)
    setTotalCost(tempCost)
    setOrder(tempOrder)
    console.log({newItems, tempOrder})
}
const fetchItems= async ()=>{
  return  axios({
     method: 'get',
     url: baseUrl + '/api/item'
   }).then((response) => {
     return response.data ;
     });
 }

 const fetchCart = async  () =>{
  return  axios({
     method: 'get',
     url: baseUrl + '/api/shoppingcart/'+userId
   }).then((response) => {
      return response.data ;

   });
 }
   
 const handleClick = async() =>{
  alert("purchase successful. your order is on the way");
  
  await axios({
    method: 'get',
    url: baseUrl+'/api/shoppingcart/'+userId,
    headers: { "Authorization": "Bearer " + token}
  }).then((response)=>{
    console.log(response.data)

    for(var i=0; i< response.data.length; i++)
    {
      axios({
        method: 'post',
        url: baseUrl+'/api/orderItem/',
        headers: { "Authorization": "Bearer " + token},
        data: {itemNo: response.data[i].itemNo, quantity: response.data[i].quantity}
      }).then((r)=>{
          console.log(r.status)
      })
    }
  })
};
   
  return (
    <>
   
      <Container sx={{width:"50%"}}>
          <Box>
    <Typography sx={{textAlign:"center"}}  variant="h4">Order Summary</Typography>         
    <TableContainer sx={{maxWidth: 400, marginLeft:"auto", marginRight:"auto"}}  component={Paper}>
      <Table  sx={{maxWidth: 400}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            
            <TableCell align="left">Item Name</TableCell>
            <TableCell align="left">Cost&nbsp;($)</TableCell>
            <TableCell align="left">Quantity&nbsp;</TableCell>
            <TableCell align="left">Total Cost&nbsp;($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.map((row) => (
            <TableRow>
              
              <TableCell align="left">{row[1]}</TableCell>
              <TableCell align="center">{row[2]}</TableCell>
              <TableCell align="center">{row[3]}</TableCell>
              <TableCell align="center">{row[4]}</TableCell>
            </TableRow>
          ))}

           
        </TableBody>
      </Table>
      <Table  sx={{maxWidth: 400}} size="small" aria-label="a dense table">
       
        <TableBody>
               <TableRow>
              
              <TableCell align="left">{"Total Cost: "}</TableCell>
              <TableCell align="center">{""}</TableCell>
              <TableCell align="center">{""}</TableCell>
              <TableCell align="center">{Math.round(totalCost*100)/100}</TableCell>
              
            </TableRow>
                
        </TableBody>
      </Table>
    </TableContainer>
<br/>
    <Button onClick = {handleClick} sx={{marginLeft:"50%", width:"200px"}} variant="contained">Confirm Order</Button>
    </Box>
      </Container>
    </>
  );
};
export default OrderReview;
