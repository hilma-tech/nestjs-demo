import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import { AsyncStorage, Platform } from 'react-native';
import variables from '../variables';
export const AuthContext = createContext(null);

const AuthProvider = ({ children, proxy, logoutOnUnauthorized = false }) => {
    const [storage, setStorage] = useState(null) // {user: , kls: , at: ,}

    useEffect(() => {
        (async () => {
            const [[, kl], [, klo], [, usr], [, AccessToken]] = await AsyncStorage.multiGet(['kl', 'klo', 'user', 'AccessToken']);
            setStorage({ user: JSON.parse(usr), at: AccessToken, kls: { kl, klo } });
        })()
    }, []);

    const updateUserInfo = useCallback(async (body) => {
        try {
            setStorage(storage => {
                AsyncStorage.setItem('user', JSON.stringify({ ...storage.user, ...(body(storage.user)) }));
                return ({ ...storage, user: { ...storage.user, ...(body(storage.user)) } })
            });
        } catch (error) {
            console.log(error);
        }
    }, [AsyncStorage, storage]);

    const Logout = useCallback(() => {
        AsyncStorage.clear();
        setStorage({ user: null, kls: null, at: null })
        return;
    }, [AsyncStorage]);

    const createCookieString = (cookieObject) => {
        const cookies = Object.entries(cookieObject).reduce((cookies, [key, value]) => {
            return `${cookies}${key}=${value}; `;
        }, '');

        return cookies.slice(0, cookies.length - 2);
    }

    const superFetch = async (input, init = undefined) => {
        try {
            const response = await fetch(input, init);
            const data = await parseJSON(response);
            if (data.ok) return [data.json, null];
            return [null, data.json];
        } catch (error) {
            return [null, { error: { message: "No response, check your network connectivity", statusCode: 500, name: "ERROR" } }];
        }
    }

    const superAuthFetch = useCallback(async (input, init = {}) => {
        let basicHeaders = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${storage.at}`, 'Cookie': createCookieString(storage) }
        if (init.headers) init.headers = { ...basicHeaders, ...init.headers }
        else init.headers = basicHeaders;
        const [data, error] = await superFetch(variables.apiUrl + input, init);
        if (error && error.statusCode === 401 && logoutOnUnauthorized) Logout();
        return [data, error];
    }, [Logout, storage, variables]);

    const Login = useCallback(async ({ username, password }) => {
        const [response, error] = await superAuthFetch('/users/login', {
            method: "POST",
            body: JSON.stringify({ username, password })
        });
        if (error) return console.log(error);
        const { access_token: at, klo, ...usr } = response;
        const kls = { kl: "34g34oojfogerG", klo };
        await AsyncStorage.multiSet([['kl', kls.kl], ['klo', kls.klo], ['user', JSON.stringify({...usr, pet: {}})], ['AccessToken', at]]);
        setStorage({ user: {...usr, pet: {}}, kls: kls, at })
    }, [AsyncStorage, superAuthFetch]);

    const isAuthenticated = useMemo(() => storage && !!storage.at, [storage]);

    const parseJSON = async (response) => {
        try {
            const json = await response.json();
            return { status: response.status, ok: response.ok, json };
        } catch (error) {
            if (response.status === 204) return { status: response.status, ok: response.ok, json: { ok: response.ok } };
            throw error;
        }
    }

    const value = useMemo(() => ({ ...storage, updateUserInfo, superAuthFetch, Login, Logout, isAuthenticated }), [storage, updateUserInfo, superAuthFetch, Login, Logout, isAuthenticated]);
    if (!storage) return null;
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
