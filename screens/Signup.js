import { useState,useEffect,useCallback,useContext } from "react";
import { AppContext } from "../settings/globalVariables";
import { View,TouchableOpacity,Text,StyleSheet,Alert} from "react-native";
import { Theme } from "../utils/theme";
import { SafeArea } from "../components/SafeArea";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { TextInput,Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { auth } from "../settings/firebase.setting";
import { createUserWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
import { UseActivityIndicator } from "../components/ActivityIndicator";

const validationRules = yup.object({
  email:yup.string().required('you must fill this field').min(5).max(36),
  password:yup.string().required().min(4)
  .oneOf([yup.ref('passwordConfirmation'),null],'password must match')
});

export function Signup ({navigation}) {
  const {setUid} = useContext(AppContext);
  const [appIsReady, setAppIsReady] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
    <UseActivityIndicator bool={modalVisible}/>

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Charity App</Text>
        <Text style={styles.text}>Create a donator account</Text>
      </View>

      <Formik
        initialValues={{ email: '',password:'',passwordConfirmation:'' }}
        onSubmit={(values,action) => {
          setModalVisible(true);//start activiyIndicator
          createUserWithEmailAndPassword(auth,values.email,values.password)
          .then(() => onAuthStateChanged(auth,(user) => {
            setModalVisible(false);//stop activiyIndicator
            setUid(user.uid);//update to the user's UID
            Alert.alert(
              'Message',
              'Your account was created!',
              [{text:'Go to Home',onPress: () => navigation.navigate('My Home')}]
            )
          }))
          .catch((error) => {
            setModalVisible(false);//stop activiyIndicator
            //custom actions for different errors
            if (error.code == 'auth/invalid-email'){
              Alert.alert(
                'Message',
                'Invalid email! Try again.',
                [{text:'Try again'}]
              )
            } else if (error.code == 'auth/email-already-in-use') {
              Alert.alert(
                'Message',
                'An account already exist with same email!',
                [
                  {text:'Go to Login',onPress: () => navigation.navigate('Login')},
                  {text:'Forgot password?',onPress: () => navigation.navigate('Reset Password')}
                ]
              )
            } else {
              Alert.alert(
                'Message',
                'Something went wrong',
                [{text:'Dismiss'}]
              )
            }
          })
        }}
        validationSchema={validationRules}
      >
          {({ handleChange, handleBlur, handleSubmit, values,errors,touched }) => (
            <View style={styles.formWrapper}>
              <View>
                <TextInput
                  style={{width:'100%'}}
                  outlineColor={Theme.colors.gray100}
                  activeOutlineColor={Theme.colors.gray200}
                  mode="outlined"
                  label='email'
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email} 
                />
                {touched.email && errors.email 
                ? <Text style={{color:'red'}}>{errors.email}</Text> 
                : null}
              </View>

              <View>
                <TextInput
                  style={{width:'100%'}}
                  outlineColor={Theme.colors.gray100}
                  activeOutlineColor={Theme.colors.gray200}
                  mode="outlined"
                  label='password'
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.email} 
                  secureTextEntry={true}
                />
                {touched.password && errors.password 
                ? <Text style={{color:'red'}}>{errors.password}</Text> 
                : null}
              </View>

              <TextInput
                style={{width:'100%'}}
                outlineColor={Theme.colors.gray100}
                activeOutlineColor={Theme.colors.gray200}
                mode="outlined"
                label='password'
                onChangeText={handleChange('passwordConfirmation')}
                onBlur={handleBlur('passwordConfirmation')}
                value={values.passwordConfirmation} 
                secureTextEntry={true}
              />

            <Button
              buttonColor={Theme.colors.gray200}
              mode="contained"
              onPress={handleSubmit}
              contentStyle={{paddingVertical:6,}}
              style={{borderRadius:6}}>Create account</Button> 
            </View>
          )}
        </Formik>

        <View style={styles.row}>
          <Text style={styles.text}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.sign}>Sign in</Text>
          </TouchableOpacity>
        </View>
    </View>
  </SafeArea>
  )
}

const styles = StyleSheet.create({
  container:{ 
    flex:1,
    alignItems:'center',
    gap:40,
  },
  header:{
    justifyContent:'center',
    alignItems:'center',
    gap:16,
    marginTop:20,
  },
  title:{
    fontSize:35,
    fontFamily:'Pacifico_400Regular'
  },
  formWrapper:{
    width:'100%',
    flexDirection:'column',
    gap:16
  },
  row:{
    flexDirection:'row',
    gap:6,
  },
  text:{
    fontSize:20
  },
  sign:{
    fontSize:20,
    color:Theme.colors.blue400
  },
})