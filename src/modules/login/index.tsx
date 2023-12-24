import React, { useState } from "react"
import "./login.css"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { userDetails } from "./constants"

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)

  const history = useHistory()

  const handleLogin = () => {
    const token = "true"

    setLoading(true)
    axios
      .post(`https://fakestoreapi.com/auth/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("hasLoggedIn", token)
          history.push("/products-list")
        } else {
          setError("Incorrect username or password")
        }
      })
      .catch((error) => {
        console.error("Error during login:", error.message)
        setError("An error occurred during login")
      })

    setLoading(false)
  }

  const handleRegistration = () => {

    const token = "true"
    setLoading(true)

    axios
      .post(`https://fakestoreapi.com/users`, {
        ...userDetails,
        username: username,
        password: password,
        email: email
      })
      .then((response) => {

        if (response.data.id) {
          localStorage.setItem("hasLoggedIn", token)
          localStorage.setItem("userId", response.data.id)
          history.push("/products-list")
        } else {
          setError("Registration failed. Please try again.")
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error.message)
        setError("An error occurred during registration")
      })

    setLoading(false)
  }

  const handleToggleMode = () => {
    setIsRegistering((prev) => !prev)
  }

  return (
    <div className="container">
      <div className="login-container">
        <div className="login-header">
          <h2>{isRegistering ? "Register" : "Login"}</h2>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isRegistering && (
            <div className="form-group">
              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
          )}
          {loading ? (
            <button type="button" disabled>
              Loading...
            </button>
          ) : (
            <div className="button-container">
              <button
                onClick={isRegistering ? handleRegistration : handleLogin}
              >
                {isRegistering ? "Register" : "Login"}
              </button>
              <button onClick={handleToggleMode}>
                {isRegistering ? "Switch to Login" : "Switch to Register"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
