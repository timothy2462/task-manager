import { useState, useContext } from "react"
import Wrapper from "../components/Wrapper"
import styled from "./LoginPage.module.css"
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { useNavigate } from "react-router-dom"
import Main from "../store/ctx";
import { Loader } from "../components/Loader"

export const LoginPage = () => {

  const login = useContext(Main)

  const required = true

  const [input, setInput] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const [error, setError] = useState({
    state: Boolean,
    success: Boolean,
    message: '',
  })

  const [visible, setVisible] = useState(false)

  const passwordType = visible ? 'text' : 'password'

  const handleChange = (e) => {
    setError({
      state: false,
      success: '',
      message: '',
    })

    const { name, value } = e.target

    setInput(p => ({
      ...p,
      [name]: value
    }))
  }

  const togglePassword = () => {
    setVisible(p => !p)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    login.setLoading(true)
    const submit = await fetch('https://centraldb.onrender.com/api/v1/taskmanager/auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
    const response = await submit.json()
    if (!response.success) {
      setError({
        state: true,
        success: false,
        message: response.message,
      })
      login.setLoading(false)
      return
    }
    await login.setToken(response.token)
    login.setLoading(false)
    window.location.replace("/")
  }

  return (
    <>
      {
        login.loading
          ?
          <Loader />
          :
          <Wrapper>
            <div className={styled.login}>

              <form className={styled.form} onSubmit={handleSubmit}>
                <h3>Login to view you tasks</h3>

                <div className={styled.input}>
                  <input
                    name='email'
                    type="email"
                    onChange={handleChange}
                    value={input.email}
                    required={required}
                  />
                  <label>Enter your email address</label>
                </div>
                <div className={styled.input}>
                  <input
                    name='password'
                    type={passwordType}
                    onChange={handleChange}
                    value={input.password}
                    required={required}
                  />
                  <label>Enter password</label>
                  {
                    visible ?
                      <VisibilityOffRoundedIcon
                        className={styled.icon}
                        onClick={togglePassword}
                      />
                      :
                      <VisibilityRoundedIcon
                        className={styled.icon}
                        onClick={togglePassword}
                      />
                  }
                </div>

                <div className={styled.btns}>
                  <button type="submit">Login</button>
                  <button onClick={() => navigate("/register")}>Register</button>
                </div>
                {
                  error.state
                  &&
                  <p className={error.success ? styled.success : styled.error}>
                    {error.message}
                  </p>
                }
                <p onClick={() => navigate("/recover")} className={styled.recover}>Recover password</p>
              </form>
            </div>
          </Wrapper>
      }
    </>
  )
}
