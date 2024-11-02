import { Image } from "react-native";
import { CardContainer, MusicianInstruments, SendButton, Separator, UserBio, UserImage, UserInfo, UserInfoContainer, UserLocation, UserName } from "./styled";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { UserResponse } from "@/types/UserResponse";
import { router } from "expo-router";

interface UserCardProps {
    user: UserResponse;
    setInviteUser: (user: UserResponse) => void;
    setSendInviteVisible: (visible: boolean) => void;
}

export default function UserCard(props: UserCardProps) {

    const { user, setInviteUser, setSendInviteVisible } = props;
    
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
                <UserImage
                    onTouchStart={() => router.push({
                        pathname: '/userProfile/[id]',
                        params: { id: user.id } 
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
                            params: { id: user.id } 
                        })}
                    >
                        {user.name}
                    </UserName>
                    <UserLocation>{user.city} - {user.state}</UserLocation>
                    <MusicianInstruments numberOfLines={1}>{userInstruments}</MusicianInstruments>
                    <UserBio numberOfLines={5}>{user.bio} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</UserBio>
                </UserInfo>
            </UserInfoContainer>

            <Separator></Separator>

            <SendButton onTouchEnd={() => { setInviteUser(user); setSendInviteVisible(true) }}>
                <MaterialCommunityIcons
                    name="email-send-outline"
                    size={24}
                    color="#555"
                />
            </SendButton>
        </CardContainer>
    )

}