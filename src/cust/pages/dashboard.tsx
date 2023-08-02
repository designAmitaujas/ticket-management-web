import { Card, Col, Container, Row } from "react-bootstrap";
import {
  useGetAdminTicketCountQuery,
  useGetTicketCountQuery,
} from "../../generated/graphql";
import { useAppStore } from "../../store";

const AdminDashbord = () => {
  const { data } = useGetAdminTicketCountQuery();

  return (
    <>
      <Container className="py-5 ">
        <h4>Admin Stats</h4>
        <Row>
          <Col>
            <Card
              className="d-flex"
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card.Body>
                <Card.Text style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  Total Tickets
                </Card.Text>
                <Card.Text style={{ fontWeight: "bold", fontSize: "2rem" }}>
                  {data?.getAdminTicketCount.totalTiketCount}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              className="d-flex"
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card.Body>
                <Card.Text style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  Running Tickets
                </Card.Text>
                <Card.Text style={{ fontWeight: "bold", fontSize: "2rem" }}>
                  {data?.getAdminTicketCount.totalRunningCount}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              className="d-flex"
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card.Body>
                <Card.Text style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  Closed Tickets
                </Card.Text>
                <Card.Text style={{ fontWeight: "bold", fontSize: "2rem" }}>
                  {data?.getAdminTicketCount.totalClosedCount}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              className="d-flex"
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card.Body>
                <Card.Text style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  Pending Tickets
                </Card.Text>
                <Card.Text style={{ fontWeight: "bold", fontSize: "2rem" }}>
                  {data?.getAdminTicketCount.notAcceptedCount}
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
              <Card.Body>
                <Card.Text style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  Total Tickets
                </Card.Text>
                <Card.Text style={{ fontWeight: "bold", fontSize: "2rem" }}>
                  {data?.getTicketCount.totalTiketCount}
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
              <Card.Body>
                <Card.Text style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  Running Tickets
                </Card.Text>
                <Card.Text style={{ fontWeight: "bold", fontSize: "2rem" }}>
                  {data?.getTicketCount.totalRunningCount}
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
              <Card.Body>
                <Card.Text style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  Closed Tickets
                </Card.Text>
                <Card.Text style={{ fontWeight: "bold", fontSize: "2rem" }}>
                  {data?.getTicketCount.totalClosedCount}
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
