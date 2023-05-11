import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { ButtonStyle } from "./Button";

const ButtonLink = (props) => {
  return <StyledLink {...props}></StyledLink>;
};

const StyledLink = styled(Link)`
  ${ButtonStyle}
`;

export default ButtonLink;
