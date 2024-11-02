import styled from "styled-components/native";

export const UserPageContainer = styled.ScrollView`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 8px;
`;

export const UserHeaderContainer = styled.View`
  width: 100%;
  background-color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-bottom: 4px;
`;

export const UserBackgroundImage = styled.View`
  width: 100%;
  height: 144px;
  background-color: #bbb;
`;

export const UserProfileImage = styled.Image`
  width: 104px;
  height: 104px;
  border-radius: 100px;
  background-color: #00f;
  position: relative;
  bottom: 18%;
  left: 8%;
`;

export const UserName = styled.Text`
  font-size: 24px;
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;
  margin-left: 8%;
  position: relative;
  bottom: 13%;
`;

export const UserLocation = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.text3};
  margin-left: 8%;
  position: relative;
  bottom: 12%;
`;

export const UserAbout = styled.View`
  background-color: #fff;
  padding: 16px 32px;
  border-radius: 10px;
  margin: 4px 0;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;
  margin-bottom: 8px;
`;

export const SectionText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text4};
  text-align: justify;
`;

export const SectionTopic = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text4};
  text-align: justify;
`;
