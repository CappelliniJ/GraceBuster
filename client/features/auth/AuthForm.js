import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { authenticate } from '../../app/store'
import Footer from '../footer/Footer'

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const formName = evt.target.name
    const username = evt.target.username.value
    const password = evt.target.password.value
    dispatch(authenticate({ username, password, method: formName }))
  }

  return (
    <div className="login">
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div className="login-container">
            <div className="actual-login-box">
              <div>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error.message}
                  </div>
                )}
                <label htmlFor="username">
                  <small>Username</small>
                </label>
                <input name="username" type="text" />
              </div>
              <div>
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input name="password" type="password" />
              </div>
              <div>
                <button className="login-btn" type="submit">
                  {displayName}
                </button>
              </div>
              {error && <div> {error.message} </div>}
            </div>
          </div>
        </form>

        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  )
}

export default AuthForm;
