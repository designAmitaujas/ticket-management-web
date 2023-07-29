import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  GetTicketBackAndForthByTiketIdQuery,
  useGetTicketBackAndForthByTiketIdLazyQuery,
} from "../../../generated/graphql";
import LayoutProvider from "../../component/LayoutProvider";

const parsedUrl = new URL(process.env.REACT_APP_API_URL!);

const ViewTicket = () => {
  const { id } = useParams<{ id?: string }>();
  const [allData, setAllData] =
    useState<
      GetTicketBackAndForthByTiketIdQuery["getTicketBackAndForthByTiketId"]
    >();
  const [getData] = useGetTicketBackAndForthByTiketIdLazyQuery();

  useEffect(() => {
    (async () => {
      if (id) {
        const data = await getData({ variables: { options: { id } } });
        if (data.data?.getTicketBackAndForthByTiketId) {
          setAllData(data.data.getTicketBackAndForthByTiketId);
        }
      }
    })();
  }, [id]);

  return (
    <LayoutProvider title={"Ticket Information"} isGoBack={true}>
      <Card>
        <Card.Header className="bg-white">
          <h6>Question : {allData?.ticket.question}</h6>
          <h6>Description : {allData?.ticket.description}</h6>
          <h6>
            File :
            {allData?.ticket.file ? (
              <span
                className={css`
                  &:hover {
                    cursor: pointer;
                  }
                `}
              >
                <a
                  href={`${parsedUrl.origin}/upload/${allData?.ticket.file}`}
                  target="_blank"
                ></a>
              </span>
            ) : (
              <>No File Provided</>
            )}
          </h6>
        </Card.Header>
      </Card>

      {allData?.ticketBackAndForth.map((item) => {
        return (
          <>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                  {item.file}
                </Card.Subtitle>
                <Card.Text>{item.questionReply}</Card.Text>
              </Card.Body>
            </Card>
          </>
        );
      })}
    </LayoutProvider>
  );
};

export default ViewTicket;
