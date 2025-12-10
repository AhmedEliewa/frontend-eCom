import { addToCart } from "@/store/cart/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import type { TProduct } from "@/types/product";
import { memo, useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import Like from "@assets/like.svg?react";
import LikeFill from "@assets/like-fill.svg?react";
import { actLikeToggle } from "@/store/wishlist/act/actLikeToggle";
import ProductInfo from "../productInfo/ProductInfo";

const Product = memo((props: TProduct) => {
  const [modalShow, setModalShow] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const { id, img, title, price, max, quantity, isLiked, isAuth } = props;
  const dispatch = useAppDispatch();
  const remainingTimes = Number(max) - (quantity ?? 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [isBtnDisabled]);

  const addToCartHandler = () => {
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  };

  const addToWishlistHandler = () => {
    if (!isAuth) {
      setModalShow(true);
      return;
    }
    dispatch(actLikeToggle(id));
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Login Required</h4>
          <p>you should be logged in to add items to wishlist</p>
        </Modal.Body>
      </Modal>

      <Card
        className="overflow-hidden position-relative"
        style={{ width: "15rem", padding: "5px" }}
      >
        <div
          className="position-absolute"
          style={{
            top: "5px",
            right: "5px",
            cursor: "pointer",
            backgroundColor: "white",
            borderRadius: "5px",
            display: "flex",
            padding: "3px",
          }}
          onClick={addToWishlistHandler}
        >
          {isLiked ? <LikeFill title="like" /> : <Like title="dislike" />}
        </div>

        <ProductInfo
          title={title}
          price={price}
          img={img}
          className="text-center"
        >
          <Card.Text
            title={
              remainingTimes
                ? `You can add ${remainingTimes} item(s)`
                : "you can't add more items"
            }
            className="mb-3 text-center"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {remainingTimes ? (
              ` You can add ${remainingTimes} item(s) `
            ) : (
              <span className="text-danger"> you can't add more items</span>
            )}
          </Card.Text>
          <Button
            variant="outline-primary"
            size="sm"
            className="text-capitalize"
            onClick={addToCartHandler}
            disabled={remainingTimes === 0 || isBtnDisabled}
          >
            add to cart
          </Button>
        </ProductInfo>
      </Card>
    </>
  );
});

export default Product;
