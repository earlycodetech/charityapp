import { useContext,useState } from "react";
import { AppContext } from '../settings/globalVariables';
import { View,Text,StyleSheet,Alert } from "react-native";
import { Button,TextInput } from "react-native-paper";
import { Theme } from "../utils/theme";
import { SafeArea } from "../components/SafeArea";
import { Formik } from 'formik';
import * as yup from 'yup';
import { UseActivityIndicator } from "../components/ActivityIndicator";
import { db } from "../settings/firebase.setting";
import { addDoc,collection } from "firebase/firestore";

const validationRules = yup.object({
    title:yup.string().required('required filed'),
    desc:yup.string().required('required filed'),
    target:yup.number().required('required filed'),
});

export function Create({navigation}) {
    const { uid } = useContext(AppContext);
    const [modalVisible, setModalVisible] = useState(false);

    return uid !== null ? (
        <SafeArea>
            <UseActivityIndicator bool={modalVisible}/>
            <Text style={styles.mainTitle}>Create a Fund Raiser</Text>
            <Text style={styles.crimeAlert}>This app is a demonstration app built by a cohort of students and instructor at early code. This app must not be used by any means for frudulent purposes. The students and the institutions takes no responsible for any act of crime on the app.</Text>

            <Formik
            initialValues={{ title:'',desc:'',target:0 }}
            onSubmit={(values,action) => {

                setModalVisible(true);
                addDoc(collection(db,'projects'),{
                    title:values.title,
                    description:values.desc,
                    target:Number(values.target),
                    createdBy:uid,
                    status:'active',
                    createdAt:new Date().getTime()
                })
                .then(() => {
                    setModalVisible(false);
                    Alert.alert(
                        'Message',
                        'Fund raiser created!!',
                        [
                        {text:'Go to Raisers',onPress:() => navigation.navigate('Fund Raisers')},
                        {text:'Dismiss'},
                        ]
                    )   
                })
                .catch(error => {
                    setModalVisible(false);
                    Alert.alert(
                        'Message',
                        error.message,
                        [{text:'Dismiss'}]
                    )
                })
            }}
            validationSchema={validationRules}
            >
                {({ handleChange, handleBlur, handleSubmit, values,errors,touched }) => (
                <View style={styles.form}>
                    <View>
                        <TextInput
                            outlineColor="gray"
                            activeOutlineColor="#5D9C59"
                            mode="outlined"
                            label='Title'
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            value={values.title}
                        />
                        {touched.title && errors.title 
                        ? <Text style={{color:'red'}}>{errors.title}</Text> 
                        : null}
                    </View>

                    <View>
                        <TextInput
                            outlineColor="gray"
                            activeOutlineColor="#5D9C59"
                            mode="outlined"
                            label='description'
                            onChangeText={handleChange('desc')}
                            onBlur={handleBlur('desc')}
                            value={values.desc}
                            multiline={true}
                        />
                        {touched.desc && errors.desc 
                        ? <Text style={{color:'red'}}>{errors.desc}</Text> 
                        : null}
                    </View>

                    <View>
                        <TextInput
                            outlineColor="gray"
                            activeOutlineColor="#5D9C59"
                            mode="outlined"
                            label='target amount'
                            onChangeText={handleChange('target')}
                            onBlur={handleBlur('target')}
                            value={values.target}
                            keyboardType="number-pad"
                        />
                        {touched.target && errors.target 
                        ? <Text style={{color:'red'}}>{errors.target}</Text> 
                        : null}
                    </View>
            
                    <Button
                    buttonColor={Theme.colors.gray400}
                    textColor={Theme.colors.lime400}
                    mode="contained"
                    onPress={handleSubmit}
                    contentStyle={{paddingVertical:6}}
                    style={{marginVertical:12}}>
                    Create Fund Raiser
                    </Button>
                </View>
                )}
            </Formik>
        </SafeArea>
    )
    : (
        <SafeArea>
            <View style={styles.wrapper}>
                <Text style={styles.subHeader2}>Sign in first to create a fund raiser</Text>
                <Button 
                mode="contained" 
                contentStyle={{paddingVertical:4}}
                onPress={() => navigation.navigate('Login')}>Go to sign in</Button>
            </View>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:16
    },
    subHeader2:{
        fontSize:24,
        textAlign:'center'
    },
    mainTitle:{
        fontSize:26,
        marginBottom:6
    },
    crimeAlert:{
        fontSize:12,
        color:'gray',
        marginBottom:8
    }
})