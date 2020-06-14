
import React from 'react';
import { createPrivateNavigator } from '../Authentication';
import UserInfo from './UserInfo';
import Shop from './Shop';

const RootStack = createPrivateNavigator();
const UserMain = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen name="UserInfo" component={UserInfo} />
            <RootStack.Screen name="Shop" component={Shop} />
        </RootStack.Navigator>
    );
}

export default UserMain;