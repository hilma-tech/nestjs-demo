import React, { Children, useMemo, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import b from 'base-64';
import { AuthContext } from './AuthProvider'

const useHaveAccess = () => {
    const { isAuthenticated } = useContext(AuthContext);
    return useMemo(() => isAuthenticated, [isAuthenticated]);
};

const useKls = () => {
    const { kls } = useContext(AuthContext);
    return useMemo(() => kls, [kls]);
};

const useKlskDhp = () => {
    const kls = useKls();
    return useMemo(() => {
        try {
            const klsk = JSON.parse(b.decode(kls.klo));
            return { klsk: klsk.a, dhp: klsk.b };
        } catch (err) {
            return { klsk: [], dhp: null };
        }
    }, [kls]);
};

const PrivateScreen = () => null;
const MultipleScreen = () => null;
const HomeScreen = () => null;
const PublicOnlyScreen = () => null;

const createPrivateNavigator = () => {
    const Stack = createStackNavigator();

    const createHomeScreen = ({ comps, component, ...rest }, index, dhp, haveAccess) => {
        const HomeComponent = (dhp !== null && comps[dhp] && haveAccess) ? comps[dhp] : component;
        return <Stack.Screen key={index} component={HomeComponent} {...rest} />;
    }


    const createPublicOnlyScreen = ({ compName, component: Component, defaultRedirectComp: Drc, ...rest }, index, klsk, haveAccess) => {
        if (haveAccess) return (
            <Stack.Screen key={index} {...rest}>
                {props => {
                    if (klsk.indexOf(compName) == -1 || !haveAccess) {
                        if (Drc) return <Drc {...props} />;
                        return null;
                    }
                    return <Component {...props} />
                }}
            </Stack.Screen>
        );

        return <Stack.Screen key={index} component={Component} {...rest} />;
    }


    const Navigator = ({ children, ...rest }) => {
        const { klsk, dhp } = useKlskDhp();
        const haveAccess = useHaveAccess();

        return (
            <Stack.Navigator {...rest}>
                {Children.map(children, (child, index) => {
                    switch (child.type) {
                        case PrivateScreen:
                            return createPrivateScreen(child.props, index, klsk, haveAccess);

                        case MultipleScreen:
                            return createMultipleScreen(child.props, index, klsk, haveAccess);

                        case HomeScreen:
                            return createHomeScreen(child.props, index, dhp, haveAccess);

                        case PublicOnlyScreen:
                            return createPublicOnlyScreen(child.props, index, klsk, haveAccess);

                        case Stack.Screen:
                            const { props } = child;
                            return <Stack.Screen key={index} {...props} />;

                        case null:
                            return null;

                        default:
                            throw new Error("Navigator must have Screen, PrivateScreen, MultipleScreen, HomeScreen or PublicOnlyScreen components as its direct children");
                    }
                })}
            </Stack.Navigator>
        );
    }

    const PrivateStack = { Navigator, Screen: Stack.Screen, HomeScreen, PublicOnlyScreen};

    return PrivateStack;
}

export default createPrivateNavigator;