import logo from './logo.svg';
import './App.css';
import reducer from './Reducers/employeeReducer';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"; 
import EmployeeComponent from './Component/employeeComponent'
import AddEmployee from './Component/AddEmployee';
import EditEmployee from './Component/EditEmployee';
function App() {
  return (
    <Router>
     <Switch>
     <Route exact path='/' component={EmployeeComponent}>
     <EmployeeComponent></EmployeeComponent>
     </Route>
     <Route exact path='/aduser' component={AddEmployee}></Route>
     <Route exact path='/edituser/:id' component={EditEmployee}></Route>
    </Switch>
</Router>
  );
}

export default App;
