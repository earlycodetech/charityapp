import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./Home";
import { Login } from "./Login";
import { About } from './About';
import { Signup } from './Signup';

const Stack = createStackNavigator();

export function StackNavigation () {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='About' component={About} />
            <Stack.Screen name='Signup' component={Signup} />
        </Stack.Navigator>
    )
}