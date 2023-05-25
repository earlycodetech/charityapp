import { View,TouchableOpacity,Text,StyleSheet,} from "react-native";
import { SafeArea } from "../components/SafeArea";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { useState,useEffect,useCallback } from "react";
import { TextInput,Button } from 'react-native-paper';
import { Formik } from 'formik';

export function Signup ({navigation}) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({Pacifico_400Regular});
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
  
    prepare();
  }, []);
    
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

return(
  <SafeArea>
    <View style={style.heading}>
      <Text style={style.title}>Charity App</Text>
      <Text style={style.title2}>Create a donator account</Text>
      
      <Formik
        initialValues={{ email: '',password:'',passwordConfirmation:'' }}
        onSubmit={(values,action) => {
          console.log(values.email)
        }}
      >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextInput
                mode="outlined"
                label='email'
                style={style.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <TextInput
                mode="outlined"
                label='password'
                style={style.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
              />
              <TextInput
                mode="outlined"
                label='confirm password'
                style={style.input}
                onChangeText={handleChange('passwordConfirmation')}
                onBlur={handleBlur('passwordConfirmation')}
                value={values.email}
                secureTextEntry={true}
              />
              <Button
              mode="contained"
              onPress={handleSubmit}
              contentStyle={{paddingVertical:6}}
              style={{marginVertical:12}}>Create account</Button>
            </View>
          )}
        </Formik>
        <View style={style.account}>
            <Text >Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={style.sign}>Sign in</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  )
}

const style = StyleSheet.create({
    heading:{ 
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:280
        },
    title:{
        fontSize:35,
        fontFamily:'Pacifico_400Regular'
         },
    title2:{
        marginTop:15
    },
    input:{
        marginTop:15,
        width:300,
    },
    account:{
      flexDirection:'row'
    },
    sign:{
      color:'blue'
    },
})