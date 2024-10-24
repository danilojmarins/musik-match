import Input from "@/components/input";
import { AppTitleContainer, ButtonContainer, CopyrightText, InputContainer, RegisterContainer, RegisterFormContainer } from "./styled";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/button";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { MultipleSelectList, SelectList } from "react-native-dropdown-select-list";
import { estadosSelectData, userTypeSelectData, bandTypeSelectData } from "./utils";
import axios, { AxiosError } from "axios";
import { AppTitle1, AppTitle2 } from "../login/styled";

export default function Register() {

    const [registerPhase, setRegisterPhase] = useState<number>(0);
    const [error, setError] = useState<string>();

    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [userType, setUserType] = useState<'BAND' | 'MUSICIAN'>();
    const [bandType, setBandType] = useState<'COVER' | 'AUTHORAL' | 'MIXED'>();
    const [name, setName] = useState<string>('');
    const [bio, setBio] = useState<string>();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [estado, setEstado] = useState<string>();
    const [cidadesData, setCidadesData] = useState<{ key: string, value: string }[]>();
    const [cidade, setCidade] = useState<string>();

    const toggleHidePassword = () => {
        setHidePassword(!hidePassword);
    }

    const getCidadesByEstado = async () => {
        try {
            const cidades = await axios.get<IBGECidadesResponse[]>(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
            );
            const cidadesData = cidades.data.map(cidade => {
                const cidadeData = {
                    key: cidade.nome,
                    value: cidade.nome
                };
                return cidadeData;
            });
            setCidadesData(cidadesData);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.error('Erro ao buscar cidades: ' + error.message);
            }
        }
    }

    const getGenres = async () => {
        try {
            
        }
        catch (error) {

        }
    }

    const handlePhase0FormSubmit = () => {
        const errors = [
            { condition: !userType, message: 'Informe um tipo de usuário.' },
            { condition: userType === 'BAND' && !bandType, message: 'Informe um tipo de banda.' }
        ]
        for (const error of errors) {
            if (error.condition) {
                setError(error.message);
                return;
            }
        }
        setError('');
        setRegisterPhase(1);
    }

    const handlePhase1FormSubmit = () => {
        const errors = [
            { condition: name.length < 3, message: 'Nome deve ter pelo menos 3 caracteres.' }
        ]
        for (const error of errors) {
            if (error.condition) {
                setError(error.message);
                return;
            }
        }
        setError('');
        setRegisterPhase(2);
    }

    const handlePhase2FormSubmit = () => {
        const errors = [
            { condition: !estado, message: 'Selecione um estado.' },
            { condition: !cidade, message: 'Selecione uma cidade.' }
        ]
        for (const error of errors) {
            if (error.condition) {
                setError(error.message);
                return;
            }
        }
        setError('');
        setRegisterPhase(3);
    }

    const handlePhase3FormSubmit = () => {
        const errors = [
            { condition: !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g), message: 'E-mail deve ser válido.' },
            { condition: password.length < 6, message: 'Senha deve ter pelo menos 6 caracteres.' }
        ]
        for (const error of errors) {
            if (error.condition) {
                setError(error.message);
                return;
            }
        }

    }

    const handlePreviousRegisterPhase = () => {
        switch (registerPhase) {
            case 0: setError(''); setRegisterPhase(0); break;
            case 1: setError(''); setRegisterPhase(0); break;
            case 2: setError(''); setRegisterPhase(1); break;
            case 3: setError(''); setRegisterPhase(2); break;
        };
    }

    const handleNextRegisterPhase = () => {
        switch (registerPhase) {
            case 0: handlePhase0FormSubmit(); break;
            case 1: handlePhase1FormSubmit(); break;
            case 2: handlePhase2FormSubmit(); break;
            case 3: handlePhase3FormSubmit(); break;
        };
    }

    useEffect(() => {
        setCidade(undefined);
        getCidadesByEstado();
    }, [estado]);

    return (
        <RegisterContainer>
            <AppTitleContainer>
                <AppTitle1>Musik</AppTitle1>
                <AppTitle2>Match</AppTitle2>
            </AppTitleContainer>

            <RegisterFormContainer>
                <InputContainer>
                    {registerPhase === 0 && <SelectList
                        setSelected={(value: 'BAND' | 'MUSICIAN') => setUserType(value)}
                        placeholder={!!userType ? userTypeSelectData.find(user => user.key === userType)?.value : "Músico ou Banda?"}
                        search={false}
                        data={userTypeSelectData}
                        maxHeight={72}
                        save="key"
                        boxStyles={styles.boxStyle}
                        inputStyles={!!userType ? styles.inputStyleSelected : styles.inputStylePlaceholder}
                        dropdownStyles={styles.dropdownStyle}
                        dropdownItemStyles={styles.dropdownItemStyle}
                    />}

                    {registerPhase === 0 && userType === 'BAND' && <SelectList
                        setSelected={(value: 'COVER' | 'AUTHORAL' | 'MIXED') => setBandType(value)}
                        placeholder={!!bandType ? bandTypeSelectData.find(band => band.key === bandType)?.value : "Tipo de Banda"}
                        search={false}
                        data={bandTypeSelectData}
                        maxHeight={72}
                        save="key"
                        boxStyles={styles.boxStyle}
                        inputStyles={!!bandType ? styles.inputStyleSelected : styles.inputStylePlaceholder}
                        dropdownStyles={styles.dropdownStyle}
                        dropdownItemStyles={styles.dropdownItemStyle}
                    />}

                    {registerPhase === 1 && <Input
                        placeholder={userType === 'BAND' ? 'Nome da Banda' : 'Nome'}
                        secure={false}
                        iconPosition="none"
                        value={name}
                        onChangeText={setName}
                    />}

                    {registerPhase === 1 && <Input
                        placeholder={'Bio'}
                        secure={false}
                        multiline={true}
                        iconPosition="none"
                        value={bio}
                        onChangeText={setBio}
                    />}

                    {registerPhase === 2 && <SelectList
                        setSelected={(value: string) => setEstado(value)}
                        placeholder={!!estado ? estadosSelectData.find(estadoData => estadoData.key === estado)?.value : "Estado"}
                        search={false}
                        data={estadosSelectData}
                        maxHeight={128}
                        save="key"
                        boxStyles={styles.boxStyle}
                        inputStyles={!!estado ? styles.inputStyleSelected : styles.inputStylePlaceholder}
                        dropdownStyles={styles.dropdownStyle}
                        dropdownItemStyles={styles.dropdownItemStyle}
                    />}

                    {registerPhase === 2 && <SelectList
                        setSelected={(value: string) => setCidade(value)}
                        placeholder={!!cidade ? cidade : "Cidade"}
                        search={true}
                        data={cidadesData || []}
                        maxHeight={128}
                        save="key"
                        boxStyles={styles.boxStyle}
                        inputStyles={!!cidade ? styles.inputStyleSelected : styles.inputStylePlaceholder}
                        dropdownStyles={styles.dropdownStyle}
                        dropdownItemStyles={styles.dropdownItemStyle}
                    />}

                    {registerPhase === 3 && <MultipleSelectList
                        setSelected={(value: string) => {}}
                        data={[]}
                    />}

                    {registerPhase === 4 && <Input
                        placeholder="E-mail"
                        secure={false}
                        iconPosition="none"
                        value={email}
                        onChangeText={setEmail}
                    />}

                    {registerPhase === 4 && <Input
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
                    />}

                    {error && <Text>{error}</Text>}

                    <ButtonContainer>
                        <CustomButton
                            buttonAction={handlePreviousRegisterPhase}
                            text="Voltar"
                            backgroundColor="#9FE2BF"
                            color="#FFF"
                            width="108px"
                        />

                        <Text style={{ fontWeight: 'bold' }}>ou</Text>

                        <CustomButton
                            buttonAction={handleNextRegisterPhase}
                            text={registerPhase === 3 ? "Cadastrar" : "Próximo"}
                            backgroundColor="#00A36C"
                            color="#FFF"
                            width="108px"
                        />
                    </ButtonContainer>
                </InputContainer>

                <CopyrightText>© 2024 MusikMatch - Todos os Direitos Reservados.</CopyrightText>
            </RegisterFormContainer>
        </RegisterContainer>
    )
}

const styles = StyleSheet.create({
    boxStyle: {
        backgroundColor: '#EEE',
        borderWidth: 0,
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingVertical: 8,
        width: '100%',
    },
    inputStylePlaceholder: {
        color: '#AAA'
    },
    inputStyleSelected: {
        color: '#333'
    },
    dropdownStyle: {
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 5,
    },
    dropdownItemStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    }
});