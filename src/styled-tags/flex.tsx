import styled from "styled-components";
import {
  compose,
  color,
  flexbox,
  space,
  BackgroundColorProps,
  FlexboxProps,
  SpaceProps,
} from "styled-system";

export const Flex = styled.div<
  BackgroundColorProps | FlexboxProps | SpaceProps
>(
  {
    display: "flex",
    flexDirection: "column",
  },
  compose(color, flexbox, space)
);
