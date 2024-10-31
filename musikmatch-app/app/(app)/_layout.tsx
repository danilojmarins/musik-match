import { StyleSheet, Text, View } from 'react-native';
import { Redirect, Stack, Tabs } from 'expo-router';
import { useSession } from '@/context/SessionContext';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }


  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#333',
            tabBarInactiveTintColor: '#AAA',
            tabBarStyle: styles.tabBarStyle,
            headerShown: false,
            tabBarShowLabel: false
        }}
        sceneContainerStyle={{
            backgroundColor: '#DDD',
        }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: 'Buscar',
                tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={28} color={color} />,
            }}
        />

        <Tabs.Screen
            name="invites/index"
            options={{
                title: 'Convites',
                tabBarIcon: ({ color }) => <Ionicons name="mail-outline" size={28} color={color} />,
            }}
        />

        <Tabs.Screen
            name="user/index"
            options={{
                title: 'Usuário',
                tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={28} color={color} />,
            }}
        />
    </Tabs>

  );
}


const styles = StyleSheet.create({
    tabBarStyle: {
        height: 56
    },
    tabBarIconStyle: {
    }
});