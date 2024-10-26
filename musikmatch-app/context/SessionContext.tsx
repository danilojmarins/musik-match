import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import { apiAuth } from '@/config/api';

const AuthContext = createContext<{
    signIn: (token: string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: (token: string) => {
                    apiAuth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    setSession('xxx');
                },
                signOut: () => {
                    apiAuth.defaults.headers.common['Authorization'] = '';
                    setSession(null);
                },
                session,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}