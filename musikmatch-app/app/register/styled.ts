import styled from "styled-components/native";

export const RegisterContainer = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  flex: 1;
`;

export const AppTitleContainer = styled.View`
  margin: auto;
  position: relative;
  bottom: 30%;
`;

export const RegisterFormContainer = styled.View`
  background-color: ${(props) => props.theme.colors.white};
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60%;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

export const InputContainer = styled.View`
  flex-direction: column;
  margin: auto;
  align-items: center;
  justify-content: space-between;
  row-gap: 20px;
  width: 70%;
`;

export const ButtonContainer = styled.View`
  margin-top: 24px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`;

export const CopyrightText = styled.Text`
  text-align: center;
  margin-bottom: 8px;
  color: ${(props) => props.theme.colors.greyShade6};
  font-size: 11px;
`;
