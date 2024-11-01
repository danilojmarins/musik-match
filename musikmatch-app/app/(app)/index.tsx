import Filter from "@/components/filter";
import { HomeContainer, UsersCardsContainer } from "./styled";
import { useEffect, useState } from "react";
import { UserResponse } from "@/types/UserResponse";
import { apiAuth } from "@/config/api";
import { AxiosError } from "axios";
import UserCard from "@/components/userCard";
import InviteCard from "@/components/inviteCard";

export default function Home() {

    const [usersData, setUsersData] = useState<UserResponse[]>([]);

    const [sendInviteVisible, setSendInviteVisible] = useState<boolean>(false);
    const [userToInvite, setUserToInvite] = useState<UserResponse | null>(null);

    useEffect(() => {
        const getUsersData = async () => {
            try {
                const users = await apiAuth.get<UserResponse[]>('/api/users');
                setUsersData(users.data);
            }
            catch (error) {
                if (error instanceof AxiosError) {
                    console.error(error.message);
                }
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
            const users = await apiAuth.get<UserResponse[]>(url);
            setUsersData(users.data);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response);
            }
        }
    }

    return (
        <HomeContainer>
            <Filter filterAction={filterUsers} />

            <UsersCardsContainer>
                {usersData && usersData.map(user => {
                    return (
                        <UserCard key={user.name} user={user} setInviteUser={setUserToInvite} setSendInviteVisible={setSendInviteVisible} />
                    );
                })}
            </UsersCardsContainer>

            <InviteCard user={userToInvite} visible={sendInviteVisible} setVisible={setSendInviteVisible} />
        </HomeContainer>
    )
}