import React from "react";
import styled, { css } from "styled-components";
import { hoverColor, primary } from "@/lib/colors";

const Button = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.2s linear;

  svg {
    height: 16px;
  }

  ${(props) =>
    props.white &&
    props.size === "l" &&
    css`
      background-color: #fff;
      color: #000;
      outline: 1px solid white;
      font-size: 1.2rem;
      font-weight: 500;

      svg {
        margin-right: 5px;
        height: 20px;
      }

      &:hover {
        background-color: ${primary};
        color: white;
        outline: 1px solid white;
      }
    `}

  ${(props) =>
    props.primary &&
    css`
      background-color: ${primary};
      color: #fff;
      outline: 1px solid ${primary};
      padding: 10px 0;
      justify-content: center;

      svg {
        margin-right: 5px;
        height: 20px;
      }

      :hover {
        background-color: ${hoverColor};
        outline: 1px solid ${hoverColor};
      }
    `}

    ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default Button;
