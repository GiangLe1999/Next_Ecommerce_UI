import React from "react";
import styled from "styled-components";

const Center = (props) => {
  return <StyledDiv>{props.children}</StyledDiv>;
};

const StyledDiv = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export default Center;
