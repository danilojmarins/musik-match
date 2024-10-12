import styled from "styled-components/native";

export const CustomButtonStyle = styled.TouchableOpacity<{
  $backgroundColor: string;
}>`
  padding: 8px 24px;
  background-color: ${(props) => props.$backgroundColor};
  border-radius: 5px;
`;

export const ButtonText = styled.Text<{ $textColor: string }>`
  color: ${(props) => props.$textColor};
  font-weight: 600;
  font-size: 16px;
`;
