import { getCartTotalQuantitySelector } from "@/store/cart/cartSlice";
import { useAppSelector } from "@/store/hooks";
import ShoppingCart from "@assets/shopping-cart.svg?react";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

const Cart = () => {
  const total = useAppSelector(getCartTotalQuantitySelector);

  const navigate = useNavigate();
  return (
    <div
      className="position-relative"
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/cart")}
    >
      <ShoppingCart />
      <span> cart</span>
      {total > 0 && (
        <span
          className="position-absolute bg-primary text-white"
          style={{
            top: "-16px",
            right: "5  px",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {total}
        </span>
      )}
    </div>
  );
};

export default memo(Cart);
