import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function AdminOrdersTable() {
  const [record, setRecord] = useState([]);
  const [result, setResult] = useState([]);
  // var result = [];
  const userId = localStorage.getItem("UserID");
  const token = localStorage.getItem("Token");

  useEffect(()=>{ 
    getData();
  }, []);

  useEffect(()=>{   
    createResult();
  }, [record]);


 async function getData(){
    var res = await axios.get(baseUrl + '/api/admin/ordered')
    .then(res => {
      const records = res.data;
      setRecord(records);
     
    })
    .catch((error) => {
      alert("Error while fetching ordered items");
    })
  }

  function createResult(){
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var count4 = 0;
    var count5 = 0;
    var count6 = 0;
    var count7 = 0;
    var count8 = 0;
    var count9 = 0;
    var count10 = 0;
    var count11 = 0;
    var count12 = 0;
     for(var i = 0; i < Number(record.length); i++){
       if(new Date(record[i].orderDate).getMonth() === 0) count1 += record[i]['COUNT(*)'];
       if(new Date(record[i].orderDate).getMonth() === 1) count2 += record[i]['COUNT(*)'];
       if(new Date(record[i].orderDate).getMonth() === 2) count3 += record[i]['COUNT(*)'];
       if(new Date(record[i].orderDate).getMonth() === 3) count4 += record[i]['COUNT(*)'];
       if(new Date(record[i].orderDate).getMonth() === 4) count5 += record[i]['COUNT(*)'];
       if(new Date(record[i].orderDate).getMonth() === 5) count6 += record[i]['COUNT(*)'];
       if(new Date(record[i].orderDate).getMonth() === 6) count7 += record[i]['COUNT(*)'];
       if(new Date(record[i].orderDate).getMonth() === 7) count8 += record[i]['COUNT(*)'];
       if(new Date(record[i].orderDate).getMonth() === 8) count9 += record[i]['COUNT(*)'];
       if(new Date(record[i].orderDate).getMonth() === 9) count10 += record[i]['COUNT(*)'];
       if(new Date(record[i].orderDate).getMonth() === 10) count11 += record[i]['COUNT(*)'];
       if(new Date(record[i].orderDate).getMonth() === 11) count12 += record[i]['COUNT(*)'];
     }

     var change = []
     change.push({"count":count1,"month":"January"});
     change.push({"count":count2,"month":"February"});
     change.push({"count":count3,"month":"March"});
     change.push({"count":count4,"month":"April"});
     change.push({"count":count5,"month":"May"});
     change.push({"count":count6,"month":"June"});
     change.push({"count":count7,"month":"July"});
     change.push({"count":count8,"month":"August"});
     change.push({"count":count9,"month":"September"});
     change.push({"count":count10,"month":"October"});
     change.push({"count":count11,"month":"November"});
     change.push({"count":count12,"month":"December"});
     setResult(change);
  } 

  return (
    <div>
      {userId && token ? (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell style = {{fontsize:50, fontWeight: 600}}>Month</StyledTableCell>
                  <StyledTableCell style = {{fontsize:50,fontWeight: 600}}>Number Of Items Sold</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.map((row) => (
                  <StyledTableRow key={row.month}>
                    <StyledTableCell component="th" scope="row">{row.month}</StyledTableCell>
                    <StyledTableCell>
                      {row.count}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) :
      <div>
        You do not have permission to view this page...
      </div>
      }
    </div>
  );
}
