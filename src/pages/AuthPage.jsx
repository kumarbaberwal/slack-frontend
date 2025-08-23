import '../styles/auth.css'
import { SignInButton } from "@clerk/clerk-react"
import React from 'react'

const AuthPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-hero">

          <div className="brand-container">
            <img src="/logo.png" alt="Slap" className="brand-logo" />
            <span className="brand-name">Slap</span>
          </div>
          <h1 className="hero-title">Where Work Happens ✨</h1>
          <p className="hero-subtitle">
            Connect with your team instantly through secure, real-time messaging. Experience seamless collaboration with
            powerful features designed for modern teams.
          </p>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">💬</span>
              <span className="">Real-time messaging</span>
            </div>

            <div className="feature-item">
              <span className="feature-icon">🎥</span>
              <span className="">Video calls & meetings</span>
            </div>

            <div className="feature-item">
              <span className="feature-icon">🔐</span>
              <span className="">Secure & private</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage 