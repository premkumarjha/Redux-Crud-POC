

import React, {useState, useEffect, useCallback} from "react";
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import {deleteEmployee,addEmployee,updateEmployee} from '../Actions/employeeAction';
import { BrowserRouter as Router, Route, Link, Switch,useParams } from 'react-router-dom'; 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const EditEmployee=(props)=>{

    const classes = useStyles();
    const  lists  = useSelector(state => state);
    const dispatch = useDispatch();
    //to fetch id from url 
    let { id } = useParams();
console.log(lists)
    //let editedUser=props.todo.filter(data=>data.id==id); //editedUser me ak hi user object hai
    let editedUser=lists.employees.filter(data=>data.id==id);
    //converting above array into object,so that initial value me set kar sake;
  let  object = Object.assign({}, ...editedUser);

   // console.log(props.todo);

    const { register, handleSubmit ,reset,defaultValues } = useForm({defaultValues: { id: object.id, name: object.name,email: object.email }});

    const onSubmit = data => {
        //e.preventDefault();
      console.log(data);
     // props.editUser(data);
     dispatch(updateEmployee(data))
      //to clear field after update
     reset({defaultValues: { id: "", name: "",email: "" }});
     
    }
    

    console.log(id);
return (
<>

<Grid container spacing={3}>
        <Grid item xs={3} >
        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
        <Button variant="contained"  style={{marginLeft:40,marginTop:40 }} color="secondary">Go to Home</Button>
          </Link>
        
        </Grid>

        <Grid item xs={6} style={{marginTop:30}}>
        <Card className={classes.root} style={{marginRight:100,height:250,marginLeft:100,backgroundColor: '#f0f0f0'}}>
      <CardContent>
       
        {/* {editedUser.map(data=>( */}
            <div className="card m-3" >
            <h5 className="card-header"  style={{display:'flex',justifyContent: 'center'}} >Edit Form</h5>
            <div className="card-body" style={{display:'flex',justifyContent: 'center'}} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row" style={{paddingBottom:10}}>
                        
                        <div className="form-group col-5">
                            <label style={{paddingRight:10}}>Name</label>
                            <input name="name" type="text" placeholder="Enter Your Name" {...register('name')} />
                            {/* <div ="invalid-feedback">{errors.name?.message}</div> */}
                        </div>
                    </div>
                    <div className="form-row">
                        
                        <div className="form-group col-5">
                            <label style={{paddingRight:10}}>Email</label>
                            <input name="email" type="text"  placeholder="Enter Your Email" {...register('email') }  />
                            {/* <div className="invalid-feedback">{errors.password?.message}</div> */}
                        </div>
                    </div>
                    
                    <div style={{paddingTop:18,display:'flex',justifyContent: 'center'}} className="form-group">
            
                        <Button variant="contained"  type="submit"  color="secondary">Submit</Button>
                       
                        {/* <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button> */}
                    </div>
                </form>
            </div>
        </div>
           </CardContent>
    </Card>
        </Grid>
        <Grid item xs={3}>
        
        </Grid>
      </Grid>

    </>
)


}

// const mapStateToProps = state => {
//     return {
//       todo: state.employees
//     }
//   }

// const mapDispatchToProps = dispatch => {
//     return {
//         editUser: (data) => {  
//         dispatch(updateEmployee(data)) 
//       }
//     }
//   }
  
  // export default connect(
  //   mapStateToProps,
  //   mapDispatchToProps
  // )(EditEmployee)

  export default EditEmployee;