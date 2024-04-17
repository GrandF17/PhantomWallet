import React, { ReactNode, MouseEvent, CSSProperties } from 'react';
import styled from 'styled-components';
import { WHITE, DARK_GRAY, LIGHT_GRAY } from 'utils/styles/colors';
import { hexToRGB } from 'utils/wallet/hooks';

type Props = {
  children: ReactNode;
  onClick?: () => Promise<any> | any;
  buttonStyles?: CSSProperties;
};

const DefaultBtn = ({ children, onClick, buttonStyles }: Props) => {
  const StyledButton = styled.button`
    cursor: pointer;
    width: 100%;
    color: ${WHITE};
    background-color: ${DARK_GRAY};
    padding: 15px 10px;
    font-weight: 600;
    outline: 0;
    border: 0;
    border-radius: 6px;
    user-select: none;
    &:hover {
      background-color: ${hexToRGB(LIGHT_GRAY, 0.9)};
    }
    &:focus-visible&:not(:hover) {
      background-color: ${hexToRGB(LIGHT_GRAY, 0.8)};
    }
    &:active {
      background-color: ${LIGHT_GRAY};
    }
  `;

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (onClick) {
      await onClick();
    }
  };

  return (
    <StyledButton onClick={handleClick} style={buttonStyles}>
      {children}
    </StyledButton>
  );
};

export default DefaultBtn;
