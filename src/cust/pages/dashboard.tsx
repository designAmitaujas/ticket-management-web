import { Card, Col, Container, Row } from "react-bootstrap";
import {
  useGetAdminTicketCountQuery,
  useGetTicketCountQuery,
} from "../../generated/graphql";

import { useAppStore } from "../../store";
import t1 from "../assets/t1.png";
import t2 from "../assets/t2.png";
import t3 from "../assets/t3.png";

const AdminDashbord = () => {
  const { data } = useGetAdminTicketCountQuery();

  return (
    <>
      <Container className="py-5 pb-3">
        <h4>Admin Stats</h4>
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
                  {data?.getAdminTicketCount.totalTiketCount}
                </Card.Text>
                <Card.Text style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Total Tickets
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
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
                <img src={t3} style={{ width: "85%", marginLeft: "0.5rem" }} />
              </div>
              <Card.Body style={{ width: "60%" }}>
                <Card.Text style={{ fontWeight: "bold", fontSize: "2rem" }}>
                  {data?.getAdminTicketCount.totalRunningCount}
                </Card.Text>
                <Card.Text style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Running Tickets
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
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
                <img src={t2} style={{ width: "85%", marginLeft: "0.5rem" }} />
              </div>
              <Card.Body style={{ width: "60%" }}>
                <Card.Text style={{ fontWeight: "bold", fontSize: "2rem" }}>
                  {data?.getAdminTicketCount.totalClosedCount}
                </Card.Text>
                <Card.Text style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Closed Tickets
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
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
                <img src={t2} style={{ width: "85%", marginLeft: "0.5rem" }} />
              </div>
              <Card.Body style={{ width: "60%" }}>
                <Card.Text style={{ fontWeight: "bold", fontSize: "2rem" }}>
                  {data?.getAdminTicketCount.notAcceptedCount}
                </Card.Text>
                <Card.Text style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Pending Tickets
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const dashboard = () => {
  const { data } = useGetTicketCountQuery();

  const {
    custObje: { isManaging },
  } = useAppStore();

  return (
    <div>
      {isManaging === true && <AdminDashbord />}

      <Container className="pb-5">
        <h4>User Stats</h4>
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
