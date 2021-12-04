const initialstate = {  
    employees: [
        {
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
        
        },
        {
          "id": 2,
          "name": "Ervin Howell",
          "username": "Antonette",
          "email": "Shanna@melissa.tv",
          
        },
        {
          "id": 3,
          "name": "Clementine Bauch",
          "username": "Samantha",
          "email": "Nathan@yesenia.net",
          
        },
        {
          "id": 4,
          "name": "Patricia Lebsack",
          "username": "Karianne",
          "email": "Julianne.OConner@kory.org",
         
        },
        {
          "id": 5,
          "name": "Chelsey Dietrich",
          "username": "Kamren",
          "email": "Lucio_Hettinger@annie.ca",
         
        },
        
      ]
}; 

const reducer = (state = initialstate, action) => {
    console.log(action.payload);
    switch (action.type) {   

        case 'GET_EMPLOYEE':    
            return {    
                ...state ,
                employees:action.payload
            };    
        case 'ADD_EMPLOYEE':    
            return {    
                //...state,    
                //employees: state.employees.concat(action.payload)  

                employees: [...state.employees,action.payload] 
                
            };    
        case 'EDIT_EMPLOYEE':    
            return {    
                ...state,    
                employees: state.employees.map(    
                    content => content.id == action.payload.id ? {...content,name : action.payload.name ,  email : action.payload.email }    
                                            : content)    
            };    
        case 'DELETE_EMPLOYEE':    
            return {    
                ...state,    
                employees: state.employees.filter(item => item.id !== action.payload)     //ye employee state ke andar jo employee hai wo hai
            };    
        default:    
            return state;    
    }    

}
export default reducer; 