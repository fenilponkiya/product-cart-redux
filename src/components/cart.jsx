import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  DialogActions,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addToCartReducer,
  removeFromCartReducer,
  removeProductFromCartReducer,
} from "./redux/slice/addToCart";
import emptyCart from "../assets/empty.svg";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const Cart = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productToRemove, setProductToRemove] = useState(null);
  const { cartData } = useSelector((state) => state.cartProdcut);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const updatedData = cartData.map((item) => {
      const discountOnPrice = (item?.price * item?.discountPercentage) / 100;
      const finalPriceAfterDiscount = item?.price - discountOnPrice;
      const totalPricePerProduct = finalPriceAfterDiscount * item?.quantity;
      return totalPricePerProduct;
    });

    setData(updatedData);
  }, [cartData]);
  const subtotalPrice = data?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const addToCart = (cartItem) => {
    dispatch(
      addToCartReducer({
        type: "INCREMENT",
        payload: cartItem,
      })
    );
  };

  const removeFromCart = (cartItem) => {
    if (cartItem?.quantity === 1) {
      setProductToRemove(cartItem?.id);
      setOpen(true);
    } else {
      dispatch(
        removeFromCartReducer({
          type: "DECREMENT",
          payload: cartItem,
        })
      );
    }
  };
  const removeProduct = () => {
    dispatch(removeProductFromCartReducer(productToRemove));
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteProductFromCart = (cartItem) => {
    setProductToRemove(cartItem?.id);
    setOpen(true);
  };

  return (
    <>
      {cartData.length ? (
        <>
          <Container maxWidth="md" sx={{ my: 8 }}>
            <Grid2
              container
              alignItems={"center"}
              justifyContent={"space-between"}
              mb={2}
            >
              <Grid2>
                <Typography variant="h6">Your Cart</Typography>
              </Grid2>
              <Grid2>
                <Typography variant="caption">
                  <Link to={"/"} style={{ color: "black" }}>
                    Continue Shopping
                  </Link>
                </Typography>
              </Grid2>
            </Grid2>

            <Grid2 container>
              <Grid2 size={{ xs: 4 }}>
                <Typography color="#9e9e9e" variant="caption">
                  PRODUCT
                </Typography>
              </Grid2>{" "}
              <Grid2 size={{ xs: 2 }} sx={{ textAlign: "right" }}>
                <Typography color="#9e9e9e" variant="caption" sx={{ mr: 2 }}>
                  {" "}
                  PRICE
                </Typography>
              </Grid2>{" "}
              <Grid2 size={{ xs: 4 }}>
                <Typography color="#9e9e9e" variant="caption" sx={{ ml: 2 }}>
                  QUANTITY
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 2 }} sx={{ textAlign: "right" }}>
                <Typography color="#9e9e9e" variant="caption">
                  TOTAL
                </Typography>
              </Grid2>
            </Grid2>

            <Divider sx={{ my: 1 }} />
            {cartData.map((item, index) => {
              const discountOnPrice =
                (item?.price * item?.discountPercentage) / 100;
              const finalPriceAfterDiscount = item?.price - discountOnPrice;

              const totalPricePerProduct = (
                finalPriceAfterDiscount * item?.quantity
              ).toFixed(2);
              return (
                <>
                  <Dialog onClose={handleClose} open={open}>
                    <DialogTitle>
                      <Typography variant="subtitle1">
                        Do you want to remove this prodcut from the cart?
                      </Typography>
                    </DialogTitle>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        sx={{ textTransform: "none", color: "black" }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={removeProduct}
                        sx={{
                          backgroundColor: "black",
                          color: "white",
                          borderRadius: "0",
                          textTransform: "none",
                          px: 4,
                        }}
                      >
                        Remove{" "}
                      </Button>
                    </DialogActions>{" "}
                  </Dialog>
                  <Grid2
                    container
                    sx={{ my: 3 }}
                    alignItems={"center"}
                    key={index}
                  >
                    <Grid2 container size={{ xs: 4 }} alignItems={"center"}>
                      <Grid2 size={{ xs: 3 }}>
                        <img
                          src={item?.thumbnail}
                          width="100%"
                          height="100%"
                          style={{ objectFit: "cover" }}
                        />
                      </Grid2>
                      <Grid2>
                        <Typography
                          variant="caption"
                          sx={{ ml: 2, fontWeight: 700 }}
                        >
                          {item?.title}
                        </Typography>{" "}
                      </Grid2>
                    </Grid2>{" "}
                    <Grid2 size={{ xs: 2 }} textAlign={"right"}>
                      <Typography
                        variant="caption"
                        sx={{ mr: 2 }}
                        fontWeight={700}
                      >
                        ${finalPriceAfterDiscount.toFixed(2)}
                      </Typography>
                    </Grid2>{" "}
                    <Grid2 size={{ xs: 4 }}>
                      <ButtonGroup
                        variant="outlined"
                        size="small"
                        sx={{ ml: 2 }}
                      >
                        <Button
                          onClick={() => addToCart(item)}
                          sx={{
                            borderRadius: 0,
                            border: "1px solid #9e9e9e",
                            color: "black",
                            borderRight: "transparent",

                            ":hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          <AddIcon fontSize="10px" />
                        </Button>
                        <Button
                          sx={{
                            borderTop: "1px solid #9e9e9e",
                            borderBottom: "1px solid #9e9e9e",
                            borderLeft: "transparent",
                            color: "black",
                            borderRight: "transparent",

                            ":hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          <Typography variant={"caption"}>
                            {item?.quantity}
                          </Typography>
                        </Button>
                        <Button
                          onClick={() => removeFromCart(item)}
                          sx={{
                            borderRadius: 0,
                            border: "1px solid #9e9e9e",
                            borderLeft: "transparent",
                            color: "black",
                            ":hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          <RemoveIcon fontSize="10px" />
                        </Button>
                      </ButtonGroup>
                    </Grid2>
                    <Grid2
                      container
                      size={{ xs: 2 }}
                      justifyContent={"right"}
                      alignItems={"center"}
                    >
                      <Grid2>
                        <Typography
                          variant="caption"
                          fontWeight={700}
                          sx={{ mr: 2 }}
                        >
                          ${totalPricePerProduct}
                        </Typography>
                      </Grid2>
                      <Grid2>
                        <DeleteOutlineIcon
                          onClick={() => deleteProductFromCart(item)}
                        />
                      </Grid2>
                    </Grid2>
                  </Grid2>
                  <Divider />
                </>
              );
            })}
            <Box sx={{ textAlign: "right", mt: 6 }}>
              <Typography variant="body2">
                <strong>Subtotal</strong> &nbsp;${subtotalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Container>
        </>
      ) : (
        <>
          <Grid2 container>
            <Grid2 size={{ xs: 12 }} textAlign={"center"} mb={2}>
              <img src={emptyCart} style={{ height: "70vh", width: "70vw" }} />
            </Grid2>
            <Grid2 size={{ xs: 12 }} textAlign={"center"} mb={1}>
              <Typography variant="h6">Your cart is empty</Typography>
            </Grid2>

            <Button
              onClick={() => navigate("/")}
              sx={{
                mx: "auto",
                backgroundColor: "black",
                color: "white",
                borderRadius: "0",
                textTransform: "none",
                px: 4,
              }}
            >
              Continue Shopping
            </Button>
          </Grid2>
        </>
      )}
    </>
  );
};
