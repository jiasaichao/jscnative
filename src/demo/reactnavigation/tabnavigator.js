import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TabNavigator, StackNavigator } from "react-navigation";

class RecentChatsScreen extends React.Component {
    render() {
        return <Text>List of recent chats</Text>
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