import { Col, Container, Row } from "react-bootstrap";
import { useGetTicketCountQuery } from "../../generated/graphql";

const dashboard = () => {
  const { data } = useGetTicketCountQuery();

  return (
    <div>
      <Container className="py-5">
        <Row>
          <Col xs="12" sm="12" md="6" lg="4">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="align-self-center">
                      <i className="icon-pencil primary font-large-2 float-left" />
                    </div>
                    <div className="media-body text-right">
                      <h3>{data?.getTicketCount.totalTiketCount}</h3>
                      <span>Get All Ticket</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4">
            <div className="card">
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
            </div>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4">
            <div className="card">
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
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default dashboard;
