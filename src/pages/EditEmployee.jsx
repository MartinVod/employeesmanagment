import React,{useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Context as EmployeesContext} from '../context/EmployeesContext'
import EmployeeForm from '../components/EmployeeForm'

const EditEmployee = ({route, navigation})=>{
    
    const {editEmployee} = useContext(EmployeesContext);
    const {employee} = route.params;
    return(
       <EmployeeForm
       initialValues={{name: employee.employee_name, salary: employee.employee_salary, age: employee.employee_age}}
        onSubmit={(name, salary,age)=>{
            editEmployee(employee.id,name, salary,age,(emp)=>navigation.navigate('ShowEmployee',{employee: emp}))
       }} />
    )
}

const styles = StyleSheet.create({

    })

export default EditEmployee;