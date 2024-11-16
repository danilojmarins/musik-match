import { SectionText, SectionTitle, SectionTopic, SendInviteContainer, SendInviteText, UserAbout, UserBackgroundImage, UserHeaderContainer, UserLocation, UserName, UserPageContainer, UserProfileImage } from "./styled";
import { useEffect, useState } from "react";
import { UserResponse } from "@/types/UserResponse";
import { apiAuth } from "@/config/api";
import { AxiosError } from "axios";
import { ActivityIndicator, Text, View } from "react-native";
import { router, useGlobalSearchParams } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import InviteCard from "@/components/inviteCard";

export default function UserProfile() {

    const { id } = useGlobalSearchParams();

    const [user, setUser] = useState<UserResponse | null>(null);
    const [sentInviteVisible, setSentInviteVisible] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const getUser = async () => {
        try {
            setLoading(true);
            const userData = await apiAuth.get<UserResponse>(`/api/users/${id}`);
            setUser(userData.data);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.message);
            }
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser();
    }, [id]);

    const nameSplit = user && user.name ? user.name.split(' ') : ['', ''];
    const name = nameSplit[0];
    const surname = nameSplit[1] ? `+${nameSplit[1]}` : '';

    const instruments =
        user && user.role === 'MUSICIAN' ? user.musicianInstruments?.map(instrument => instrument.name) :
        user && user.role === 'BAND' ? user.bandInstruments?.map(instrument => instrument) : []
    ;

    if (loading) {
        return (
            <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ActivityIndicator style={{ margin: 'auto' }} size={'large'} color={'#0000FF66'} />
            </View>
        )
    }

    if (!user) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Usuário não encontrado.</Text>
            </View>
        )
    }

    return (
        <UserPageContainer>
            <UserHeaderContainer>
                <UserBackgroundImage>
                    <Ionicons
                        name="arrow-back-outline"
                        size={32}
                        color="#333"
                        style={{ position: 'relative', top: 36, left: 8 }}
                        onPress={() => router.back()}
                    />
                </UserBackgroundImage>
                <UserProfileImage
                    source={{ uri: `https://ui-avatars.com/api/?name=${name}${surname}&background=random&size=512` }}
                />

                <UserName>{user && user.name}</UserName>
                <UserLocation>{user && user.city} - {user && user.state}</UserLocation>

                <SendInviteContainer
                    onTouchEnd={() => setSentInviteVisible(true)}
                >
                    <MaterialCommunityIcons
                        name="email-send-outline"
                        size={24}
                        color="#999"
                    />
                    <SendInviteText>Enviar Convite</SendInviteText>
                </SendInviteContainer>
            </UserHeaderContainer>

            <UserAbout>
                <SectionTitle>Sobre</SectionTitle>
                <SectionText>{user && user.bio}</SectionText>
            </UserAbout>

            <UserAbout>
                <SectionTitle>{user && user.role === 'BAND' ? 'Procurando' : 'Sabe Tocar'}</SectionTitle>
                {instruments && instruments.map(instrument => {
                    return <SectionTopic key={instrument}>• {instrument}</SectionTopic>;
                })}
            </UserAbout>

            <UserAbout>
                <SectionTitle>Gêneros</SectionTitle>
                {user && user.genres.map(genre => {
                    return <SectionTopic key={genre}>• {genre}</SectionTopic>;
                })}
            </UserAbout>

            <InviteCard
                user={user}
                visible={sentInviteVisible}
                setVisible={setSentInviteVisible}
            />
        </UserPageContainer>
    );
}