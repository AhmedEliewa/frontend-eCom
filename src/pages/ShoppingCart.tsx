import CartItem from "@/component/eCommerce/cartItem/CartItem";
import Heading from "@/component/eCommerce/Heading/Heading";
import TotalSalary from "@/component/eCommerce/totalSalary/TotalSalary";
import { actCart } from "@/store/cart/act/actCart";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetOrder } from "@/store/orders/orderSlice";
import { useEffect } from "react";

const ShoppingCart = () => {
  const dispatch = useAppDispatch();
  const { records, items } = useAppSelector((state) => state.cart);
  const { loading } = useAppSelector((state) => state.order);
  const productFullInfo = records.map((product) => ({
    ...product,
    quantity: items[product.id],
  }));

  const renderCart = productFullInfo.length ? (
    productFullInfo.map((prod) => <CartItem key={prod.id} {...prod} />)
  ) : loading === "succeeded" ? (
    <p className="text-center mt-5 fs-3 fw-bold text-success">
      your order has been placed successfully
    </p>
  ) : (
    <p className="text-center mt-5 fs-3 fw-bold text-danger">
      No products found.!
    </p>
  );

  useEffect(() => {
    dispatch(actCart());
    return () => {
      dispatch(resetOrder());
    };
  }, [dispatch]);

  return (
    <>
      <Heading>shopping cart :</Heading>
      <>{renderCart}</>
      <TotalSalary productFullInfo={productFullInfo} />
    </>
  );
};

export default ShoppingCart;
