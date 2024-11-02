import { InvitesContainer, InviteTab, InviteTabTitle, SelectInviteTab } from "./styled";
import { useEffect, useState } from "react";
import { InviteResponse } from "@/types/InviteResponse";
import { apiAuth } from "@/config/api";
import { AxiosError } from "axios";
import InviteUserCard from "@/components/inviteUserCard";

export default function Invites() {

    const [currentTab, setCurrentTab] = useState<'RECEIVED' | 'SENT'>('RECEIVED');

    const [receivedInvites, setReceivedInvites] = useState<InviteResponse[]>([]);
    const [sentInvites, setSentInvites] = useState<InviteResponse[]>([]);

    const getReceivedInvites = async () => {
        try {
            const invites = await apiAuth.get<InviteResponse[]>("/api/invites/received");
            setReceivedInvites(invites.data);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.message);
            }
        }
    }

    const getSentInvites = async () => {
        try {
            const invites = await apiAuth.get<InviteResponse[]>("/api/invites/sent");
            setSentInvites(invites.data);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.message);
            }
        }
    }

    useEffect(() => {
        getReceivedInvites();
        getSentInvites();
    }, []);

    return (
        <InvitesContainer>
            <SelectInviteTab>
                <InviteTab
                    $selected={currentTab === 'RECEIVED'}
                    onTouchStart={() => setCurrentTab('RECEIVED')}
                >
                    <InviteTabTitle
                        $selected={currentTab === 'RECEIVED'}
                    >
                        Recebidos
                    </InviteTabTitle>
                </InviteTab>

                <InviteTab
                    $selected={currentTab === 'SENT'}
                    onTouchStart={() => setCurrentTab('SENT')}
                >
                    <InviteTabTitle
                        $selected={currentTab === 'SENT'}
                    >
                        Enviados
                    </InviteTabTitle>
                </InviteTab>
            </SelectInviteTab>

            {currentTab === 'RECEIVED' && receivedInvites.map(invite => {
                return <InviteUserCard key={invite.id} invite={invite} />;
            })}

            {currentTab === 'SENT' && sentInvites.map(invite => {
                return <InviteUserCard key={invite.id} invite={invite} />;
            })}
        </InvitesContainer>
    )
}