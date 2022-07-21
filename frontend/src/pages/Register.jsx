import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const { name, email, password, passwordConfirm } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.Value,
    }))
  } 

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input 
              type="text" 
              className="form-countrol" 
              id="name"
              name="name" 
              value={name} 
              placeholder='Please enter your name' 
              onChange={onChange} />
            </div>
            <div className="form-group">
              <input 
              type="email" 
              className="form-countrol" 
              id="email"
              name="email" 
              value={email} 
              placeholder='Enter email' 
              onChange={onChange} />
            </div>
            <div className="form-group">
              <input 
              type="password" 
              className="form-countrol" 
              id="password"
              name="password" 
              value={password} 
              placeholder='Enter password' 
              onChange={onChange} />
            </div>
            <div className="form-group">
              <input 
              type="password" 
              className="form-countrol" 
              id="passwordConfirm"
              name="passwordConfirm" 
              value={password} 
              placeholder='Confirm your password' 
              onChange={onChange} />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">Submit</button>
            </div>
          </form>
        </section>
      </section>
    </>
  )
}

export default Register