import { useSession } from "@/context/SessionContext";
import { Button, Text, View } from "react-native";

export default function User() {

    const { signOut } = useSession();

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: 'center'
            }}
        >
            <Button title="Sair" onPress={signOut} />
        </View>
    );
}