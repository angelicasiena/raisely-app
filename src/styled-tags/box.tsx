import styled from "styled-components";
import {
  compose,
  color,
  layout,
  space,
  BackgroundColorProps,
  LayoutProps,
  SpaceProps,
} from "styled-system";

export const Box = styled.div<BackgroundColorProps | LayoutProps | SpaceProps>(
  compose(color, layout, space)
);
