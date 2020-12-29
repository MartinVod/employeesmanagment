import React,{useState,createContext} from 'react'
export const UsersContext = createContext();

const UsersContextProvider = (props)=>{
    const [users,setUsers] = useState([{
        username: 'abcd', password: '1234'
    }])

    const [user, setUser] = useState(undefined)

    const login = (username,password,callback) =>{
            let result = users.find((user) => user.username === username && user.password === password);
            console.log('result');
            console.log(result);
            if (result !== undefined){
                setUser(result);
                if(callback){
                    callback();
                }
            }else{
                alert('invalid credentials')
            }
        }

        const addUser = (username,password,callback)=>{
            let result = users.find((user) => user.username === username);
            if( result !== undefined){
                alert('Username already in use')
            }else{
                setUsers([...users,{username: username,password: password}])
                setUser({username: username,password: password})
                if(callback){
                    callback();
                }
            }
        }
        
    
    const logout = (callback) =>{
            setUser(undefined);
            if(callback){
                callback();
            }
        }
    


    return (<UsersContext.Provider value={{users: users,userLogin: login,userLogout: logout,addUser: addUser,user: user }}>{props.children}</UsersContext.Provider>);
}

export default UsersContextProvider;