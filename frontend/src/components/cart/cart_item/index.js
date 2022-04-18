import React from "react";
import { Link, useLocation } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CircularProgress,
  TextField, Stack, IconButton
  
} from "@mui/material";

import useImage from '../hooks/useImage'

const CartItem = ({ item, handleDelete, quantity, handleQty }) => {
  const { image, loading, error } = useImage(item.imgsrc)
  const[qty, setQty] = React.useState();

  React.useEffect( (e)=>{   
    setQty(e);
  }, []);
 
    return (
    <>
    
      {loading && !error ? (
        <CircularProgress color="primary"/>
        ) : (
          <Card
            style={{
              height: "100%",
              width: "100%"
            }}
          >
            <IconButton onClick = {()=>{handleDelete(item.itemNo)}} fontSize="inherit"  style={{ marginLeft: "85%" }} aria-label="delete" size="large">
            <DeleteIcon />
            </IconButton>

            <CardMedia            
              style={{
                height: 200,
                width: 100,
                margin: 'auto'
              }}
              image={image}
              component="img"
            />
            <CardContent>
           
              <Typography variant="h5" color="primary">{item.name}</Typography>
              <Typography variant="h6" style={{fontWeight: 'bold'}}>${item.price}</Typography>
              <Typography variant="title" noWrap>&nbsp;</Typography>
                 <br/>         
              <TextField  style={{ width: "100%" }} variant="outlined" label="Quantity" justify="right" type="number" defaultValue={quantity} value = {qty} onChange={e =>{ setQty(e.target.value); handleQty(item.itemNo, e.target.value)} }InputProps={{ inputProps: { min: 1 } }}/>
           
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
        )
      }
    </>
   );
};

export default CartItem;
