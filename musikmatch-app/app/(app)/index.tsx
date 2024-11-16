import Filter from "@/components/filter";
import { HomeContainer, UsersCardsContainer } from "./styled";
import { useEffect, useState } from "react";
import { UserResponse } from "@/types/UserResponse";
import { apiAuth } from "@/config/api";
import { AxiosError } from "axios";
import UserCard from "@/components/userCard";
import InviteCard from "@/components/inviteCard";
import { ActivityIndicator, View } from "react-native";

export default function Home() {

    const [usersData, setUsersData] = useState<UserResponse[]>([]);

    const [sendInviteVisible, setSendInviteVisible] = useState<boolean>(false);
    const [userToInvite, setUserToInvite] = useState<UserResponse | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getUsersData = async () => {
            try {
                setLoading(true);
                const users = await apiAuth.get<UserResponse[]>('/api/users');
                setUsersData(users.data);
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
        getUsersData();
    }, []);

    const filterUsers = async (
        genre: number | null,
        instrument: number | null,
        search: string,
        distance: number | null
    ) => {
        const genreParam = genre !== null ? `${genre}` : '';
        const instrumentParam = instrument !== null ? `${instrument}` : '';
        const distanceParam = distance !== null ? `${distance}` : '';
        const url = `/api/users?genre=${genreParam}&instrument=${instrumentParam}&search=${search}&distance=${distanceParam}`;
        try {
            setLoading(true);
            const users = await apiAuth.get<UserResponse[]>(url);
            setUsersData(users.data);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response);
            }
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <HomeContainer>
            <Filter filterAction={filterUsers} />

            {!loading &&
                <UsersCardsContainer>
                    {usersData && usersData.map(user => {
                        return (
                            <UserCard key={user.name} user={user} setInviteUser={setUserToInvite} setSendInviteVisible={setSendInviteVisible} />
                        );
                    })}
                </UsersCardsContainer>
            }

            {loading &&
                <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 400
                    }}
                >
                    <ActivityIndicator style={{ margin: 'auto' }} size={'large'} color={'#0000FF66'} />
                </View>
            }

            <InviteCard user={userToInvite} visible={sendInviteVisible} setVisible={setSendInviteVisible} />
        </HomeContainer>
    )
}