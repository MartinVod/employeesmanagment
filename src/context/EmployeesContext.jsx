import createDataContext from './createDataContext'
import dummyApi from '../api/dummyapi';

const employeesReducer =(state,action) =>{
    switch(action.type){
 
        case 'byId':
            return [...action.payload.sort((a,b) => parseInt(a.id) - parseInt(b.id))]
        case 'byName':
             let arr2 = action.payload.sort((a,b) => 
            a.employee_name.charAt(0).toUpperCase() < b.employee_name.toUpperCase() ? -1
             : a.employee_name.charAt(0).toUpperCase() > b.employee_name.toUpperCase() ? 1
             :0)
            return [...arr2]
        case 'bySalary':
            return [...action.payload.sort((a,b) => parseInt(a.employee_salary) - parseInt(b.employee_salary))]
        case 'addEmployee':
            let idArr = state.sort((a, b)=> a.id - b.id );
            return [...state,{id: (parseInt(idArr[idArr.length-1].id)+1).toString(),employee_name: action.payload.employee_name, employee_salary: action.payload.employee_salary, employee_age: action.payload.employee_age,profile_img: ''}]
        case 'get_employee':
            return action.payload;
        case 'deleteEmployee':
            return state.filter((employee)=> employee.id !== action.payload);
        case 'editEmployee':
            return state.map((employee)=>{
                console.log('arrived to edit employee');
                console.log(action.payload);
                return employee.id === action.payload.id ? action.payload : employee
            });
        default:
            return state;
    }
}

const orderBy = dispatch=>{
    return (state,sorting)=>{
        dispatch({type: sorting, payload: state})
    }
}

const getEmployees = dispatch =>{
    return async ()=> {
       try{ 
        const response = await dummyApi.get('/employees')
        dispatch({type: 'get_employee', payload: response.data.data})
        }
       catch (error) {
        if (error.response) {
          alert(error.response.data.message);
          alert('error number'+error.response.status)
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      }
    }
}

const addEmployee = (dispatch)=>{
    return async (name,salary,age,callback) =>{
        try{ 
            const response = await dummyApi.post('/create',JSON.stringify({employee_name: name, employee_salary: salary, employee_age: age, profile_img: ''})) ;
            dispatch({type: 'addEmployee', payload: {employee_name: name, employee_salary: salary, employee_age: age, profile_img: ''}})
            if(callback){
                callback();
                }
            }
           catch (error) {
            if (error.response) {
              alert(error.response.data.message);
              alert('error number'+error.response.status)
            } else if (error.request) {
              console.log(error.request);
            } else {
             
              console.log('Error', error.message);
            }
            console.log(error.config);
          }
    }
}

const deleteEmployee = (dispatch)=>{
    return async (id) =>{
        try{ 
            const response = await dummyApi.delete(`/delete/${id}`);
            dispatch({type: 'deleteEmployee', payload: id});
            }
           catch (error) {
            if (error.response) {
              alert(error.response.data.message);
              alert('error number'+error.response.status)
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          }
    }
}

const editEmployee = (dispatch)=>{
    return async (id,name,salary,age,callback) =>{

        try{ 
            const response = await dummyApi.put(`/update/${id}`,{employee_name: name, employee_salary: salary, employee_age: age, profile_img: ''})
            dispatch({type: 'editEmployee', payload: {id: id,employee_name: name, employee_salary: salary, employee_age: age, profile_img: ''}})
            callback({id,employee_name: name, employee_salary: salary, employee_age: age});
            }
           catch (error) {
            if (error.response) {
              alert(error.response.data.message);
              alert('error number'+error.response.status)
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          }
        }
    }

export const {Context,Provider} = createDataContext
    (employeesReducer,{addEmployee: addEmployee, deleteEmployee: deleteEmployee, editEmployee: editEmployee,getEmployees: getEmployees, orderBy: orderBy},[]);