import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid2,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCartReducer } from "./redux/slice/addToCart";

export const Products = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.product);

  if (loading) {
    return (
      <Box sx={{ height: "100vh", margin: "auto" }}>
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          Loading...
        </Typography>
      </Box>
    );
  }
  return (
    <Grid2 container spacing={2} my={2}>
      {data?.products?.map((item, index) => (
        <Grid2 size={{ xs: 12, md: 3 }} key={index}>
          <Card sx={{ borderRadius: 0 }}>
            <CardActionArea onClick={() => navigate(`/product/${item.id}`)}>
              <CardMedia
                component="img"
                height="180"
                image={item?.thumbnail}
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Tooltip title={item?.title}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {item?.title}
                  </Typography>
                </Tooltip>
                <Tooltip title={item?.description}>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",

                      color: "text.secondary",
                    }}
                  >
                    {item?.description}
                  </Typography>
                </Tooltip>
              </CardContent>
            </CardActionArea>
            {/* <CardActions>
              <Button
                onClick={() => addToCart(item.id)}
                sx={{
                  width: "100%",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "0",
                  textTransform: "none",
                  px: 4,
                }}
              >
                Add To Cart
              </Button>
            </CardActions> */}
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};
