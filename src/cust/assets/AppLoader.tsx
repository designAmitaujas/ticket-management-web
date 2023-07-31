import { css } from "@emotion/css";
import animationData from "./animation_lkmo82cy.json";
//@ts-ignore
import Lottie from "react-lottie";

const loaderCss = css`
  min-height: 100vh;
  width: 100vw;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 20rem;
    width: 20rem;
  }
`;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};

const AppLoader = () => {
  return (
    <div className={loaderCss}>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default AppLoader;
