import Heading from "@/component/eCommerce/Heading/Heading";
import Product from "@/component/eCommerce/Product/Product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actWishlist } from "@/store/wishlist/act/actWishlist";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Loading from "./Loading";
import { cleanWishlist } from "@/store/wishlist/wishlistSlice";

const WishlistPage = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.wishlist);
  const { items } = useAppSelector((state) => state.cart);

  const productFullInfo = records.map((prod) => ({
    ...prod,
    quantity: items[prod.id],
    isLiked: true,
    isAuth: true,
  }));

  const renderProducts = productFullInfo.length ? (
    productFullInfo.map((prod) => (
      <Col
        key={prod.id}
        xs={12}
        md={4}
        lg={3}
        className="d-flex align-items-center justify-content-center my-2"
      >
        <Product {...prod} />
      </Col>
    ))
  ) : (
    <p className="text-center mt-5 fs-3 fw-bold text-danger">
      No products found.!
    </p>
  );

  useEffect(() => {
    const promise = dispatch(actWishlist("productsFullInfo"));
    return () => {
      promise.abort();
      dispatch(cleanWishlist());
    };
  }, [dispatch]);

  return (
    <>
      <Heading>your wishlist :</Heading>
      <Loading status={loading} error={error}>
        <Row>{renderProducts}</Row>
      </Loading>
    </>
  );
};

export default WishlistPage;
