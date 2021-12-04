
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router,Route, Link,Switch } from "react-router-dom";
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {addEmployee} from '../Actions/employeeAction';
import {
  
    TextField,
   
  } from '@material-ui/core';
  import { useSelector, useDispatch } from "react-redux";
  
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const validationSchema = Yup.object().shape({

name: Yup.string()
    .required('Prem is required'),
    
email: Yup.string()
.email('Email is invalid')
.required('Email is required'),
});
  

 const  AddEmployee=(props)=>{

  const dispatch = useDispatch();
  //const classes = useStyles();
  const history = useHistory();
  const { register,reset, handleSubmit, formState:{ errors,isValid } } = useForm({
    mode: "onChange" ,// I want to change it to onBlur
    resolver: yupResolver(validationSchema),
      });

    const onSubmit = (data,e) => {
        //e.preventDefault()
      console.log(data);
     // props.addUser(data);
     dispatch(addEmployee(data)) 
      history.push("/");
      //to clear field after adding user
      //e.target.reset();
    reset()
    }
   

return(
<>
<Grid container spacing={2}>
  <Grid item xs={3} >
    
  </Grid>
  <Grid item xs={6} >
  <Card sx={{ minWidth: 275 }} style={{ marginTop: 30, backgroundColor: '#f0f0f0' }}>
      <CardContent>
      <div className="card m-3" >
            <h5 className="card-header"  style={{display:'flex',justifyContent: 'center'}} >User Form</h5>
            <div className="card-body" style={{display:'flex',justifyContent: 'center'}} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row" style={{paddingBottom:10}}>
                        
                        <div className="form-group col-5">
                            <label style={{paddingRight:10}}>Name</label>
                            <input name="name" type="text" placeholder="Enter Your Name" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        
                        <div className="form-group col-5">
                            <label style={{paddingRight:10}}>Email</label>
                            <input name="email" type="text"  placeholder="Enter Your Email" {...register('email') } className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                    </div>
                    
                    <div style={{paddingTop:18,display:'flex',justifyContent: 'center'}} className="form-group">
            
                        <Button variant="contained"  type="submit" disabled={!isValid}  color="secondary">Submit</Button>
                        
                        {/* <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button> */}
                    </div>
                </form>
            </div>
        </div>
      </CardContent>
      
    </Card>
  
  </Grid>
  <Grid item xs={3} >
  
  </Grid>
</Grid>
</>
)


}

const mapDispatchToProps = dispatch => {
  return {
    addUseraddUser: (data) => {  
      dispatch(addEmployee(data)) 
    }
  }
}

// export default connect(
//   null,
//   mapDispatchToProps
// )(AddEmployee)

export default AddEmployee;