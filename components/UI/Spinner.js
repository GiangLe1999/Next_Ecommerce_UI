import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import css from "styled-jsx/css";

export default function Spinner({ fullWidth }) {
  return (
    <Wrapper fullWidth={fullWidth}>
      <ClipLoader color={"#555"} speedMultiplier={0.5} size={30} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${(props) =>
    props.fullWidth
      ? css`
          display: flex;
          justify-content: center;
        `
      : css``}
`;
