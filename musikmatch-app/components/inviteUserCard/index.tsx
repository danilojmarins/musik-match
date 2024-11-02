import { Image } from "react-native";
import { CardContainer, MusicianInstruments, SentDate, UserBio, UserContact, UserImage, UserInfo, UserInfoContainer, UserLocation, UserName } from "./styled";
import { InviteResponse } from "@/types/InviteResponse";
import { router } from "expo-router";

interface InviteUserCardProps {
    invite: InviteResponse;
}

export default function InviteUserCard(props: InviteUserCardProps) {

    const { invite } = props;

    const nameSplit = invite.name.split(' ');
    const name = nameSplit[0];
    const surname = nameSplit[1] ? `+${nameSplit[1]}` : '';

    const userInstruments = invite.instruments?.map((instrument, index) => {
        return index === invite.instruments?.length! - 1 ? instrument : instrument + ' • ';
    });

    const sentAt = new Date(invite.sentAt);
    sentAt.setHours(sentAt.getHours() - 3);

    return (
        <CardContainer>
            <SentDate>{sentAt.toLocaleDateString()}</SentDate>
            <UserInfoContainer>
                <UserImage
                    onTouchStart={() => router.push({
                        pathname: '/userProfile/[id]',
                        params: { id: invite.id } 
                    })}
                >
                    <Image
                        style={{ width: 32, height: 32, borderRadius: 100 }}
                        source={{ uri: `https://ui-avatars.com/api/?name=${name}${surname}&background=random` }}
                    />
                </UserImage>
                <UserInfo>
                    <UserName
                        onPress={() => router.push({
                            pathname: '/userProfile/[id]',
                            params: { id: invite.id } 
                        })}
                    >
                        {invite.name}
                    </UserName>
                    <UserLocation>{invite.city} - {invite.state}</UserLocation>
                    <MusicianInstruments numberOfLines={1}>{userInstruments}</MusicianInstruments>
                    <UserBio numberOfLines={5}>{invite.message}</UserBio>
                    <UserContact numberOfLines={1}>E-mail: {invite.email}</UserContact>
                    <UserContact numberOfLines={1}>Contato: {invite.number}</UserContact>
                </UserInfo>
            </UserInfoContainer>
        </CardContainer>
    )
}