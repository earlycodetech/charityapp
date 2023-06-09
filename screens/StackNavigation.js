import { createStackNavigator } from "@react-navigation/stack";
import { MyHome } from "./Home";
import { Login } from "./Login";
import { About } from './About';
import { Signup } from './Signup';
import { Donate } from "./Donate";
import { FundRaisers } from "./FundRaisers";
import { Create } from "./Create";
import { ForgotPassword } from "./ForgotPassword";
import { CreateProfile } from "./CreateProfile";
import { Profile } from "./Profile";
import { UpdateProfile } from "./UpdateProfile";

const Stack = createStackNavigator();

export function StackNavigation () {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
            <Stack.Screen name='My Home' component={MyHome} />
            <Stack.Screen name='Login' component={Login} options={{headerShown:true}} />
            <Stack.Screen name='About' component={About} />
            <Stack.Screen name='Donate' component={Donate} />
            <Stack.Screen name="Fund Raisers" component={FundRaisers}/>
            <Stack.Screen name="Create" component={Create}/>
            <Stack.Screen name="Reset Password" component={ForgotPassword}/>
            <Stack.Screen name='Signup' component={Signup} options={{headerShown:true}} />
            <Stack.Screen name='Create Profile' component={CreateProfile} options={{headerShown:true}} />
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='Update Profile' component={UpdateProfile} />
        </Stack.Navigator>
    )
}