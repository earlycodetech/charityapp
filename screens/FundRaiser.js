import { useState } from "react";
import { StyleSheet,View,ScrollView } from "react-native";
import { SafeArea } from "../components/SafeArea";
import { Button, Card, Text,TextInput } from 'react-native-paper';
import { Theme } from '../utils/theme';
import { db } from '../settings/firebase.setting';
import { getDoc,doc } from "firebase/firestore";
import { Formik } from 'formik';
import * as yup from 'yup';
import { numberWithCommas } from '../utils/numberWithCommas';

const validationRules = yup.object({
    amount:yup.number().required().min(50),
});

export function FundRaiser ({navigation,route}) {
    const {projectId} = route.params;
    const [fundRaiser,setFundRaiser] = useState({});
    const [hideOrShowForm,setHideOrShowForm] = useState(false);

    const handleGetFundRaiser = async () => {
        const docSnap = await getDoc(doc(db,'projects',projectId));
        setFundRaiser(docSnap.data());
    }
    handleGetFundRaiser();

    return (
        <SafeArea>
            <View style={styles.container}>
                <ScrollView style={styles.card}>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Content style={styles.cardContent}>
                        <Text variant="headlineMedium">{fundRaiser.title}</Text>
                        <Text variant="titleLarge" style={{color:'green',marginVertical:Theme.sizes[3]}}>
                            Target: ₦{numberWithCommas(fundRaiser.target)}
                        </Text>
                        <Text variant="bodyMedium">{fundRaiser.description}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button 
                        buttonColor="white"
                        onPress={() => {
                            if (hideOrShowForm) {
                                setHideOrShowForm(false)
                            } else if (!hideOrShowForm) {
                                setHideOrShowForm(true)
                            }
                        }}
                    >{hideOrShowForm ? 'Cancel' : 'Dontate'}</Button>
                    </Card.Actions>

                    <View style={{display:hideOrShowForm ? 'flex' : 'none'}}>
                        <Formik
                            initialValues={{ amount: '',}}
                            onSubmit={(values,action) => {
                                //navigate to "Pay" screen with details
                                navigation.navigate('Pay',{
                                    project:fundRaiser.title,
                                    amount:values.amount,
                                })
                            }}
                            validationSchema={validationRules}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values,errors,touched }) => (
                                <>
                                <View style={styles.inputRow}>
                                    <TextInput
                                    style={{width:'100%'}}
                                    outlineColor={Theme.colors.gray100}
                                    activeOutlineColor={Theme.colors.gray200}
                                    mode="outlined"
                                    label='amount'
                                    onChangeText={handleChange('amount')}
                                    onBlur={handleBlur('amount')}
                                    value={values.amount} 
                                    />
                                    {touched.amount && errors.amount 
                                    ? <Text style={{color:'red'}}>{errors.amount}</Text> 
                                    : null}
                                </View>

                                <Button
                                buttonColor='green'
                                mode="contained"
                                onPress={handleSubmit}
                                contentStyle={{paddingVertical:6,}}
                                style={{borderRadius:6}}>CONTINUE</Button>
                                </>
                            )}
                        </Formik>
                    </View>
                </ScrollView>
            </View>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    card:{
        marginBottom:Theme.sizes[3],
    },
    cardContent:{
        paddingVertical:Theme.sizes[2],
        marginVertical:Theme.sizes[3]
    },
    donateBtn:{
        backgroundColor:Theme.colors.gray400,
    },
    inputRow:{
        marginBottom:Theme.sizes[2]
    }
})