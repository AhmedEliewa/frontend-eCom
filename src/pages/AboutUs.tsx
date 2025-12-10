import { Container, Row, Col, Button, Card } from "react-bootstrap";

const AboutUs = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-light text-center mt-3">
        <Container>
          <h1 className="fw-bold mb-3 text-primary">About Us</h1>
          <p className="text-muted fs-5">
            We create experiences, not just products.
          </p>
        </Container>
      </section>

      {/* Who We Are */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <h2 className="fw-semibold">Who We Are</h2>
              <p className="text-muted">
                We are a passionate team dedicated to delivering high-quality
                products that combine innovation, design, and performance. Our
                goal is to make your shopping experience simple, enjoyable, and
                inspiring.
              </p>
              <p className="text-muted">
                Every product we offer is carefully selected to meet the needs
                of modern lifestyles.
              </p>
            </Col>

            <Col md={6}>
              <div
                className="w-100 rounded"
                style={{
                  height: "300px",
                  background: "linear-gradient(135deg, #343a40, #6c757d)",
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center fw-semibold mb-5">Our Values</h2>
          <Row>
            <Col md={4} className="mb-3">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="text-center">
                  <h5 className="fw-bold">Quality</h5>
                  <p className="text-muted">
                    We never compromise on quality. Every detail matters.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-3">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="text-center">
                  <h5 className="fw-bold">Innovation</h5>
                  <p className="text-muted">
                    We embrace new ideas and push boundaries to stay ahead.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-3">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="text-center">
                  <h5 className="fw-bold">Trust</h5>
                  <p className="text-muted">
                    Transparency and trust are at the heart of everything we do.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-5 text-center">
        <Container>
          <h2 className="fw-semibold mb-3">Let’s Build Something Great</h2>
          <p className="text-muted mb-4">
            Join us on our journey and discover products designed for you.
          </p>
          <a href="tel:01020433005" className="btn btn-outline-primary">
            📞 Call Now
          </a>
        </Container>
      </section>
    </>
  );
};

export default AboutUs;
