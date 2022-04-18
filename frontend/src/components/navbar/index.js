import React, { useState, useEffect } from "react";
import MuiAppBar from '@mui/material/AppBar';
import {
  Box,
  Toolbar,
  Link
} from "@mui/material";

const Navbar = () => {
  const userId = localStorage.getItem("UserID");
  const token = localStorage.getItem("Token");

  const handleSignOut = (event) => {
    localStorage.removeItem("UserID");
    localStorage.removeItem("Token");
  }

  return (
    <div>
      <MuiAppBar elevation={0} position="fixed" >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h4"
            underline="none"
            color="white"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'Convenience Store'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {userId && token ? (
              <div>
                <Link
                  variant="h6"
                  underline="none"
                  color="white"
                  href="/cart"
                  sx={{ fontSize: 16, ml: 3 }}
                >
                  {'Cart'}
                </Link>
                <Link
                  variant="h6"
                  underline="none"
                  color="secondary"
                  href="/"
                  onClick={handleSignOut}
                  sx={{ fontSize: 16, ml: 3 }}
                >
                  {'Sign Out'}
                </Link>
              </div>
            ) :
            <div>
              <Link
                variant="h6"
                underline="none"
                color="white"
                href="/login"
                sx={{ fontSize: 16, ml: 3 }}
              >
                {'Sign In'}
              </Link>
              <Link
                variant="h6"
                underline="none"
                color="secondary"
                href="/register"
                sx={{ fontSize: 16, ml: 3 }}
              >
                {'Sign Up'}
              </Link>
             </div>
            }
          </Box>
        </Toolbar>
      </MuiAppBar>
      <Toolbar />
    </div>
  );
}

export default Navbar;
