import Heading from "@/component/eCommerce/Heading/Heading";
import Product from "@/component/eCommerce/Product/Product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actProduct } from "@/store/product/act/actProduct";
import { cleanProduct } from "@/store/product/productSlice";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const Products = () => {
  const { prefix } = useParams();
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.product);
  const { items } = useAppSelector((state) => state.cart);
  const { itemsId } = useAppSelector((state) => state.wishlist);
  const { accessToken } = useAppSelector((state) => state.auth);

  const productFullInfo = records.map((item) => ({
    ...item,
    quantity: items[item.id],
    isLiked: itemsId.includes(item.id),
    isAuth: Boolean(accessToken),
  }));

  const renderProducts = productFullInfo.map((prod) => (
    <Col
      key={prod.id}
      xs={12}
      md={4}
      lg={3}
      className="d-flex align-items-center justify-content-center my-2"
    >
      <Product {...prod} />
    </Col>
  ));

  useEffect(() => {
    dispatch(actProduct(prefix as string));

    return () => {
      dispatch(cleanProduct());
    };
  }, [dispatch, prefix]);

  return (
    <>
      <Heading>Products {prefix} :</Heading>
      <Loading status={loading} error={error}>
        <Row>{renderProducts}</Row>
      </Loading>
    </>
  );
};

export default Products;
