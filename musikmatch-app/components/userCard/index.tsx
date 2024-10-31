import { Image } from "react-native";
import { CardContainer, MusicianInstruments, SendButton, Separator, UserBio, UserImage, UserInfo, UserInfoContainer, UserLocation, UserName } from "./styled";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { UserResponse } from "@/types/UserResponse";

interface UserCardProps {
    user: UserResponse;
}

export default function UserCard(props: UserCardProps) {

    const { user } = props;
    
    const nameSplit = user.name.split(' ');
    const name = nameSplit[0];
    const surname = nameSplit[1] ? `+${nameSplit[1]}` : '';

    const userInstruments = user.role === 'MUSICIAN' ? user.musicianInstruments?.map((instrument, index) => {
        return index === user.musicianInstruments?.length! - 1 ? instrument.name : instrument.name + ' • ';
    }) : user.bandInstruments?.map((instrument, index) => {
        return index === user.bandInstruments?.length! - 1 ? instrument : instrument + ' • ';
    });

    return (
        <CardContainer>
            <UserInfoContainer>
                <UserImage>
                    <Image
                        style={{ width: 32, height: 32, borderRadius: 100 }}
                        source={{ uri: `https://ui-avatars.com/api/?name=${name}${surname}&background=random` }}
                    />
                </UserImage>
                <UserInfo>
                    <UserName>{user.name}</UserName>
                    <UserLocation>{user.city} - {user.state}</UserLocation>
                    <MusicianInstruments numberOfLines={1}>{userInstruments}</MusicianInstruments>
                    <UserBio>{user.bio}</UserBio>
                </UserInfo>
            </UserInfoContainer>

            <Separator></Separator>

            <SendButton>
                <MaterialCommunityIcons
                    name="email-send-outline"
                    size={24}
                    color="#555"
                />
            </SendButton>
        </CardContainer>
    )

}