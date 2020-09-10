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

type DisabledProps = {
  disabled: boolean;
};

export const Button = styled.button<
  BackgroundColorProps | BorderProps | SpaceProps
>(
  {
    cusrsor: "pointer",
    width: "100%",
    padding: "10px",
    borderStyle: "none",
  },
  compose(border, color, space)
);

export const SubmitButton = styled(Button)<DisabledProps>`
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
  background: ${props => props.disabled? '#D3D3D3' : '#2196F3'};
  color: ${props => props.disabled? '#A9A9A9' : '#FFFFFF'};
`;
