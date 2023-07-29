import { Col, Row } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container-fluid">
        <Row>
          <Col sm={6}>
            {currentYear} &copy; Developed by{" "}
            <a href="https://amitaujas.com" target="_blank" rel="noreferrer">
              Amitaujas LLP
            </a>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
