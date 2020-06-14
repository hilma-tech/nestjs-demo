
import React from 'react';
import { createPrivateNavigator } from '../Authentication';
import AdminInfo from './AdminInfo';
import AdminShop from './AdminShop';

const RootStack = createPrivateNavigator();
const UserMain = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen name="AdminInfo" component={AdminInfo} />
            <RootStack.Screen name="AdminShop" component={AdminShop} />
        </RootStack.Navigator>
    );
}

export default UserMain;