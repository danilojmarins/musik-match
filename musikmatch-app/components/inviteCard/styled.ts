import styled from "styled-components/native";

export const InviteCardContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Content = styled.View`
  padding: 16px;
  width: 80%;
  background-color: #fff;
  border-radius: 5px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;
  margin-bottom: 18px;
`;

export const InputsContainer = styled.View`
  flex-flow: column nowrap;
  align-items: center;
  row-gap: 12px;
`;

export const ButtonsContainer = styled.View`
  margin-top: 24px;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  column-gap: 12px;
`;
