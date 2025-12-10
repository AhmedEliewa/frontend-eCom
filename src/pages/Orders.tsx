import ProductInfo from "@/component/eCommerce/productInfo/ProductInfo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetPlaceOrder } from "@/store/orders/act/actGetPlaceOrder";
import { resetOrder } from "@/store/orders/orderSlice";
import type { TProduct } from "@/types/product";
import { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";

const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);

  const [clickedOrder, setClickedOrder] = useState<TProduct[]>([]);
  const [show, setShow] = useState(false);
  const renderOrders = orders.map((order) => (
    <tr key={order.id}>
      <td>#{order.id}</td>
      <td>
        {order.items.length} item(s) {" / "}
        <span
          onClick={() => viewDetails(order.id)}
          style={{ cursor: "pointer" }}
          className="text-decoration-underline"
        >
          Product Details
        </span>
      </td>
      <td>{order.subTotal.toFixed(2)}</td>
    </tr>
  ));

  const viewDetails = (id: number) => {
    const clickedOrder = orders.find((order) => order.id === id);
    setShow(true);
    setClickedOrder((prev) => [...prev, ...(clickedOrder?.items || [])]);
  };

  const handleClose = () => {
    setShow(false);
    setClickedOrder([]);
  };

  useEffect(() => {
    const promise = dispatch(actGetPlaceOrder());

    return () => {
      promise.abort();
      dispatch(resetOrder());
    };
  }, [dispatch]);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title className="text-capitalize">
            products details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clickedOrder.map((item) => (
            <ProductInfo
              key={item.id}
              title={item.title}
              price={item.price * item.quantity}
              img={item.img}
              quantity={item.quantity}
              className="d-flex flex-column align-items-center"
            />
          ))}
        </Modal.Body>
      </Modal>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Items</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>{renderOrders}</tbody>
      </Table>
    </>
  );
};

export default Orders;
