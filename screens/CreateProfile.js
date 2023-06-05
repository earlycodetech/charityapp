import { useState,useEffect,useCallback,useContext } from "react";
import { AppContext } from "../settings/globalVariables";
import { View,TouchableOpacity,Text,StyleSheet,Alert} from "react-native";
import { SafeArea } from "../components/SafeArea";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { TextInput,Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationRules = yup.object({
    fName:yup.string().required('required filed'),
    lName:yup.string().required('required filed'),
    city:yup.string().required('required filed'),
    mail:yup.string().required('required filed').min(16),
    dob:yup.string(),
    bio:yup.string(),
});

export function CreateProfile ({navigation}) {
  const {setUid} = useContext(AppContext);
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
      <Text style={style.title}>Create Your Profile</Text>
      
      <Formik
        initialValues={{ fName:'',lName:'',mail:'',city:'',dob:'',bio:'', }}
        onSubmit={(values,action) => {
          
        }}
        validationSchema={validationRules}
      >
          {({ handleChange, handleBlur, handleSubmit, values,errors,touched }) => (
            <View>
              <View>
                <TextInput
                  outlineColor="hotpink"
                  mode="outlined"
                  label='email'
                  style={style.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email 
                ? <Text style={{color:'red'}}>{errors.email}</Text> 
                : null}
              </View>
            
              <TextInput
                outlineColor="hotpink"
                mode="outlined"
                label='password'
                style={style.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
              />
              
              <Button
              buttonColor="hotpink"
              mode="contained"
              onPress={handleSubmit}
              contentStyle={{paddingVertical:6}}
              style={{marginVertical:12}}>Sign in</Button>
            </View>
          )}
        </Formik>
        <View style={style.account}>
            <Text >Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={style.sign}>Sign up</Text>
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