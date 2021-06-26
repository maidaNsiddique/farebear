import React from 'react'
import './login.css'
const Login = (props) => {
  {
    const {
      email,
      setEmail,
      password,
      setPassword,
      handleLogin,
      handleSignup,
      hasAccount,
      setHasAccount,
      emailError,
      passwordError,
    } = props
    return (
      <div>
        <section className='main'>
          <form>
            <div className='title'>
              <p>Continue with Farebear</p>
            </div>
            <input
              className='number'
              type='email'
              align='center'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className='errorMsg'>{emailError}</p>
            <input
              className='number'
              type='password'
              align='center'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className='errorMsg'>{passwordError}</p>
            <div>
              {hasAccount ? (
                <>
                  <button className='continue' onClick={handleLogin}>
                    Sign in
                  </button>
                  <p className='button'>
                    Don't have an account ?
                    <span
                      className='button-item'
                      onClick={() => setHasAccount(!hasAccount)}
                    >
                      {' '}
                      Sign up
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <button className='continue' onClick={handleSignup}>
                    Sign up
                  </button>
                  <p className='button'>
                    Have an account ?
                    <span
                      className='button-item'
                      onClick={() => setHasAccount(!hasAccount)}
                    >
                      {' '}
                      Sign in
                    </span>
                  </p>
                </>
              )}
            </div>
          </form>
        </section>
      </div>
    )
  }
}
export default Login
