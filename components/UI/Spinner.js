import { PulseLoader } from "react-spinners";
import styled from "styled-components";
import css from "styled-jsx/css";

export default function Spinner({ fullwidth }) {
  return (
    <Wrapper fullwidth={fullwidth}>
      <PulseLoader color={"#555"} speedMultiplier={2} size={20} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${(props) =>
    props.fullwidth
      ? css`
          display: flex;
          justify-content: center;
        `
      : css``}
`;
