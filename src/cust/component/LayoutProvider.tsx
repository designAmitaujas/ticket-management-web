import { css } from "@emotion/css";
import FeatherIcon from "feather-icons-react";
import _ from "lodash";
import React, { FC } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const LayoutProvider: FC<{
  title: string;
  isAddButton?: boolean;
  isGoBack?: boolean;
  CustButton?: React.FunctionComponent<any>;
  CustomButtonV2?: React.FunctionComponent<any>;
  isMulti?: boolean;
}> = ({
  children,
  title,
  isAddButton,
  isGoBack,
  CustButton,
  CustomButtonV2,
  isMulti,
}) => {
  const { push, goBack } = useHistory();

  const handleClick = () => {
    push("?action=add");
  };

  const handleGoBack = () => {
    goBack();
  };

  return (
    <>
      <Card className="mt-3">
        <Card.Body
          className="p-2"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Card.Title>
            {isGoBack ? (
              <span
                onClick={handleGoBack}
                className={css`
                  margin-right: 0.2rem;
                  :hover {
                    cursor: pointer;
                  }
                `}
              >
                <FeatherIcon icon="arrow-left" size="20" />
              </span>
            ) : (
              <></>
            )}{" "}
            {_.capitalize(title)}
          </Card.Title>
          {isAddButton ? (
            <Button onClick={handleClick}>ADD</Button>
          ) : isMulti === true && CustButton && CustomButtonV2 ? (
            <>
              <div className="d-flex gap-2">
                <CustButton />
                <CustomButtonV2 />
              </div>
            </>
          ) : CustButton ? (
            <CustButton />
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
      <Card className="mt-3">
        <Card.Body>{children}</Card.Body>
      </Card>
    </>
  );
};

export default LayoutProvider;
