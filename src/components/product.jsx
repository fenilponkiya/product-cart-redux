import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid2,
  Rating,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCartReducer } from "./redux/slice/addToCart";
import { fetchProductById } from "./redux/slice/singleProductSlice";
import _ from "lodash";

export const Product = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const [currentImage, setCurrentImage] = useState(0);
  const { data, loading } = useSelector((state) => state.singleProduct);
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, []);

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
  const discountOnPrice = (data?.price * data?.discountPercentage) / 100;
  const finalPriceAfterDiscount = data?.price - discountOnPrice;
  const addToCart = () => {
    dispatch(
      addToCartReducer({
        type: "INCREMENT",
        payload: data,
      })
    );
  };
  return (
    <>
      <Box py={2}>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                boxShadow: 1,
                mb: "12px",
                borderRadius: 0,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                src={data?.images[currentImage]}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "350px",
                }}
              />
              <Typography
                sx={{
                  transform: "rotate(45deg)",
                  position: "absolute",
                  backgroundColor:
                    data?.availabilityStatus === "In Stock" ? "green" : "red",
                  color: "white",
                  padding: "4px 40px",
                  width: "40%",
                  top: 20,
                  textAlign: "center",
                  right: -80,
                }}
              >
                {data?.availabilityStatus}
              </Typography>
            </Box>
            <Grid2 container spacing={2}>
              {data?.images?.map((path, index) => (
                <Grid2
                  key={index}
                  sx={{ boxShadow: 1, borderRadius: 0 }}
                  onClick={() => setCurrentImage(index)}
                >
                  <img
                    src={path}
                    height="80px"
                    width="90px"
                    style={{ objectFit: "contain" }}
                  />
                </Grid2>
              ))}
            </Grid2>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="h6" fontWeight={700}>
              {data?.title}
            </Typography>
            <Rating value={data?.rating} precision={0.5} readOnly />
            <Box sx={{ display: "flex" }}>
              <Typography variant="h6" color="#2196f3">
                ${finalPriceAfterDiscount.toFixed(2)}&nbsp;&nbsp;
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textDecoration: "line-through",
                  fontWeight: "bold",
                }}
              >
                ${data?.price}
              </Typography>
            </Box>
            <Typography color="#9e9e9e" variant="subtitle2">
              {data?.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            {data?.category && (
              <Typography variant="caption" display={"block"}>
                <strong>Category: </strong> {data?.category}
              </Typography>
            )}
            {data?.stock && (
              <Typography variant="caption" display={"block"}>
                <strong>Availablity: </strong> {data?.stock} Products in stock
              </Typography>
            )}
            {data?.brand && (
              <Typography variant="caption" display={"block"}>
                <strong>Brand: </strong> {data?.brand}
              </Typography>
            )}
            {data?.tags.length && (
              <Typography
                variant="caption"
                display={"block"}
                sx={{ fontWeight: 700 }}
              >
                Tags:&nbsp;
                {data?.tags?.map((_, index) => (
                  <Chip
                    label={_}
                    key={index}
                    size="small"
                    sx={{
                      mr: 1,
                      fontWeight: 500,
                      color: "#9e9e9e ",
                      fontSize: "10px",
                    }}
                  />
                ))}
              </Typography>
            )}
            <Divider sx={{ my: 2 }} />

            <Button
              onClick={() => addToCart()}
              sx={{
                backgroundColor: "black",
                color: "white",
                borderRadius: "0",
                textTransform: "none",
                px: 4,
              }}
            >
              Add To Cart
            </Button>
          </Grid2>
        </Grid2>
      </Box>
      <Grid2 container>
        <Grid2 size={{ xs: 12 }}>
          <Typography fontWeight={"700"} variant="subtitle1" mb={2}>
            Customer Ratings and Reviews
          </Typography>
        </Grid2>

        <Grid2 container mb={2}>
          {_.sortBy(data?.reviews, "rating")
            .reverse()
            .map(({ comment, rating, reviewerName, date }, index) => {
              const relativeTime = moment(date).fromNow();
              return (
                <>
                  <Grid2
                    container
                    size={{ xs: 12 }}
                    spacing={2}
                    my={1}
                    key={index}
                  >
                    <Chip
                      icon={
                        <StarIcon fontSize="small" sx={{ fill: "white" }} />
                      }
                      label={rating}
                      size="small"
                      sx={{
                        borderRadius: "15%",
                        backgroundColor: rating > 2 ? "green" : "red",
                        color: "white",
                      }}
                    />
                    <Typography variant="subtitle2">{comment}</Typography>
                  </Grid2>
                  <Typography variant="caption" my={0} py={0} color="#9e9e9e">
                    by {reviewerName}&nbsp; {relativeTime}
                  </Typography>
                </>
              );
            })}
        </Grid2>
      </Grid2>
    </>
  );
};
