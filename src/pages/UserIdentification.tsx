import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){
    const navigation = useNavigation();

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();
    const [isRequired, setIsRequired] = useState(false);

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name)
    }

    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputChange(value :string){
        setIsFilled(!!value); //transforma o value em bool .. Se tiver conteúdo é true, caso contrário false 
        setName(value);
        setIsRequired(false);
    }    

    function handleSubmit(){
        if(isFilled)
            navigation.navigate('Confirmation');
        else
            setIsRequired(true);
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    { isRequired ? '😕' : isFilled ? '😄' : '😀' }
                                </Text>
                                <Text style={styles.title}>
                                    Como podemos {'\n'} {/*quebra de linha*/}
                                    chamar você
                                </Text>
                            </View>                    
                            
                            <View style={styles.body}>
                                <TextInput 
                                    style={[
                                        styles.input,
                                        (isFocused || isFilled) && 
                                        { borderColor: colors.green },
                                        isRequired && { borderColor: colors.red }
                                    ]}
                                    placeholder="Digite um nome"
                                    onBlur={handleInputBlur}
                                    onFocus={handleInputFocus}
                                    onChangeText={handleInputChange}
                                />

                                { isRequired &&
                                <Text style={styles.required}>
                                    O nome é obrigatório
                                </Text>
                                }
                            </View>                       

                            <View style={[styles.footer]}>
                                <Button 
                                    title="Confirmar"
                                    onPress={handleSubmit}
                                    disabled
                                />
                            </View>                    
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>           
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },
    header: {
        alignItems: 'center'
    },
    body: {
        alignItems: 'center',
        width: '100%',
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    required: {
        fontSize: 17,
        textAlign: 'center',
        color: colors.red,
        fontFamily: fonts.text,
        marginTop: 10
    },
    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20
    }
});