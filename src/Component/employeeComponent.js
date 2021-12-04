import React, { Component,useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'; 
import { useForm } from "react-hook-form";
import {deleteEmployee} from '../Actions/employeeAction';
import { useSelector, useDispatch } from "react-redux";


const EmployeeComponent=(props)=>{

console.log(props)

const  lists  = useSelector(state => state);

const dispatch = useDispatch();
//console.log("-->>>>>>>>>>>>>>>",lists)

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    fontSize: 23,
    
  },
  MuiTableCell: {
    color: "#000000",
    fontWeight: 'bold',
    lineHeight: 1.5,
  },
});

//console.log(props.todo.employees)
// useEffect(()=>{
// props.fetchEmployee()
// },[])  //square bracket isiliye diya taki ye infinite na chale bas jab compont load ho only taabhi chale
  const classes = useStyles();
    return ( 
        <>
         {/* {todo.text}
      <span onClick={destroyTodo}> x </span> */}
     
      <Grid container spacing={3} >
        <Grid item xs={3}>
        <Link to='/aduser' style={{ textDecoration: 'none', color: 'white' }}>
        <Button variant="contained"  style={{marginLeft:40,marginTop:40}}color="secondary">Add Employee</Button>
          </Link>
        
        </Grid>
        <Grid item xs={6} style={{marginTop:30}} style={{ marginTop: 30, backgroundColor: '#f0f0f0' }} >
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell className={classes.MuiTableCell} >ID</TableCell> */}
            <TableCell className={classes.MuiTableCell} align="right">NAME</TableCell>
            <TableCell  className={classes.MuiTableCell}  align="right">EMAIL</TableCell>
            <TableCell  className={classes.MuiTableCell}  align="right">Action</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {lists.employees.map((row) => (
            <TableRow key={row.id}>
              {/* <TableCell component="th" scope="row">
                {row.id}
              </TableCell> */}
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
              <Link to={`/edituser/${row.id}`} style={{ textDecoration: 'none', color: 'white' }}>
              <Button variant="contained"  style={{marginRight:20}}color="secondary">
            Edit
            </Button>
            </Link>
            {/* <Button variant="contained" onClick={()=>props.deleteEmployee(row.id)} color="secondary">
            Delete
            </Button> */}
            <Button variant="contained" onClick={()=>dispatch(deleteEmployee(row.id))} color="secondary">
            Delete
            </Button>

              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Grid>
        <Grid item xs={3}>
        
        </Grid>
      </Grid>
      
        </>

     );


    
}

//functional component me use use useSelectro, in class component we use below two mapStateTo props, mapDispatchToProps
//useSelector ans useDispatch is replacement of mapStateTo props, mapDispatchToProps.
//saga->middleware->like without login ..redirectct to dasboad ,midddelware just like ..work betwwen fronwnd and backend..middleware will 
//check authen..or autherization call is au e..then to do api call..
//saga is middleware , same as middle ware in experss, it works like if have no authentication then kisi route like dashboard or other pe access then
//usko acccess nahi milna chahoiye
//jaise ham express me karte samjte the middleware waise hi..

// const mapStateToProps = state => { //mapStatetoprop ko aisa socho ki isko state ka access hai
//     return {
//         todo: state //ye todo reducer se aa raha hai ,todo me  reducer ka initialstate hai;
//     }
//   }

  // const mapDispatchToProps = dispatch => {  //mapDispatchtoprops ko aisa scoho ki isko dispatch ka acces hai
  //   return {
  //     deleteEmployee: (data) => {  //ye deleteEmployee isi component pe jo onclick pe call kar rahe hai wo hai
  //       dispatch(deleteEmployee(data)) //// ye deleteEmployee employeeAction pe jo method hai wo hai.
  //     }                                   //dispatch ko actioncreator pass karte hai.
  //                                         //in normal dispatch to action hi karenge..
  //   }
  // }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(EmployeeComponent)

export default EmployeeComponent;