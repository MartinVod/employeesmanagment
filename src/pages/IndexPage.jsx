import React,{useContext,useEffect,useState} from 'react';
import {View,FlatList, Text,StyleSheet, TouchableOpacity} from 'react-native';
import {Context as EmployeesContext} from '../context/EmployeesContext'
import {UsersContext} from '../context/UsersContext'
import { AntDesign } from '@expo/vector-icons';

const IndexPage = ({navigation}) =>{
    const {state,deleteEmployee,orderBy} = useContext(EmployeesContext);
    const {user,userLogout} = useContext(UsersContext);


    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={()=>{navigation.navigate('CreateEmployee')}} style={{paddingHorizontal: 50,}}>
             <AntDesign name="adduser" size={28} color="black" /> 
            </TouchableOpacity>
          ),
        });
      }, [navigation]);

    return <View style={styles.list}>
                <View style={styles.welcomeCon}>
                    <Text style={styles.welcomeTxt}>
                         Hellow {user !== undefined ? user.username : ' Guest '}
                         {user !== undefined
                        ? 
                            <TouchableOpacity 
                            style={styles.welcomeBtn}
                            onPress={()=>{userLogout(navigation.navigate('Login'))}}
                            >
                                <Text>Logout</Text>
                            </TouchableOpacity> 

                        :   <TouchableOpacity 
                            style={styles.welcomeBtn}
                            onPress={()=>{navigation.navigate('Register')}}
                            >
                                <Text>Register</Text>
                            </TouchableOpacity> }
                    </Text>
                </View>
                <Text>Sort By: </Text>
            <View style={styles.sortOptions}>
                <TouchableOpacity style={styles.sortOption} onPress={()=>{orderBy(state,'byId') }}>
                    <Text style={styles.sortOptionTxt}>ID</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortOption} onPress={()=>{orderBy(state,'byName') }}>
                    <Text style={styles.sortOptionTxt}>A-Z</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortOption} onPress={()=>{orderBy(state,'bySalary')  }}>
                    <Text style={styles.sortOptionTxt}>Salary</Text>
                </TouchableOpacity>
            </View>
        <FlatList 
            data={state}
            keyExtractor={(emp)=>emp.id}
            renderItem={({item})=>{
                return (
                        <View style={styles.containerEmployees}>
                            <View style={styles.containerEmployee}>
                                
                                    <View style={styles.boxId}>
                                        <Text style={styles.textId}>
                                        #{item.id}
                                        </Text>
                                    </View>
                                    <View style={styles.boxDetails}>
                                        <TouchableOpacity onPress={()=>{navigation.navigate('ShowEmployee',{employee: item})}}>
                                        <Text style={styles.employeeName}>
                                        {item.employee_name}
                                        </Text>
                                        <Text style={styles.employeeDetails}>
                                        Age: {item.employee_age} | Salary: {item.employee_salary}
                                        </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.boxDelete}>
                                        <TouchableOpacity onPress={()=>deleteEmployee(item.id)}>
                                        <AntDesign name="deleteuser" style={styles.deleteIcon} />
                                        </TouchableOpacity>
                                    </View>
                                
                            </View>
                        </View>
                )
            }}
        />
    </View>
}



const styles = StyleSheet.create({
    sortOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#616161',
        paddingVertical: 5,
        borderWidth: 2,
        borderColor: '#f4f9f4',
        borderRadius: 17,
        marginHorizontal:25,
        
    },
    sortOption: {
        flex: 1,

        borderColor: '#f4f9f4',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        overflow: 'hidden',


    },
    sortOptionTxt: {
        fontWeight: 'bold',
        color: 'white',
        padding: 10
    },
    list:{
        backgroundColor: '#f4f9f4',
        paddingHorizontal: 12,
        paddingVertical: 12,
        flex: 1,
    },
containerEmployees:{
    backgroundColor: '#f4f9f4',
    position: 'relative',
    marginVertical: 12,
    marginHorizontal:5,
    paddingHorizontal: 12,
    paddingVertical: 2,
    flex: 1,


},
containerEmployee: {
    flexDirection: 'row',
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#616161',
    shadowColor: "#616161",

},
boxId:{
    height: 50,
    width: 50,
    backgroundColor: '#8aae92',
    overflow: 'hidden',
    borderRightWidth: 1,
    borderTopRightRadius: 40,
    borderColor: '#8aae92',
    alignSelf: 'flex-start'
},

textId:{
    position: 'relative',
    fontSize: 14,
    top: 15,
    left: 5,
    color: '#616161',
},
boxDetails:{
    flex: 1,
    textAlign: 'left',
    left: 50,
},
employeeName:{
    position: 'relative',
    left: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8aae92',
},
employeeDetails:{
    color: 'gray',
    marginLeft: 4,
},
boxDelete:{
    width: 50,
    height: 50,
    backgroundColor: '#8aae92',
    borderLeftWidth: 1,
    borderBottomLeftRadius: 40,
    borderColor: '#8aae92'
},
deleteIcon:{
    position: 'relative',
    color: 'red',
    left: 10,
    top: 4,
    fontSize: 33
},
welcomeCon:{
    backgroundColor: '#8aae92',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 25,
    top: -20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
},
welcomeTxt: {
    fontSize: 18,
},
welcomeBtn: {

    paddingHorizontal: 15,
    paddingVertical: 3,
    backgroundColor: '#f4f9f4',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    left: 50,
}
});

export default IndexPage;