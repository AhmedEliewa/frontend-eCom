import { changeQuantity, removeProduct } from "@/store/cart/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import type { TProduct } from "@/types/product";
import { Button, Form } from "react-bootstrap";
import ProductInfo from "../productInfo/ProductInfo";

const CartItem = (props: TProduct) => {
  const { id, img, title, price, quantity } = props;
  const dispatch = useAppDispatch();
  const renderOption = Array(props.max)
    .fill(0)
    .map((_, i) => <option key={i}>{i + 1}</option>);
  const changeQuantityHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = +e.target.value;
    dispatch(changeQuantity({ id, quantity }));
  };

  const removeProductHandler = (id: number) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="d-flex justify-content-between border p-2 mb-3">
      <div className="d-flex gap-2 ">
        {/* <div style={{ width: "160px", height: "160px" }}>
          <img
            style={{ width: "100%", padding: "5px", height: "100%" }}
            src={img}
            alt={props.title}
          />
        </div>
        <div className="d-flex flex-column justify-content-between p-1">
          <div>
            <p>{title}</p>
            <span>{price} EGP</span>
          </div>
          <Button
            variant="outline-danger"
            style={{ width: "100px" }}
            onClick={() => removeProductHandler(id)}
          >
            remove
          </Button>
        </div> */}
        {/* // another way (reusable component) */}
        <ProductInfo
          title={title}
          price={price}
          img={img}
          style={{
            width: "160px",
            height: "160px",
            display: "flex",
            alignItems: "space-between",
          }}
          className="d-flex flex-column justify-content-between p-1"
        >
          <Button
            variant="outline-danger"
            style={{ width: "100px" }}
            onClick={() => removeProductHandler(id)}
          >
            remove
          </Button>
        </ProductInfo>
      </div>
      <Form>
        <Form.Label className="text-capitalize fw-semibold">
          quantity :{quantity}
        </Form.Label>
        <Form.Select
          aria-label="Default select example"
          value={props.quantity}
          onChange={changeQuantityHandler}
        >
          {renderOption}
        </Form.Select>
      </Form>
    </div>
  );
};

export default CartItem;
