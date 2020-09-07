import React from "react";
import styled from "styled-components";

const StyledLabel = styled.p`
  font-size: 18px;
`;

export const Label:React.FC = ({children}) => <StyledLabel>{children}</StyledLabel>;
