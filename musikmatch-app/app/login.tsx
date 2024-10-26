import CustomButton from "@/components/button";
import { AppTitle1, AppTitle2, AppTitleContainer, ButtonContainer, CopyrightText, InputContainer, LoginContainer, LoginFormContainer } from "./styled";
import Input from "@/components/input";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { Text } from "react-native";
import { router } from "expo-router";
import { api } from "@/config/api";
import { AxiosError } from "axios";
import { useSession } from "@/context/SessionContext";

export default function Login() {

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [hidePassword, setHidePassword] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	const { signIn } = useSession();

    const toggleHidePassword = () => {
    	setHidePassword(!hidePassword);
    }

	const validateLogin = () => {
		const errors = [
			{ condition: !email, message: 'Informe um e-mail.' },
			{ condition: !password, message: 'Informe uma senha.' }
		];
		for (const error of errors) {
			if (error.condition) {
				setError(error.message);
				return false;
			}
		}
		return true;
	}

	const handleLogin = async () => {
		try {
			const response = await api.post<{ token: string }>('/api/auth/login', { email, password });
			const token = response.data.token;
			signIn(token);
            router.replace('/');
		}
		catch (error) {
			if (error instanceof AxiosError && error.status === 403) {
				setError('Não autorizado. E-mail ou senha incorretos.');
			}
		}
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

					{error && <Text style={{ color: '#FF0F0F', fontSize: 12 }}>{error}</Text>}

                    <ButtonContainer>
                        <CustomButton
                            text="Entrar"
                            backgroundColor="#00A36C"
                            color="#FFF"
                            width="108px"
                            buttonAction={() => {
								if (!validateLogin()) {
									return;
								}
								handleLogin()
							}}
                        />
                        <Text style={{ fontWeight: 'bold' }}>ou</Text>
                        <CustomButton
                            text="Cadastrar"
                            backgroundColor="#9FE2BF"
                            color="#FFF"
                            width="108px"
                            buttonAction={() => router.navigate('/register')}
                        />
                    </ButtonContainer>
                </InputContainer>

                <CopyrightText>© 2024 MusikMatch - Todos os Direitos Reservados.</CopyrightText>
            </LoginFormContainer>
        </LoginContainer>
    )
}