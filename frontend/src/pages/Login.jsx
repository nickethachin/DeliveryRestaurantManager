import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { email, password } = formData

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
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start the system</p>
        <section className="form">
          <form onSubmit={onSubmit}>
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
              <button type="submit" className="btn btn-block">Login</button>
            </div>
          </form>
        </section>
      </section>
    </>
  )
}

export default Login