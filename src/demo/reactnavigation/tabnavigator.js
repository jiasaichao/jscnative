import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TabNavigator, StackNavigator } from "react-navigation";
import { Flex } from '../../components/layout';

class RecentChatsScreen extends React.Component {
    render() {
        return <Flex HW><Text>List of recent chats</Text></Flex>
    }
}

class AllContactsScreen extends React.Component {
    render() {
        return <Text>List of all contacts</Text>
    }
}

export const MainScreenNavigator = TabNavigator({
    Recent: { screen: RecentChatsScreen },
    All: { screen: AllContactsScreen },
});
// const SimpleApp = StackNavigator({
//     Home: { 
//       screen: MainScreenNavigator,
//       navigationOptions: {
//         title: 'My Chats',
//       },
//     },
//     Chat: { screen: ChatScreen },
//   })
// const SimpleApp = StackNavigator({
//     Home: { screen: MainScreenNavigator },
//     Chat: { screen: ChatScreen },
// });