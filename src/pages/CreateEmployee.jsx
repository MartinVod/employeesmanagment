import React,{useContext} from 'react';
import {StyleSheet} from 'react-native'
import {Context} from '../context/EmployeesContext'
import EmployeeForm from '../components/EmployeeForm'

const CreateEmployee = ({navigation}) =>{

    
    const {state,addEmployee} = useContext(Context)

    return <EmployeeForm onSubmit={(name,salary,age)=>{
        addEmployee(name,salary,age, ()=>navigation.navigate('Index',{state: state}))
    }} />

}

const styles = StyleSheet.create({

})

export default CreateEmployee;