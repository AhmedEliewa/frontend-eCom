import { useAppSelector } from "@/store/hooks";
import WishlistIcon from "@assets/wishlist.svg?react";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const total = useAppSelector((state) => state.wishlist.itemsId.length);
  const navigate = useNavigate();
  return (
    <div
      className="position-relative"
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/wishlist")}
    >
      <WishlistIcon title="wishlist" />
      <span> wishlist</span>
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

export default Wishlist;
