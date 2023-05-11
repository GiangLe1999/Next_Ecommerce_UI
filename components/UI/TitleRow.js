import React from "react";
import styled from "styled-components";
import Link from "next/link";

import { ShowAllIcon } from "./ProductImagesIcon";
import TitleStyle from "./Title";

const TitleRow = ({ title, href, showAll }) => {
  return (
    <StyledTitleRow>
      <Title>{title}</Title>
      {showAll && (
        <ShowAll href={href}>
          <ShowAllIcon /> Show all
        </ShowAll>
      )}
    </StyledTitleRow>
  );
};

const StyledTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #c9c3ff;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  ${TitleStyle}
`;

const ShowAll = styled(Link)`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  color: indigo;
  border: 1px solid #c9c3ff;
  border-radius: 5px;
  font-size: 0.9rem;

  svg {
    width: 17px;
    height: 17px;
  }

  &:hover {
    background-color: #5e55ab;
    color: white;
  }
`;

export default TitleRow;
