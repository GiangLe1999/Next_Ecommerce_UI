import React from "react";
import styled from "styled-components";

import { primary } from "@/lib/colors";
import css from "styled-jsx/css";

const Table = (props) => {
  return <StyledTable {...props}></StyledTable>;
};

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  th {
    text-align: left;
    text-transform: uppercase;
    color: ${primary};
    padding: 10px 0;
    border-bottom: 1px solid ${primary};
  }

  tr {
    ${(props) =>
      props.col === 3 &&
      css`
        display: grid;
        grid-template-columns: 2fr 2fr 1fr;

        @media screen (max-width: 768px) {
          grid-template-colums: 1fr 1fr 1fr;
        }
      `}
  }

  tr:not(:last-child) {
    border-bottom: 1px solid ${primary};
  }

  td {
    padding: 15px 0;
    display: flex;
    align-items: center;
    gap: 15px;
  }
`;

export default Table;
