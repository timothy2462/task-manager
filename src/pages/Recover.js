import Wrapper from "../components/Wrapper"
import styled from "./Recover.module.css"
import { useState } from "react"


export const Recover = () => {

  const [email, setEmail] = useState('')

  const [error, setError] = useState({
    state: Boolean,
    success: Boolean,
    message: '',
  })

  const handleChange = (e) => { 
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => { 
    e.preventDefault()
    
    const submitEmail = await fetch('https://centraldb.onrender.com/api/v1/taskmanager/auth/recover', {
    method: 'POST',
      headers: {
      "Content-Type": "application/json",
      },
    body: JSON.stringify({email}),
    })
    const response = await submitEmail.json()

    if(!response.success) {
      setError({
        state: true,
        success: response.success,
        message: response.message,
      })
      return
    }

    setError({
      state: true,
      success: response.success,
      message: response.message,
    })

    setInterval(() => {
      window.location.replace("/register")
    }, 3500);

    setEmail('')
  }

  return (
    <Wrapper>
      <div className={styled.recover}>

        <form className={styled.form} onSubmit={handleSubmit}>
          <h5>Enter your email reset your account</h5>

          <div className={styled.input}>
            <input
              name='email'
              type="email"
              onChange={handleChange}
              value={email}
              required
            />
            <label>Email address</label>
          </div>


          <button type="submit">Reset</button>
          {
            error.state
            &&
            <p className={error.success ? styled.success : styled.error}>
              {error.message}
            </p>
          }
        </form>
      </div>
    </Wrapper>
  )
}
