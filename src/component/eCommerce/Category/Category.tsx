import type { TCategory } from "@/types/category";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Category = ({ title, prefix, img }: TCategory) => {
  return (
    <Card as={NavLink} to={`/products/${prefix}`}>
      <Card.Img
        variant="top"
        style={{
          height: "150px",
          width: "150px",
          objectFit: "cover",
          borderRadius: "50%",
        }}
        src={img}
      />
      <Card.Body>
        <Card.Title className="text-center text-decoration-underline">
          {title}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Category;
