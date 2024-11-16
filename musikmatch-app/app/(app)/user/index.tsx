import { useSession } from "@/context/SessionContext";
import { SectionText, SectionTitle, SectionTopic, UserAbout, UserBackgroundImage, UserHeaderContainer, UserLocation, UserName, UserPageContainer, UserProfileImage } from "./styled";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { useEffect, useState } from "react";
import { UserResponse } from "@/types/UserResponse";
import { apiAuth } from "@/config/api";
import { AxiosError } from "axios";
import { ActivityIndicator, Text, View } from "react-native";
import { router } from "expo-router";

export default function User() {

    const { signOut } = useSession();

    const [user, setUser] = useState<UserResponse | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const getUser = async () => {
        try {
            setLoading(true);
            const userData = await apiAuth.get<UserResponse>("/api/users/loggedUser");
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
    }, []);

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
                <MaterialIcons
                    onPress={signOut}
                    name="logout"
                    size={24}
                    color="#555"
                    style={{ marginTop: 16 }}
                />
            </View>
        )
    }

    return (
        <UserPageContainer>
            <UserHeaderContainer>
                <UserBackgroundImage></UserBackgroundImage>
                <UserProfileImage
                    source={{ uri: `https://ui-avatars.com/api/?name=${name}${surname}&background=random&size=512` }}
                />

                <UserName>{user && user.name}</UserName>
                <UserLocation>{user && user.city} - {user && user.state}</UserLocation>

                <MaterialIcons
                    onPress={signOut}
                    name="logout"
                    size={24}
                    color="#555"
                    style={{ position: 'absolute', top: 165, right: 20 }}
                />

                <MaterialIcons
                    onPress={() => router.push({
                        pathname: '/userEdit/[id]',
                        params: { id: user.id } 
                    })}
                    name="edit"
                    size={24}
                    color="#555"
                    style={{ position: 'absolute', top: 165, right: 64 }}
                />
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
        </UserPageContainer>
    );
}