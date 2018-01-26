import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
// import {} from 'react-native'
import {} from 'react-navigation/src/'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

export class App extends React.Component {
    render() {
        return <Router>
            <Scene key="root" titleStyle={{ alignSelf: 'center' }}
                // transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forHorizontal })}
                >
                <Scene key="login" component={Login} title="Login" />
                <Scene key="register" component={Register} title="Register" />
                <Scene key="home" component={Home} />
            </Scene>
        </Router>
    }
}

class Login extends React.Component{
    render(){
        return(
            <View>
                <Text>Login</Text>
                <TouchableOpacity onPress={()=>{Actions.register()}}><Text>Home</Text></TouchableOpacity>
            </View>
        );
    }
}
class Register extends React.Component{
    render(){
        return(
            <View>
                <Text>Register</Text>
                <TouchableOpacity><Text>Home</Text></TouchableOpacity>
            </View>
        );
    }
}
class Home extends React.Component{
    render(){
        return(
            <View>
                <Text>Home</Text>
            </View>
        );
    }
}