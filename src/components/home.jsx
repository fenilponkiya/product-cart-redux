import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Products } from "./products";
import { productData } from "./redux/slice/allProductSlice";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productData());
  }, []);

  return <Products />;
};
