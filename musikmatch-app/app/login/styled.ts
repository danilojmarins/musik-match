import styled from "styled-components/native";

export const LoginContainer = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  flex: 1;
  align-items: center;
`;

export const AppTitleContainer = styled.View`
  margin: auto;
  position: relative;
  bottom: 25%;
`;

export const AppTitle1 = styled.Text`
  margin: auto;
  color: ${(props) => props.theme.colors.white};
  font-size: 72px;
  position: relative;
  right: 32px;
  font-family: ${(props) => props.theme.fonts.appTitle};
`;

export const AppTitle2 = styled.Text`
  margin: auto;
  color: ${(props) => props.theme.colors.white};
  font-size: 72px;
  position: relative;
  left: 32px;
  font-family: ${(props) => props.theme.fonts.appTitle};
`;

export const LoginFormContainer = styled.View`
  background-color: ${(props) => props.theme.colors.white};
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
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
