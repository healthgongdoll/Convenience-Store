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


export default function AdminEventTable() {
  const [record, setRecord] = useState([]);
  const userId = localStorage.getItem("UserID");
  const token = localStorage.getItem("Token");

  useEffect(()=>{ 
    getData();
  }, []);

  async function getData(){
    var res = await axios.get(baseUrl + '/api/admin/ip')
    .then(res => {
      const records = res.data;
      setRecord(records);
    })
    .catch((error) => {
      alert("Error while fetching ordered items");
    })
}
  return (
    <div>
      {userId && token ? (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell style = {{fontsize:50,fontWeight: 600}}>IP address</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {record.map((row) => (
                  <StyledTableRow key={row.ipAddress}>
                    <StyledTableCell component="th" scope="row">
                      {row.ipAddress}
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
