import Input from "@/components/input";
import { AppTitleContainer, ButtonContainer, CopyrightText, InputContainer, RegisterContainer, RegisterFormContainer } from "./styled";
import CustomButton from "@/components/button";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SelectList, MultipleSelectList } from "react-native-dropdown-select-list";
import { estadosSelectData, userTypeSelectData, bandTypeSelectData } from "./utils";
import axios, { AxiosError } from "axios";
import { AppTitle1, AppTitle2 } from "../styled";
import { api, apiAuth } from "@/config/api";
import { Instrument } from "@/types/Instrument";
import { Geocoding } from "@/types/Geocoding";
import { router, useGlobalSearchParams } from "expo-router";
import { UserResponse } from "@/types/UserResponse";

export default function userEdit() {

    const [editPhase, setEditPhase] = useState<number>(1);
    const [error, setError] = useState<string>();

    const [userType, setUserType] = useState<'BAND' | 'MUSICIAN'>();
    const [bandType, setBandType] = useState<'COVER' | 'AUTHORAL' | 'MIXED' | null>();
    const [name, setName] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [state, setState] = useState<string>();

    const [cidadesData, setCidadesData] = useState<{ key: string, value: string }[]>();
    const [city, setCity] = useState<string>();

    const [genresData, setGenresData] = useState<{ key: number, value: string }[]>();
    const [genres, setGenres] = useState<number[]>([]);

    const [instrumentsData, setInsturmentsData] = useState<{ key: number, value: string }[]>();
    const [instruments, setInstruments] = useState<number[]>([]);

    const [user, setUser] = useState<UserResponse | null>(null);

    const { id } = useGlobalSearchParams();

    const getUser = async () => {
        try {
            const userData = await apiAuth.get<UserResponse>(`/api/users/${id}`);
            setUserType(userData.data.role);
            setBandType(userData.data.type);
            setName(userData.data.name);
            setBio(userData.data.bio);
            setUser(userData.data);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.message);
            }
        }
    }

    useEffect(() => {
        getUser();
    }, [id]);

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
        setEditPhase(2);
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
        setEditPhase(3);
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
        setEditPhase(4);
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

        handleEdit();
    }



    const handlePreviousRegisterPhase = () => {
        switch (editPhase) {
            case 1: setError(''); router.navigate('/'); break;
            case 2: setError(''); setEditPhase(1); break;
            case 3: setError(''); setEditPhase(2); break;
            case 4: setError(''); setEditPhase(3); break;
        };
    }

    const handleNextRegisterPhase = () => {
        switch (editPhase) {
            case 1: handlePhase1FormSubmit(); break;
            case 2: handlePhase2FormSubmit(); break;
            case 3: handlePhase3FormSubmit(); break;
            case 4: handlePhase4FormSubmit(); break;
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

    const handleEdit = async () => {
        try {
            const geolocation = await axios.get<Geocoding[]>(
                `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},BR&limit=1&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`
            );
            const lat = geolocation.data[0].lat;
            const lon = geolocation.data[0].lon;

            const payload = userType === 'BAND' ? getBandPayload(lat, lon) : getMusicianPayload(lat, lon);
            const url = userType === 'BAND' ? '/api/bands/edit' : '/api/musicians/edit';
            await apiAuth.put<{ token: string }>(url, payload);
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
                    {editPhase === 1 && <Input
                        placeholder={userType === 'BAND' ? 'Nome da Banda' : 'Nome'}
                        secure={false}
                        iconPosition="none"
                        value={name}
                        onChangeText={setName}
                    />}

                    {editPhase === 1 && <Input
                        placeholder={'Bio'}
                        secure={false}
                        multiline={true}
                        iconPosition="none"
                        value={bio}
                        onChangeText={setBio}
                    />}

                    {editPhase === 2 && <SelectList
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

                    {editPhase === 2 && <SelectList
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
                        boxStyles={editPhase !== 3 ?  { display: "none" } : styles.boxStyle}
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
                        boxStyles={editPhase !== 4 ?  { display: "none" } : styles.boxStyle}
                        inputStyles={styles.inputStylePlaceholder}
                        dropdownStyles={styles.dropdownStyle}
                        dropdownItemStyles={styles.dropdownItemStyle}
                        label="Instrumentos"
                        searchPlaceholder="Pesquisar"
                        labelStyles={styles.labelStyle}
                    />

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
                            text={editPhase === 4 ? "Editar" : "Próximo"}
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