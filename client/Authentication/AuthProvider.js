import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [storage, setStorage] = useState(null) // {user: , kls: , at: ,}

    useEffect(() => {
        (async () => {
            const [[, kl], [, klo], [, usr], [, AccessToken]] = await AsyncStorage.multiGet(['kl', 'klo', 'user', 'AccessToken']);
            setStorage({ user: JSON.parse(usr), at: AccessToken, kls: { kl, klo } });
        })()
    }, []);
    useEffect(() => {
        console.log("userstoagre", storage && storage.user)
    }, [storage]);

    const updateUserInfo = useCallback(async (body) => {
        try {
            setStorage(storage => {
                AsyncStorage.setItem('user', JSON.stringify( { ...storage.user, ...(body(storage.user)) }));
                return ({ ...storage, user: { ...storage.user, ...(body(storage.user)) } })
            });
        } catch (error) {
            console.log(error);
        }
    }, [AsyncStorage, storage]);

    const Login = useCallback(async (role) => {
        let kls, usr, at;
        if (role === "user") {
            kls = { kl: "34g34oojfogerG", klo: "eyJhIjogWyJTaG9wIl0sICJiIjogIlVzZXJNYWluIn0=" };
            usr = { name: "Yona", gender: "male", money: 100, pet: { name: "Doggo", image: "https://www.howrse.co.il/media/equideo/image/chevaux/special/300/adulte/mustang.png" } }
            at = "123456789";

        } else if (role === "admin") {
            kls = { kl: "45g45efe", klo: "eyJhIjogWyJBZG1pblNob3AiXSwgImIiOiAiQWRtaW5NYWluIn0=" };
            usr = { name: "Sam", welcomingSentence: "היי סאם ברוך בואך" }
            at = "987654321";
        }

        await AsyncStorage.multiSet([['kl', kls.kl], ['klo', kls.klo], ['user', JSON.stringify(usr)], ['AccessToken', at]]);
        setStorage({ user: usr, kls: kls, at })
    }, [AsyncStorage]);

    const Logout = useCallback(() => {
        AsyncStorage.clear();
        setStorage({ user: null, kls: null, at: null })
        return;
    }, [AsyncStorage]);

    const isAuthenticated = useMemo(() => storage && !!storage.at, [storage]);

    const value = useMemo(() => ({ ...storage, updateUserInfo, Login, Logout, isAuthenticated }), [storage, updateUserInfo, Login, Logout, isAuthenticated]);
    if (!storage) return null;
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;