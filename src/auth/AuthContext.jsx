import { createContext, useContext, useEffect, useState } from 'react';
import { me, logout as apiLogout, login as apiLogin, register as apiRegister } from '../api/auth';
import { getToken } from './tokenStore';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (!token) { setReady(true); return; }
        me().then(setUser).catch(() => setUser(null)).finally(() => setReady(true));
    }, []);

    const signIn = async (email, password, { remember = true } = {}) => {
        const u = await apiLogin(email, password, { remember });
        setUser(u);
        return u;
    };

    const signUp = async (payload, { remember = true } = {}) => {
        const u = await apiRegister(payload, { remember });
        setUser(u);
        return u;
    };

    const signOut = async () => {
        await apiLogout();
        setUser(null);
    };

    return (
        <AuthCtx.Provider value={{ user, setUser, ready, signIn, signUp, signOut }}>
            {children}
        </AuthCtx.Provider>
    );
}
