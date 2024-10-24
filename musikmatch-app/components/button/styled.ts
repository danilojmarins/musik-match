import styled from "styled-components/native";

export const CustomButtonStyle = styled.TouchableOpacity<{
  $backgroundColor: string;
  $width?: string;
}>`
  padding: 8px 8px;
  background-color: ${(props) => props.$backgroundColor};
  border-radius: 5px;
  width: ${(props) => (props.$width ? props.$width : "auto")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text<{ $textColor: string }>`
  color: ${(props) => props.$textColor};
  font-weight: 600;
  font-size: 16px;
`;
