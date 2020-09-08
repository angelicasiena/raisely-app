import styled from "styled-components";
import {
  border,
  compose,
  color,
  space,
  BackgroundColorProps,
  BorderProps,
  SpaceProps,
} from "styled-system";

export const Button = styled.button<
  BackgroundColorProps | BorderProps | SpaceProps
>(
  {
    width: "100%",
    padding: "10px",
    borderStyle: "none",
  },
  compose(border, color, space)
);
