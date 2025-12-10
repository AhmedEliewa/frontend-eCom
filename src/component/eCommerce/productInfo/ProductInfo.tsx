import { Card } from "react-bootstrap";

type TProductInfoProps = {
  title: string;
  price: number;
  img: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  quantity?: number;
};

const ProductInfo = ({
  title,
  price,
  img,
  children,
  style,
  className,
  quantity,
}: TProductInfoProps) => {
  return (
    <div style={style}>
      <Card.Img variant="top" src={img} style={style} />
      <Card.Body className={className}>
        <Card.Title
          title={title}
          className="m-1"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Card.Title>
        <Card.Text className="m-1">price : {price.toFixed(2)} $</Card.Text>
        {quantity && (
          <Card.Text className="m-1">quantity : {quantity}</Card.Text>
        )}

        {children}
      </Card.Body>
    </div>
  );
};

export default ProductInfo;
