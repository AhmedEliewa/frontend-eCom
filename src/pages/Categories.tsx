import Category from "@/component/eCommerce/Category/Category";
import { actCategory } from "@/store/category/act/actCategory";
import Heading from "@/component/eCommerce/Heading/Heading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.category);
  const location = useLocation();

  const renderCategories = records.map((cat) => (
    <Col
      key={cat.id}
      xs={6}
      md={3}
      lg={2}
      className="d-flex align-items-center justify-content-center my-2"
    >
      <Category {...cat} />
    </Col>
  ));

  useEffect(() => {
    if (!records.length) {
      dispatch(actCategory());
    }
  }, [dispatch, records]);

  return (
    <>
      <Heading>
        {location.pathname === "/" ? (
          <span>All Categories :</span>
        ) : (
          "our categories :"
        )}
      </Heading>
      <Loading status={loading} error={error}>
        <div className="mt-2">
          <Row>{renderCategories}</Row>
        </div>
      </Loading>
    </>
  );
};

export default Categories;
