import { Carousel } from "react-bootstrap";
import img1 from "@assets/Carousel/1.jpg";
import img2 from "@assets/Carousel/2.jpg";
import img3 from "@assets/Carousel/3.jpg";
import Categories from "./Categories";
import AboutUs from "./AboutUs";

const Home = () => {
  return (
    <>
      <section className="mt-2">
        <Carousel
          interval={1500}
          pause="hover"
          style={{
            borderRadius: "7px",
            overflow: "hidden",
          }}
        >
          <Carousel.Item>
            <img
              className="d-block w-100 object-fit-cover"
              style={{ maxHeight: "500px" }}
              src={img1}
              alt="First slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 object-fit-cover"
              style={{ maxHeight: "500px" }}
              src={img2}
              alt="Second slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 object-fit-cover"
              style={{ maxHeight: "500px" }}
              src={img3}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </section>

      <section className="mt-5">
        <Categories />
      </section>
      <section className="mt-5">
        <AboutUs />
      </section>
    </>
  );
};

export default Home;
