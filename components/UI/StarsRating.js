import React, { useState } from "react";
import styled from "styled-components";
import css from "styled-jsx/css";

import { DefaultStarIcon, SolidStarIcon } from "../Layout/ButtonIcon";

const StarsRating = ({
  defaultHowMany = 0,
  showRatingsText,
  disabled,
  onChange = () => {},
  size = "md",
}) => {
  const [howMany, setHowMany] = useState(defaultHowMany);
  const [hoverIndex, setHoverIndex] = useState(0);

  const five = [1, 2, 3, 4, 5];

  const starClickHandler = (n) => {
    if (disabled === "yes") {
      return;
    }
    setHowMany(n);
    onChange(n);
    showRatingsText(true);
  };

  const starHoverHandler = (n) => {
    if (disabled === "yes") {
      return;
    }
    setHoverIndex(n);
    setHowMany(0);
  };

  return (
    <StarsWrapper>
      {five.map((n) => (
        <StarWrapper
          disabled={disabled}
          key={n}
          onClick={() => starClickHandler(n)}
          onMouseOver={() => starHoverHandler(n)}
          size={size}
        >
          {howMany >= n || hoverIndex >= n ? (
            <SolidStarIcon />
          ) : (
            <DefaultStarIcon />
          )}
        </StarWrapper>
      ))}
    </StarsWrapper>
  );
};

const StarsWrapper = styled.div`
  display: flex;
  gap: 1px;
  align-items: center;
`;

const StarWrapper = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  display: flex;
  align-items: center;

  cursor: pointer;
  transition: all 0.2s linear;
  position: relative;
  top: -2px;

  ${(props) =>
    props.disabled === "yes" &&
    css`
      cursor: unset;
    `}

  ${(props) =>
    props.size === "md" &&
    css`
      height: 1.2rem;
      width: 1.2rem;
    `}

      ${(props) =>
    props.size === "sm" &&
    css`
      height: 0.9rem;
      width: 0.9rem;
    `}

  svg {
    color: #d00000;
    width: 100%;
    height: 100%;
  }
`;

export default StarsRating;
