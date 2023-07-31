import React from 'react';
import "./forms.css";
import { useForm } from 'react-hook-form';

const FormComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:7683/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form className='form-block' onSubmit={handleSubmit(onSubmit)}>
      <div className="form-element">
        <label>Name:</label>
        <input {...register('name', { required: 'Name is required', pattern: /^[A-Za-z]+$/i })} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div className='form-element'>
        <label>Email:</label>
        <input {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address' } })} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div className='form-element'>
        <label>Gender:</label>
        <input {...register("gender", {required: "Gender is required"})}>
        <select>
            <option value="she/her">she/her</option>
            <option value="he/him">he/him</option>
            <option value="them/they">them/they</option>
            <option value="other">other</option>
        </select>
        </input>
      </div>
      <div className='form-element'>
        <label>Age:</label>
        <input type="number" {...register("age", {min: 18, max: 99})} />
      </div>
      <button className='form-button' type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
