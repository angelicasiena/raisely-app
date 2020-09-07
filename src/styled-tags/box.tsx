import styled from "styled-components";
import { color, BackgroundColorProps } from "styled-system";

export const Box = styled.div<BackgroundColorProps>`
  ${color}
`;
