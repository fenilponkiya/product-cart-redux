import { Badge, Button, IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

export const Header = () => {
  const navigate = useNavigate();
  const { count } = useSelector((state) => state.cartProdcut);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            Patel Shopping Mall
          </Typography>

          <IconButton>
            <Badge badgeContent={count} color="primary">
              <ShoppingCartIcon onClick={() => navigate("/cart")} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
