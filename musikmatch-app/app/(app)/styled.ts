import styled from "styled-components/native";

export const HomeContainer = styled.View``;

export const UsersCardsContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    rowGap: 8,
  },
}))``;
