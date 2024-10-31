import { ExpandFilter, FilterContainer, FilterRowContainer } from "./styled";
import { StyleSheet, Text } from "react-native";
import Input from "../input";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SelectList } from "react-native-dropdown-select-list";
import { AxiosError } from "axios";
import { api } from "@/config/api";
import { Instrument } from "@/types/Instrument";
import { maxDistanceData } from "./utils";
import CustomButton from "../button";

interface FilterProps {
    filterAction: (
        genre: number | null,
        instrument: number | null,
        search: string,
        distance: number | null
    ) => void;
}

export default function Filter(props: FilterProps) {

    const { filterAction } = props;

    const [search, setSearch] = useState<string>('');
    
    const [genresData, setGenresData] = useState<{ key: number, value: string }[]>();
    const [genre, setGenre] = useState<number | null>(null);

    const [instrumentsData, setInsturmentsData] = useState<{ key: number, value: string }[]>();
    const [instrument, setInstrument] = useState<number | null>(null);

    const [maxDistance, setMaxDistance] = useState<number | null>(null);

    const [expand, setExpand] = useState<boolean>(false);

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

    useEffect(() => {
        getGenres();
        getInstruments();
    }, []);

    const clearFilters = () => {
        setSearch('');
        setInstrument(null);
        setGenre(null);
        setMaxDistance(null);
        setExpand(false);
    }

    return (
        <FilterContainer>
            <Input
                placeholder="Pesquisar"
                secure={false}
                value={search}
                iconPosition="right"
                onChangeText={setSearch}
                Icon={<Ionicons name="search-sharp" size={18} color='#999' />}
            />

            <FilterRowContainer>
                <SelectList
                    setSelected={(value: number) => setGenre(value)}
                    placeholder={!!genre ? genresData?.find(gen => gen.key === genre)?.value : "Gêneros"}
                    data={genresData || []}
                    maxHeight={180}
                    save="key"
                    boxStyles={styles.boxStyle}
                    inputStyles={!!genre ? styles.inputStyleSelected : styles.inputStylePlaceholder}
                    dropdownStyles={styles.dropdownStyle}
                    dropdownItemStyles={styles.dropdownItemStyle}
                    searchPlaceholder="Pesquisar"
                    dropdownShown={false}
                    
                />

                <SelectList
                    setSelected={(value: number) => setInstrument(value)}
                    placeholder={!!instrument ? instrumentsData?.find(ins => ins.key === instrument)?.value : "Instrumentos"}
                    data={instrumentsData || []}
                    maxHeight={180}
                    save="key"
                    boxStyles={styles.boxStyle}
                    inputStyles={!!instrument ? styles.inputStyleSelected : styles.inputStylePlaceholder}
                    dropdownStyles={styles.dropdownStyle}
                    dropdownItemStyles={styles.dropdownItemStyle}
                    searchPlaceholder="Pesquisar"
                />
            </FilterRowContainer>
            
            {expand && <FilterRowContainer>
                <SelectList
                    setSelected={(value: number) => setMaxDistance(value)}
                    placeholder={!!maxDistance ? maxDistanceData?.find(dist => dist.key === maxDistance)?.value : "Distância"}
                    data={maxDistanceData}
                    maxHeight={180}
                    save="key"
                    search={false}
                    boxStyles={styles.boxStyleFullWidth}
                    inputStyles={!!maxDistance ? styles.inputStyleSelected : styles.inputStylePlaceholder}
                    dropdownStyles={styles.dropdownStyle}
                    dropdownItemStyles={styles.dropdownItemStyle}
                    dropdownShown={false}
                />
            </FilterRowContainer>}

            {expand && <FilterRowContainer>
                <CustomButton
                    text="Limpar"
                    backgroundColor="#9FE2BF"
                    color="#FFF"
                    width="170px"
                    buttonAction={clearFilters}
                />

                <CustomButton
                    text="Filtrar"
                    backgroundColor="#00A36C"
                    color="#FFF"
                    width="170px"
                    buttonAction={() => filterAction(genre, instrument, search, maxDistance)}
                />
            </FilterRowContainer>}

            <ExpandFilter>
                <Ionicons
                    onPress={() => setExpand(!expand)}
                    name={expand ? "chevron-up" : "chevron-down"}
                    size={18}
                    color='#999'
                />
            </ExpandFilter>
            
        </FilterContainer>
    )
}

const styles = StyleSheet.create({
    boxStyle: {
        backgroundColor: '#EEE',
        borderWidth: 0,
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingVertical: 8,
        width: 170
    },
    boxStyleFullWidth: {
        backgroundColor: '#EEE',
        borderWidth: 0,
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingVertical: 8,
        width: '100%'
    },
    inputStylePlaceholder: {
        color: '#AAA'
    },
    inputStyleSelected: {
        color: '#333'
    },
    dropdownStyle: {
        overflow: 'scroll',
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 5,
    },
    dropdownItemStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
});