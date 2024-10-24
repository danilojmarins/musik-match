import CustomButton from "@/components/button";
import { AppTitle1, AppTitle2, AppTitleContainer, ButtonContainer, CopyrightText, InputContainer, LoginContainer, LoginFormContainer } from "./styled";
import Input from "@/components/input";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { Text } from "react-native";

export default function Login() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [hidePassword, setHidePassword] = useState<boolean>(true);

    const toggleHidePassword = () => {
        setHidePassword(!hidePassword);
    }

    return (
        <LoginContainer>
            <AppTitleContainer>
                <AppTitle1>Musik</AppTitle1>
                <AppTitle2>Match</AppTitle2>
            </AppTitleContainer>

            <LoginFormContainer>
                <InputContainer>
                    <Input
                        placeholder="E-mail"
                        secure={false}
                        iconPosition="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Input
                        placeholder="Senha"
                        secure={hidePassword}
                        iconPosition="right"
                        value={password}
                        onChangeText={setPassword}
                        Icon={
                            hidePassword ?
                            <Ionicons
                                name="eye-off-outline"
                                size={20}
                                color="#999"
                            />
                            :
                            <Ionicons
                                name="eye-outline"
                                size={20}
                                color="#999"
                            />
                        }
                        iconAction={toggleHidePassword}
                    />

                    <ButtonContainer>
                        <CustomButton
                            text="Entrar"
                            backgroundColor="#00A36C"
                            color="#FFF"
                            width="108px"
                            buttonAction={() => {}}
                        />
                        <Text style={{ fontWeight: 'bold' }}>ou</Text>
                        <CustomButton
                            text="Cadastrar"
                            backgroundColor="#9FE2BF"
                            color="#FFF"
                            width="108px"
                            buttonAction={() => {}}
                        />
                    </ButtonContainer>
                </InputContainer>

                <CopyrightText>© 2024 MusikMatch - Todos os Direitos Reservados.</CopyrightText>
            </LoginFormContainer>
        </LoginContainer>
    )
}