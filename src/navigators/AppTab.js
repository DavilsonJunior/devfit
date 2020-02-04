import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeStack from './HomeStack';
//import TmpScreen from '../screens/TmpScreen';
//import WorkoutStack from './WorkoutStack';
//import MyWorkoutsStack from './MyWorkoutsStack';
import CustomTabBar from '../components/CustomTabBar';

export default createBottomTabNavigator({
    HomeStack,
    //WorkoutStack,
    //MyWorkoutsStack
}, {
    tabBarComponent:(props)=>(
        <CustomTabBar 
            {...props}
            items={[
                {
                    type:'regular',
                    text:'Inicio',
                    icon:require('../assets/home.png'),
                    route:'HomeStack'
                },
                {
                    type:'big',
                    icon:require('../assets/dumbbell.png'),
                    route:'WorkoutStack'
                },
                {
                    type:'regular',
                    text:'Meus Treinos',
                    icon:require('../assets/myworkouts.png'),
                    route:'MyWorkoutsStack'
                }
            ]}
        />
    )
});