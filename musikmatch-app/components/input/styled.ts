import styled from "styled-components/native";

export const InputContainer = styled.View`
  flex-direction: row;
  padding: 4px 16px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.greyShade1};
`;

export const InputElement = styled.TextInput`
  flex: 1;
  background-color: ${(props) => props.theme.colors.greyShade1};
  color: ${(props) => props.theme.colors.text};
`;

export const IconWrapper = styled.View`
  margin: auto;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;
