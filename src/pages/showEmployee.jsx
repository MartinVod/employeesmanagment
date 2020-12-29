import React,{useContext,useState,useEffect} from 'react';
import {View,Text,StyleSheet, TouchableOpacity, Image} from 'react-native'
import {Context} from '../context/EmployeesContext'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const showEmployeePage = ({route, navigation}) =>{
  const {state} = useContext(Context);
    const {employee} = route.params;

    const [nextEmployee, setNextEmployee] = useState({});
    const [prevEmployee, setPrevEmployee] = useState({});
    const [currentEmployee, setCurrentEmployee] = useState(employee);
    const [swipeFlag, setSwipeFlag] = useState(0);

    useEffect(()=>{
      state.forEach((emp,i,empArr)=>{
        if(i !== empArr.length-1 && emp.id === currentEmployee.id){
          setNextEmployee(empArr[i+1])
        }else if(i === empArr.length-1 && emp.id === currentEmployee.id){
          setNextEmployee(empArr[0])
        }
      })
      
        state.forEach((emp,i,empArr)=>{
        if(i !== 0 && emp.id === currentEmployee.id){
          setPrevEmployee(empArr[i-1])
        }else if(i === 0 && emp.id === currentEmployee.id){
          setPrevEmployee(empArr[empArr.length-1])
        }
      })
  },[swipeFlag])

 

    const onSwipeLeft = (gestureState) => {
      setCurrentEmployee(nextEmployee)
      setSwipeFlag(swipeFlag+1)
    }
  
    const onSwipeRight = (gestureState) => {
      setCurrentEmployee(prevEmployee)
      setSwipeFlag(swipeFlag+1)
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (

            <TouchableOpacity onPress={()=>{
              
              navigation.navigate('EditEmployee',{employee: currentEmployee})}} style={{paddingHorizontal: 50,}}>
             <MaterialCommunityIcons name="account-edit-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        });
      }, [navigation]);
      console.log(currentEmployee);
      const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      };

    return(
      <GestureRecognizer
      onSwipeLeft={(state) => onSwipeLeft(state)}
      onSwipeRight={(state) => onSwipeRight(state)}
      config={config}
      style={styles.employeeContainer}
      >

        <View >
          <View style={styles.employeeCard}>
            <View>
              <Image source={{uri: `https://robohash.org/${currentEmployee.id}?set=set5`}} style={styles.profileImg} />
            </View>
            <View>
              <Text style={styles.employeeName}>{currentEmployee.employee_name}</Text> 
              <Text style={styles.employeeDetails}>Salary: {currentEmployee.employee_salary}</Text>
              <Text style={styles.employeeDetails}>Age: {currentEmployee.employee_age}</Text>
            </View>
          </View>
        </View>

        </GestureRecognizer>
    )
}



const styles = StyleSheet.create({
  employeeContainer: {
    backgroundColor: '#f4f9f4',

  },
  employeeCard:{
    backgroundColor: '#f4f9f4',
    borderWidth: 1,
    borderColor: '#616161',
    borderRadius: 15,
    flexDirection: 'column',
    marginHorizontal: 15,
    marginVertical: 15
  },
  profileImg: {
    alignSelf: 'center',
    height: 200,
    width: 200,
    padding: 50,
    borderWidth: 5,
    borderRadius: 100,
    borderColor: '#8aae92',
    marginVertical: 5,
  },
  employeeName:{
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8aae92',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingVertical: 20,
},
employeeDetails:{
  marginHorizontal: 10,
  paddingVertical:10,
  color: '#616161',
  color: 'darkgray'

}
})

export default showEmployeePage;