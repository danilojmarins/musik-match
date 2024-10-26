import Input from "@/components/input";
import { AppTitleContainer, ButtonContainer, CopyrightText, InputContainer, RegisterContainer, RegisterFormContainer } from "./styled";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/button";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SelectList, MultipleSelectList } from "react-native-dropdown-select-list";
import { estadosSelectData, userTypeSelectData, bandTypeSelectData } from "./utils";
import axios, { AxiosError } from "axios";
import { AppTitle1, AppTitle2 } from "../styled";
import { api } from "@/config/api";
import { Instrument } from "@/types/Instrument";
import { Geocoding } from "@/types/Geocoding";
import { router } from "expo-router";
import { useSession } from "@/context/SessionContext";

export default function Register() {

    const [registerPhase, setRegisterPhase] = useState<number>(0);
    const [error, setError] = useState<string>();

    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [userType, setUserType] = useState<'BAND' | 'MUSICIAN'>();
    const [bandType, setBandType] = useState<'COVER' | 'AUTHORAL' | 'MIXED'>();
    const [name, setName] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [state, setState] = useState<string>();

    const [cidadesData, setCidadesData] = useState<{ key: string, value: string }[]>();
    const [city, setCity] = useState<string>();

    const [genresData, setGenresData] = useState<{ key: number, value: string }[]>();
    const [genres, setGenres] = useState<number[]>([]);

    const [instrumentsData, setInsturmentsData] = useState<{ key: number, value: string }[]>();
    const [instruments, setInstruments] = useState<number[]>([]);

    const { signIn } = useSession();

    const toggleHidePassword = () => {
        setHidePassword(!hidePassword);
    }

    const getCidadesByEstado = async () => {
        try {
            const cidades = await axios.get<IBGECidadesResponse[]>(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
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
            const genres = await api.get<Genre[]>('/api/genres');
            const genresData = genres.data.map(genre => {
                return {
                    key: genre.id,
                    value: genre.name
                };
            });
            setGenresData(genresData);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.error('Erro ao buscar gêneros: ' + error.message);
            }
        }
    }

    const getInstruments = async () => {
        try {
            const instruments = await api.get<Instrument[]>('/api/instruments');
            const instrumentsData = instruments.data.map(instrument => {
                return {
                    key: instrument.id,
                    value: instrument.name
                };
            });
            setInsturmentsData(instrumentsData);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.error('Erro ao buscar instrumentos: ' + error.message);
            }
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
            { condition: name.length < 3, message: 'Nome deve ter pelo menos 3 caracteres.' },
            { condition: bio.length < 3, message: 'Bio deve ter pelo menos 3 caracteres.' },
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
            { condition: !state, message: 'Selecione um estado.' },
            { condition: !city, message: 'Selecione uma cidade.' }
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
            { condition: !genres.length, message: 'Selecione pelo menos 1 gênero.' }
        ]
        for (const error of errors) {
            if (error.condition) {
                setError(error.message);
                return;
            }
        }
        setError('');
        setRegisterPhase(4);
    }

    const handlePhase4FormSubmit = () => {
        const errors = [
            { condition: !instruments.length, message: 'Selecione pelo menos 1 instrumento.' }
        ]
        for (const error of errors) {
            if (error.condition) {
                setError(error.message);
                return;
            }
        }
        setError('');
        setRegisterPhase(5);
    }

    const handlePhase5FormSubmit = () => {
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

        handleRegistration();
    }

    const handlePreviousRegisterPhase = () => {
        switch (registerPhase) {
            case 0: setError(''); router.navigate('/'); break;
            case 1: setError(''); setRegisterPhase(0); break;
            case 2: setError(''); setRegisterPhase(1); break;
            case 3: setError(''); setRegisterPhase(2); break;
            case 4: setError(''); setRegisterPhase(3); break;
            case 5: setError(''); setRegisterPhase(4); break;
        };
    }

    const handleNextRegisterPhase = () => {
        switch (registerPhase) {
            case 0: handlePhase0FormSubmit(); break;
            case 1: handlePhase1FormSubmit(); break;
            case 2: handlePhase2FormSubmit(); break;
            case 3: handlePhase3FormSubmit(); break;
            case 4: handlePhase4FormSubmit(); break;
            case 5: handlePhase5FormSubmit(); break;
        };
    }

    useEffect(() => {
        setCity(undefined);
        getCidadesByEstado();
    }, [state]);

    useEffect(() => {
        getGenres();
        getInstruments();
    }, []);

    const getMusicianPayload = (lat: number, lon: number) => {
        const instrumentsArr = instruments.map(id => {
            return {
                id,
                proficiency: 5
            };
        });
        return {
            email,
            password,
            name,
            bio,
            state,
            city,
            lat,
            lon,
            instruments: instrumentsArr,
            genresIds: genres
        };
    }

    const getBandPayload = (lat: number, lon: number) => {
        return {
            email,
            password,
            name,
            bio,
            state,
            city,
            lat,
            lon,
            type: bandType,
            instrumentsIds: instruments,
            genresIds: genres
        };
    }

    const handleRegistration = async () => {
        try {
            // const geolocation = await axios.get<Geocoding[]>(
            //     `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},BR&limit=1&appid=`
            // );
            // const lat = geolocation.data[0].lat;
            // const lon = geolocation.data[0].lon;

            const lat = -10.0759167;
            const lon = -67.0526898;
            const payload = userType === 'BAND' ? getBandPayload(lat, lon) : getMusicianPayload(lat, lon);
            const url = userType === 'BAND' ? '/api/bands/register' : '/api/musicians/register';
            const register = await api.post<{ token: string }>(url, payload);
            signIn(register.data.token);
            router.replace('/');
        }
        catch (error) {
            if (error instanceof AxiosError) {
                if (error.status === 409) {
                    setError(error.response?.data.error);
                }
                else {
                    console.error(error.response?.data);
                }
            }
        }
    }

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
                        setSelected={(value: string) => setState(value)}
                        placeholder={!!state ? estadosSelectData.find(estadoData => estadoData.key === state)?.value : "Estado"}
                        search={false}
                        data={estadosSelectData}
                        maxHeight={128}
                        save="key"
                        boxStyles={styles.boxStyle}
                        inputStyles={!!state ? styles.inputStyleSelected : styles.inputStylePlaceholder}
                        dropdownStyles={styles.dropdownStyle}
                        dropdownItemStyles={styles.dropdownItemStyle}
                    />}

                    {registerPhase === 2 && <SelectList
                        setSelected={(value: string) => setCity(value)}
                        placeholder={!!city ? city : "Cidade"}
                        searchPlaceholder="Pesquisar"
                        search={true}
                        data={cidadesData || []}
                        maxHeight={128}
                        save="key"
                        boxStyles={styles.boxStyle}
                        inputStyles={!!city ? styles.inputStyleSelected : styles.inputStylePlaceholder}
                        dropdownStyles={styles.dropdownStyle}
                        dropdownItemStyles={styles.dropdownItemStyle}
                    />}

                    <MultipleSelectList
                        setSelected={(value: number[]) => setGenres(value)}
                        placeholder={userType === 'BAND' ? "Gênero(s) da banda" : "Qual gênero você busca?"}
                        data={genresData || []}
                        maxHeight={264}
                        save="key"
                        boxStyles={registerPhase !== 3 ?  { display: "none" } : styles.boxStyle}
                        inputStyles={styles.inputStylePlaceholder}
                        dropdownStyles={styles.dropdownStyle}
                        dropdownItemStyles={styles.dropdownItemStyle}
                        label="Gêneros"
                        searchPlaceholder="Pesquisar"
                        labelStyles={styles.labelStyle}
                    />

                    <MultipleSelectList
                        setSelected={(value: number[]) => setInstruments(value)}
                        placeholder={userType === 'BAND' ? "Quais músicos você busca?" : "Quais instrumentos você toca?"}
                        data={instrumentsData || []}
                        maxHeight={264}
                        save="key"
                        boxStyles={registerPhase !== 4 ?  { display: "none" } : styles.boxStyle}
                        inputStyles={styles.inputStylePlaceholder}
                        dropdownStyles={styles.dropdownStyle}
                        dropdownItemStyles={styles.dropdownItemStyle}
                        label="Instrumentos"
                        searchPlaceholder="Pesquisar"
                        labelStyles={styles.labelStyle}
                    />

                    {registerPhase === 5 && <Input
                        placeholder="E-mail"
                        secure={false}
                        iconPosition="none"
                        value={email}
                        onChangeText={setEmail}
                    />}

                    {registerPhase === 5 && <Input
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

                    {error && <Text style={{ color: '#FF0F0F', fontSize: 12 }}>{error}</Text>}

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
                            text={registerPhase === 5 ? "Cadastrar" : "Próximo"}
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
    },
    labelStyle: {
        minWidth: '100%',
    }
});