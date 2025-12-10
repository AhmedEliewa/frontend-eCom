import { clearAddToCartAfterOrder } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import actPlaceOrder from "@/store/orders/act/actPlaceOrder";
import { resetOrder } from "@/store/orders/orderSlice";
import type { TProduct } from "@/types/product";
import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

type TotalSalaryProps = { productFullInfo: TProduct[] };
const TotalSalary = ({ productFullInfo }: TotalSalaryProps) => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const { loading, error } = useAppSelector((state) => state.order);
  const totalPrice = productFullInfo.reduce((sum, item) => {
    const price = item.price;
    const quantity = item.quantity;
    return sum + price * quantity;
  }, 0);

  const handleClose = () => setShow(false);

  const orderHandler = () => {
    dispatch(actPlaceOrder(totalPrice))
      .unwrap()
      .then(() => {
        dispatch(clearAddToCartAfterOrder());

        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShow(false);
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Place Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place order with subTotal :$
          {totalPrice.toFixed(2)}
          {error && <p className="text-danger">{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={orderHandler}>
            {loading === "pending" ? (
              <>
                <Spinner animation="border" size="sm"></Spinner> loading ...
              </>
            ) : (
              "confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      {totalPrice > 0 && (
        <div className="d-flex justify-content-between mt-4">
          <h3>total price : </h3>
          <h3>{totalPrice.toFixed(2)} $</h3>
        </div>
      )}
      {accessToken && (
        <div className="d-flex justify-content-end mt-5">
          <Button
            variant="outline-primary"
            size="lg"
            onClick={() => setShow(true)}
          >
            Place Order
          </Button>
        </div>
      )}
    </>
  );
};

export default TotalSalary;
