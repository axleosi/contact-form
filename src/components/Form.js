import React, { useState } from 'react'
import './Form.css'
import * as Yup from 'yup'
import {useFormik} from 'formik'


const validationSchema = Yup.object({
    fname: Yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
    lname: Yup.string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    radio: Yup.string()
      .required('Please select a query type'),
    message: Yup.string().required('please type in a message').min(10, 'message must be more than 10 characters'),
    check: Yup.boolean()
      .oneOf([true], 'You must agree to the terms')
  });
const Form = () => {
    const{values,errors,touched,handleChange,handleBlur,setFieldValue, handleSubmit}=useFormik({
        initialValues:{
            fname:'',
            lname:'',
            email:'',
            radio:'',
            message:'',
            check: false
        },
        onSubmit:(values, e)=>{
            e.preventDefault()
            console.log(values)
        },
        validationSchema
    })

  return (
    <form className='contact-form' onSubmit={handleSubmit} action='#'>
        <div className='contact-us'>
            <h2>Contact Us</h2>
        </div>
        <div className='names'>
            <div className='name'>
                <label htmlFor='f-name'>First Name *</label>
                <input type='text' name='fname' id='fname' value={values.fname} onChange={handleChange}/>
            </div>
            {errors.fname && touched.fname?<p className='error'>{errors.fname}</p> : null}
            <div className='name'>
            <label htmlFor='l-name'>Last Name *</label>
            <input type='text' name='lname' id='lname' value={values.lname} onChange={handleChange}/>
            </div>
            {errors.lname && touched.lname?<p className='error'>{errors.lname}</p> : null}
        </div>
        {errors.fname && touched.fname?<p className='error'>{errors.fname}</p> : null}
        <div className='email'>
            <label htmlFor='email'>Email Address *</label>
            <input type='email' name='email' id='email' value={values.email} onChange={handleChange}/>
        </div>
        {errors.email && touched.email?<p className='error'>{errors.email}</p> : null}
        <div className='radio'>
            <label>Query Type</label>
            <div className='radio-s'>
                <div className='radio-a'>
                <label htmlFor='radio1'><input type='radio' id='radio1' name='radio' value='general' onChange={handleChange}/>
                General Enquiry</label>
                </div>
                <div className='radio-a'>
                <label htmlFor='radio2'><input type='radio' id='radio2' name='radio' value='support' onChange={handleChange}/>
                Support Request</label>
                </div>
            </div>
            {errors.radio && touched.radio?<p className='error'>{errors.radio}</p> : null}
        </div>
        <div className='message'>
            <label htmlFor='message'>Message</label>
            <textarea id='message' name='message' value={values.message} onChange={handleChange}></textarea>
        </div>
        {errors.message && touched.message?<p className='error'>{errors.message}</p> : null}
        <div className='check'>
            <input type='checkbox' id='consent' name='consent'  checked={values.check} onChange={(e) => setFieldValue({ ...values, check: e.target.checked })}/>
            <label htmlFor='consent'>I consent to being contacted by the team. *</label>
        </div>
        {errors.check && touched.check?<p className='error'>{errors.check}</p> : null}
        <button type='submit' className='submit-btn'>Submit</button>
    </form>
  )
}

export default Form