import React,{useEffect,useState,useContext} from 'react';
import {View, Text,StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native';
import {Context} from '../context/EmployeesContext'
import {UsersContext} from '../context/UsersContext'

const Login = ({navigation})=>{

    const {state,getEmployees} = useContext(Context);
    const {userLogin} = useContext(UsersContext);
    useEffect(()=>{
        getEmployees();
    },[])


    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return(
        <View style={styles.pageContainer}>
            <Image style={styles.logo} source={require('../imgs/logo.png')} />
            <View style={styles.formContainer}>
                <TextInput
                 style={styles.input} 
                 placeholder='Enter Username' 
                 onChangeText={(userName) => setUserName(userName)} 
                 value={userName}

                 />
                <TextInput
                secureTextEntry 
                style={styles.input} 
                placeholder='Enter Password'  
                onChangeText={(password) => setPassword(password)}
                value={password}

                />
                <TouchableOpacity 
                style={styles.links}
                onPress={()=>{navigation.navigate('Register')}}
                >
                    <Text style={styles.forgot}>Not signed in?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitBtn} onPress={()=>{   
                    userLogin(userName, password,()=>{navigation.navigate('Index',{state: state})})
                }}>
                    <Text style={styles.submitTxt}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                 style={styles.links}
                onPress={()=>{navigation.navigate('Index',{state: state})}}
                >
                    <Text style={styles.forgot}>Continue as a guest</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    pageContainer: {
        backgroundColor: '#c4e3cb',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 50,
        flex: 1,
    },
    logo:{
        height:250,
        width:250,
    },
    formContainer: {
        backgroundColor: '#c4e3cb',
        marginVertical: 10,
        marginHorizontal: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,

    },
    input: {
        backgroundColor: '#f4f9f4',
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#f4f9f4',
        borderRadius: 5,
        marginBottom: 15,
        padding:  5,
        margin: 5,
        borderWidth: 4,
        width: 250,
        marginLeft: -4,
    },
    submitBtn:{
        backgroundColor: '#8aae92',
        borderColor: '#f4f9f4',
        borderRadius: 5,
        paddingVertical: 5,
        width: 242,
        padding: 5,
        marginVertical: 10,
    },
    submitTxt:{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    forgot:{
        color: '#000',
        fontSize:16
      },
      links:{
        textDecorationLine: 'underline',
      }
})




export default Login;