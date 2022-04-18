import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Box,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel
} from "@mui/material";

import CatalogItem from './item';

const baseUrl = process.env.REACT_APP_BASE_URL;

const Catalog = () => {
  const [items, setItems] = useState([]);
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [checkedTypes, setCheckedTypes] = useState([]);
  const [checkedBrands, setCheckedBrands] = useState([]);
  
  useEffect(() => {
    getIP();

    axios({
      method: 'get',
      url: baseUrl + '/api/item' 
    }).then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    const t = [];
    const b = [];
    for (var i = 0; i < items.length; i++) {
      t.indexOf(items[i].type) === -1 && t.push(items[i].type);
      b.indexOf(items[i].brand) === -1 && b.push(items[i].brand);
    }
    setTypes(t);
    setCheckedTypes(t);
    setBrands(b);
    setCheckedBrands(b);
    setFilteredItems(items);
  }, [items]);

  const saveIP = (ip) => {
    console.log("ip: " + ip);
    if (ip !== '') {
      axios({
        method: 'post',
        url: baseUrl + '/api/admin',
        data: {
          ipaddress: ip
        }
      });
    }
  }

  const getIP = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data.IPv4);
    saveIP(res.data.IPv4);
  }

  const handleCheckedAllTypes = (event) => {
    var state = event.target.checked;

    if (state) {
      setCheckedTypes(types);
      setFilteredItems(items);
    } else {
      setCheckedTypes([]);
      setFilteredItems([]);
    }
  };

  const handleCheckedType = (event) => {
    var state = event.target.checked;
    var value = event.target.value;
    var index = checkedTypes.indexOf(value);

    if (state) {
      index === -1 && setCheckedTypes(oldArray => [...oldArray, value]);
      var updatedItems = filteredItems;
      var newItems = items.filter(i => i.type === value);
      for (var i = 0; i < newItems.length; i++) {
        if (!updatedItems.includes(newItems[i])) {
          updatedItems.push(newItems[i]);
        }
      }
      setFilteredItems(updatedItems);
    } else {
      index !== -1 && setCheckedTypes(checkedTypes.filter(item => item !== value));
      var updatedItems = filteredItems.filter(i => i.type !== value);
      setFilteredItems(updatedItems);
    }
  };

  const handleCheckedAllBrands = (event) => {
    var state = event.target.checked;

    if (state) {
      setCheckedBrands(brands);
      setFilteredItems(items);
    } else {
      setCheckedBrands([]);
      setFilteredItems([]);
    }
  };

  const handleCheckedBrand = (event) => {
    var state = event.target.checked;
    var value = event.target.value;
    var index = checkedBrands.indexOf(value);

    if (state) {
      index === -1 && setCheckedBrands(oldArray => [...oldArray, value]);
      var updatedItems = filteredItems;
      var newItems = items.filter(i => i.brand === value);
      for (var i = 0; i < newItems.length; i++) {
        if (!updatedItems.includes(newItems[i])) {
          updatedItems.push(newItems[i]);
        }
      }
      setFilteredItems(updatedItems);
    } else {
      index !== -1 && setCheckedBrands(checkedBrands.filter(item => item !== value));
      var updatedItems = filteredItems.filter(i => i.brand !== value);
      setFilteredItems(updatedItems);
    }
  };

  return (
    <Grid container spacing={2} columns={16}>
      <Grid item xs={4}>
        <Box sx={{ border: 1 }} m={5} pt={3}>
          <Grid container justifyContent="flex">
            <Typography variant="h6" color="primary" style={{ marginLeft: 16 }}>FILTER BY:</Typography>
          </Grid>
          <Grid container justifyContent="flex">
            <FormControlLabel
              style={{ marginLeft: 16 }}
              label="Type"
              control={
                <Checkbox
                  checked={checkedTypes.length === types.length}
                  onChange={handleCheckedAllTypes}
                />
              }
            />
          </Grid>
          {types.map((type) => (
            <Grid container key={type} justifyContent="flex">
              <FormControlLabel
                style={{ marginLeft: 30 }}
                label={type}
                control={
                  <Checkbox
                    checked={checkedTypes.indexOf(type) !== -1}
                    onChange={handleCheckedType}
                    value={type}        
                  />
                }
              />
            </Grid>
          ))}
          <Grid container justifyContent="flex">
            <FormControlLabel
              style={{ marginLeft: 16 }}
              label="Brand"
              control={
                <Checkbox
                  checked={checkedBrands.length === brands.length}
                  onChange={handleCheckedAllBrands}
                />
              }
            />
          </Grid>
          {brands.map((brand) => (
            <Grid container key={brand} justifyContent="flex">
              <FormControlLabel
                style={{ marginLeft: 30 }}
                label={brand}
                control={
                  <Checkbox
                    checked={checkedBrands.indexOf(brand) !== -1}
                    onChange={handleCheckedBrand}
                    value={brand}
                  />
                }
              />
            </Grid>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box m={2} pt={3}>
          <Grid container direction="row"justify="center" spacing={6}>
              {filteredItems.map((product) => (
                  <Grid item key={product.itemNo} xs={12} sm={6} md={4} >
                    <CatalogItem item={product} />
                  </Grid>
              ))}
          </Grid>      
        </Box>
      </Grid>
    </Grid>
  );
};

export default Catalog;
