import { Modal, Text, View } from "react-native";
import { ButtonsContainer, Content, InputsContainer, InviteCardContainer, Title } from "./styled";
import Input from "../input";
import { useState } from "react";
import CustomButton from "../button";
import { UserResponse } from "@/types/UserResponse";
import { apiAuth } from "@/config/api";
import { AxiosError } from "axios";

interface InviteCardProps {
    user: UserResponse | null;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export default function InviteCard(props: InviteCardProps) {

    const { user, visible, setVisible } = props;

    const [message, setMessage] = useState<string>("");
    const [number, setNumber] = useState<string>("");

    const [error, setError] = useState<string>("");

    const sendInvite = async () => {
        try {
            if (!validateInvite()) {
                return;
            }

            await apiAuth.post('/api/invites', {
                toUser: user?.id,
                message: message,
                number: number
            });

            setMessage("");
            setNumber("");
            setVisible(false);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.message);
            }
        }
    }

    const validateInvite = () => {
        const errors = [
            { condition: message.length < 3, message: "Mensagem deve ter mais de 3 caracterres." },
            { condition: number.length < 3, message: "Contato deve ter mais de 3 caracterres." },
        ];
        for (const error of errors) {
            if (error.condition) {
                setError(error.message);
                return false;
            }
        }
        setError("");
        return true;
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible && !!user}
        >
            <InviteCardContainer>
                <Content>
                    <Title>Enviar Convite</Title>

                    <InputsContainer>
                        <Input
                            placeholder={'Mensagem'}
                            secure={false}
                            multiline={true}
                            iconPosition="none"
                            value={message}
                            onChangeText={setMessage}
                        />

                        <Input
                            placeholder={'Contato'}
                            secure={false}
                            multiline={false}
                            iconPosition="none"
                            value={number}
                            onChangeText={setNumber}
                        />
                    </InputsContainer>

                    {error && <Text
                        style={{
                            fontSize: 12,
                            color: "#FF0F0F",
                            marginTop: 8,
                            paddingLeft: 4
                        }}
                    >
                        {error}
                    </Text>}

                    <ButtonsContainer>
                        <CustomButton
                            text="Cancelar"
                            backgroundColor="#9FE2BF"
                            color="#FFF"
                            width="45%"
                            buttonAction={() => {
                                setError("");
                                setMessage("");
                                setNumber("");
                                setVisible(false);
                            }}
                        />

                        <CustomButton
                            text="Enviar"
                            backgroundColor="#00A36C"
                            color="#FFF"
                            width="45%"
                            buttonAction={() => sendInvite()}
                        />
                    </ButtonsContainer>
                </Content>
            </InviteCardContainer>
        </Modal>
    )
}