import React from "react";
import styled from "styled-components";

import { primary } from "@/lib/colors";

const TextArea = (props) => {
  return <StyledTextArea {...props}></StyledTextArea>;
};

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:focus,
  &:active {
    outline: 1px solid transparent;
    border: 1px solid ${primary};
  }
`;

export default TextArea;
