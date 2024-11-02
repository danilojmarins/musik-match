import styled from "styled-components/native";

export const InvitesContainer = styled.ScrollView``;

export const SelectInviteTab = styled.View`
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 4px;
`;

export const InviteTab = styled.View<{ $selected: boolean }>`
  width: 50%;
  padding: 48px 0 16px 0;
  border-bottom-width: 4px;
  border-bottom-color: ${(props) =>
    props.$selected ? props.theme.colors.text : "#FFF"};
`;

export const InviteTabTitle = styled.Text<{ $selected: boolean }>`
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  color: ${(props) =>
    props.$selected ? props.theme.colors.text : props.theme.colors.text2};
`;
