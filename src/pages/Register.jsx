import React,{useContext,useEffect,useState} from 'react';
import {View, Text,StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {UsersContext} from '../context/UsersContext'
import {Context} from '../context/EmployeesContext'

const Register = ({navigation})=>{

    const {state} = useContext(Context);
    const {addUser} = useContext(UsersContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return(
        <View style={styles.pageContainer}>
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
            <TouchableOpacity style={styles.links} onPress={
                ()=>{navigation.navigate('Login')}
            }>
                <Text style={styles.forgot}>Back to login screen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn} onPress={()=>{
                if(userName.length === 0 || password.length ===0){
                    alert('No empty fields are allowed');
                }else{
                addUser(userName, password,()=>{navigation.navigate('Index',{state: state})})
                }   
            }}>
                <Text style={styles.submitTxt}>Login</Text>
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
          left: 55,
      }
})

export default Register;