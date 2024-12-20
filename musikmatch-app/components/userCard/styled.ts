import styled from "styled-components/native";

export const CardContainer = styled.View`
  padding: 12px 18px 8px 18px;
  background-color: #fff;
  width: 100%;
  margin: 4px 0;
  border-radius: 10px;
`;

export const UserInfoContainer = styled.View`
  display: flex;
  flex-flow: row nowrap;
  column-gap: 14px;
  align-items: start;
  position: relative;
`;

export const UserImage = styled.View``;

export const UserInfo = styled.View`
  position: relative;
  width: 100%;
`;

export const UserName = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 18px;
`;

export const UserLocation = styled.Text`
  color: ${(props) => props.theme.colors.text2};
  font-size: 14px;
`;

export const MusicianInstruments = styled.Text`
  color: #333;
  font-size: 14px;
  font-weight: 600;
  width: 80%;
  margin-top: 4px;
`;

export const UserBio = styled.Text`
  color: ${(props) => props.theme.colors.greyShade6};
  font-size: 14px;
  margin: 4px 0;
  text-align: justify;
  width: 80%;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: #ccc;
  margin: 4px 0;
`;

export const SendButton = styled.View`
  margin: auto;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;
