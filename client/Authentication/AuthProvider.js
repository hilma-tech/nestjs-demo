import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { getIpAddressAsync } from 'expo-network';
export const AuthContext = createContext(null);

const AuthProvider = ({ children , proxy }) => {
    const [storage, setStorage] = useState(null) // {user: , kls: , at: ,}

    useEffect(() => {
        (async () => {
            const [[, kl], [, klo], [, usr], [, AccessToken]] = await AsyncStorage.multiGet(['kl', 'klo', 'user', 'AccessToken']);
            setStorage({ user: JSON.parse(usr), at: AccessToken, kls: { kl, klo } });

            if (Platform.OS === "web") {
                const ip = await getIpAddressAsync();
                proxy = `${ip}:8080`;
            } else {
                const variables = require('../variables.js');
                proxy = variables.apiUrl;
            }
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

    const superAuthFetch = useCallback(async (input, init) => {
        let basicHeaders = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': storage.at, 'Cookie': createCookieString(storage) }
        if (init.headers) init.headers = { ...basicHeaders, ...init.headers }
        else init.headers = basicHeaders;
        const [data, error] = await superFetch(proxy + input, init);
        if (error && error.statusCode === 401 && logoutOnUnauthorized) logout();
        return [data, error];
    }, [logout, storage, proxy]);
    const isAuthenticated = useMemo(() => storage && !!storage.at, [storage]);

    const createCookieString = (cookieObject) => {
        const cookies = Object.entries(cookieObject).reduce((cookies, [key, value]) => {
            return `${cookies}${key}=${value}; `;
        }, '');
    
        return cookies.slice(0, cookies.length - 2);
    }
    
    const parseJSON = async (response) => {
        try {
            const json = await response.json();
            return { status: response.status, ok: response.ok, json };
        } catch (error) {
            if (response.status === 204) return { status: response.status, ok: response.ok, json: { ok: response.ok } };
            throw error;
        }
    },

    const superFetch = async(input, init = undefined)=> {
        try {
            const response = await fetch(input, init);
            const data = await parseJSON(response);
            if (data.ok) return [data.json, null];
            return [null, data.json];
        } catch (error) {
            return [null, { error: { message: "No response, check your network connectivity", statusCode: 500, name: "ERROR" } }];
        }
    }
    const value = useMemo(() => ({ ...storage, updateUserInfo, superAuthFetch, Login, Logout, isAuthenticated }), [storage, updateUserInfo, superAuthFetch, Login, Logout, isAuthenticated]);
    if (!storage) return null;
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
