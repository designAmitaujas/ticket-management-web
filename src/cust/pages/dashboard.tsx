import { Card, Col, Container, Row } from "react-bootstrap";
import { useGetTicketCountQuery } from "../../generated/graphql";
import t1 from "../assets/t1.png";
import t2 from "../assets/t2.png";
import t3 from "../assets/t3.png";
const dashboard = () => {
  const { data } = useGetTicketCountQuery();

  return (
    <div>
      <Container className="py-5">
        <Row>
          <Col xs="12" sm="12" md="6" lg="4">
            <Card
              className="d-flex"
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ width: "30%" }}>
                <img src={t1} style={{ width: "85%", marginLeft: "0.5rem" }} />
              </div>
              <Card.Body style={{ width: "50%" }}>
                <Card.Text style={{ fontWeight: "bold", fontSize: "2rem" }}>
                  {data?.getTicketCount.totalTiketCount}
                </Card.Text>
                <Card.Text style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Total Tickets
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4">
            {/* <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="align-self-center">
                      <i className="icon-pencil primary font-large-2 float-left" />
                    </div>
                    <div className="media-body text-right">
                      <h3>{data?.getTicketCount.totalRunningCount}</h3>
                      <span>Running Ticket</span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <Card
              className="d-flex"
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ width: "30%" }}>
                <img src={t3} style={{ width: "85%", marginLeft: "0.5rem" }} />
              </div>
              <Card.Body style={{ width: "60%" }}>
                <Card.Text style={{ fontWeight: "bold", fontSize: "2rem" }}>
                  {data?.getTicketCount.totalRunningCount}
                </Card.Text>
                <Card.Text style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Running Tickets
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4">
            {/* <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="align-self-center">
                      <i className="icon-pencil primary font-large-2 float-left" />
                    </div>
                    <div className="media-body text-right">
                      <h3>{data?.getTicketCount.totalClosedCount}</h3>
                      <span>Closed Ticket</span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <Card
              className="d-flex"
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ width: "30%" }}>
                <img src={t2} style={{ width: "85%", marginLeft: "0.5rem" }} />
              </div>
              <Card.Body style={{ width: "60%" }}>
                <Card.Text style={{ fontWeight: "bold", fontSize: "2rem" }}>
                  {data?.getTicketCount.totalClosedCount}
                </Card.Text>
                <Card.Text style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Closed Tickets
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default dashboard;
