import React,{useState} from 'react'
import {View,Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native'
import DatePicker from 'react-native-datepicker'

const EmployeeForm = ({onSubmit, initialValues})=>{

    const [name,setName] = useState(initialValues.name);
    const [salary,setSalary] = useState(initialValues.salary);
    const [age,setAge] = useState(initialValues.age);

    let currentYear = new Date().getFullYear();
    const [date, setDate] = useState(parseInt(currentYear)-parseInt(age))


    return(
        <View style={styles.formContainer}>
            <Text style={styles.label}>Employee Full Name</Text> 
            <TextInput value={name} onChangeText={(text) => setName(text)} style={styles.input}/>
            <Text style={styles.label}>Employee Salary</Text> 
            <TextInput value={salary} onChangeText={(salary) => setSalary(salary)} style={styles.input}/> 
            <Text style={styles.label}>Employee Birth Date</Text> 
            
            <DatePicker
        style={styles.inputDate}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY"
        minDate="1940"
        maxDate="2010"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            marginRight: 0,

          },
          dateInput: {
            marginRight: 36,
            color: 'black',
            borderRadius: 20,
            borderColor: '#c4e3cb',
            width: 300,
          }
       
        }}
        onDateChange={(date) => {setDate(date); setAge(parseInt(currentYear)-parseInt(date))}}
      />

            <TouchableOpacity onPress={
                ()=>{if(name.length === 0 || salary.length === 0){
                    alert('no empty fields are allowed');
                    }else{
                    onSubmit(name,salary,age)}
                    }}
                style={styles.submitBtn}>
                <Text style={styles.submitTxt}>Save Employee</Text>
            </TouchableOpacity>
        </View>
    )
}

EmployeeForm.defaultProps = {
    initialValues:{
        name: '', 
        salary: '',
        age: '0',
    }
}

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#f4f9f4',
        marginVertical: 10,
        marginHorizontal: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'column',
    },
    input: {
        backgroundColor: '#c4e3cb',
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#f4f9f4',
        borderRadius: 20,
        marginBottom: 15,
        padding:  5,
        margin: 5,
        borderWidth: 4,
    },
    inputDate: {
        backgroundColor: '#c4e3cb',
        fontSize: 18,
        borderRadius: 20,
        marginBottom: 15,
        padding:  5,
        margin: 5,
        alignSelf: 'flex-start',
        width: 300,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
        marginLeft: 5
    },
    submitBtn:{
        backgroundColor: '#8aae92',
        borderColor: '#f4f9f4',
        borderRadius: 20,
        paddingVertical: 5
    },
    submitTxt:{
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default EmployeeForm;