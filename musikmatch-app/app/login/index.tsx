import CustomButton from "@/components/button";
import { AppTitle1, AppTitle2, AppTitleContainer, InputContainer, LoginContainer, LoginFormContainer } from "./styled";
import Input from "@/components/input";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";

export default function Login() {

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
                    />

                    <Input
                        placeholder="Senha"
                        secure={hidePassword}
                        iconPosition="right"
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

                    <CustomButton text="Entrar" backgroundColor="#00A36C" color="#FFF" />
                    <CustomButton text="Cadastrar" backgroundColor="#9FE2BF" color="#FFF" />
                </InputContainer>
            </LoginFormContainer>
        </LoginContainer>
    )
}