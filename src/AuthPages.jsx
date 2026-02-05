import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import './AuthPages.css';

export default function AuthPages() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      if (isLogin) {
        // Login
        const userCredential = await signInWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
        
        // Check if email is verified
        if (!userCredential.user.emailVerified) {
          alert('⚠️ Please verify your email first! Check your inbox for verification link.');
          await auth.signOut();
          setLoading(false);
          return;
        }
        
        console.log('Login successful:', userCredential.user);
        alert('✅ Login successful! Welcome back!');
        navigate('/home');
      } else {
        // Register
        if (formData.password !== formData.confirmPassword) {
          alert('❌ Passwords do not match!');
          setLoading(false);
          return;
        }
        
        if (formData.password.length < 6) {
          alert('❌ Password should be at least 6 characters!');
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // Update user profile with name
        await updateProfile(userCredential.user, {
          displayName: formData.name
        });

        // Send email verification
        await sendEmailVerification(userCredential.user);

        console.log('Registration successful:', userCredential.user);
        
        // Sign out the user until they verify email
        await auth.signOut();
        
        alert('✅ Registration successful! \n\n📧 Verification email sent to ' + formData.email + '\n\nPlease verify your email before logging in. Check your inbox (and spam folder).');
        
        // Switch to login mode
        setIsLogin(true);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      }
    } catch (error) {
      console.error('Error:', error);
      
      // User-friendly error messages
      let errorMessage = 'An error occurred. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = '❌ This email is already registered! Please login instead.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = '❌ Invalid email address!';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = '❌ Password should be at least 6 characters!';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = '❌ No user found with this email!';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = '❌ Incorrect password!';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = '❌ Invalid email or password!';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = '❌ Too many failed attempts. Please try again later.';
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      alert('❌ Please enter your email address first!');
      return;
    }

    setLoading(true);
    
    try {
      await sendPasswordResetEmail(auth, formData.email);
      alert('✅ Password reset email sent! \n\n📧 Check your inbox at ' + formData.email + '\n\nClick the link in the email to reset your password.');
      setIsForgotPassword(false);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      console.error('Password reset error:', error);
      
      let errorMessage = 'Failed to send reset email. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = '❌ No account found with this email!';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = '❌ Invalid email address!';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = '❌ Too many requests. Please try again later.';
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign-in successful:', result.user);
      alert('✅ Google sign-in successful!');
      navigate('/home');
    } catch (error) {
      console.error('Google sign-in error:', error);
      
      let errorMessage = 'Google sign-in failed. Please try again.';
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = '❌ Sign-in cancelled. Please try again.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = '❌ Popup blocked by browser. Please allow popups and try again.';
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setIsForgotPassword(false);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="auth-container">
      <div className="auth-card-wrapper">
        {/* Card */}
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <h1 className="auth-title">
              {isForgotPassword ? 'Reset Password' : (isLogin ? 'Welcome Back!' : 'Create Account')}
            </h1>
            <p className="auth-subtitle">
              {isForgotPassword ? 'Enter your email to reset password' : (isLogin ? 'Sign in to continue' : 'Sign up to get started')}
            </p>
          </div>

          {/* Form */}
          <div className="auth-form-container">
            {isForgotPassword ? (
              // Forgot Password Form
              <div className="auth-form">
                <div className="form-group">
                  <label className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>

                <button
                  onClick={handleForgotPassword}
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>

                <div className="toggle-form" style={{ marginTop: '1rem' }}>
                  <button
                    type="button"
                    onClick={toggleForgotPassword}
                    className="toggle-btn"
                    disabled={loading}
                  >
                    ← Back to Login
                  </button>
                </div>
              </div>
            ) : (
              // Login/Signup Form
              <div className="auth-form">
                {!isLogin && (
                  <div className="form-group">
                    <label className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your name"
                      required={!isLogin}
                      disabled={loading}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                  />
                </div>

                {!isLogin && (
                  <div className="form-group">
                    <label className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Confirm your password"
                      required={!isLogin}
                      disabled={loading}
                    />
                  </div>
                )}

                {isLogin && (
                  <div className="forgot-password-container">
                    <button
                      type="button"
                      className="forgot-password-btn"
                      onClick={toggleForgotPassword}
                      disabled={loading}
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                </button>
              </div>
            )}

            {/* Divider & Social Login - Hide for forgot password */}
            {!isForgotPassword && (
              <>
                {/* Divider */}
                <div className="divider">
                  <div className="divider-line"></div>
                  <span className="divider-text">OR</span>
                  <div className="divider-line"></div>
                </div>

                {/* Social Login */}
                <div className="social-login">
                  <button 
                    className="google-btn" 
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                  >
                    <svg className="google-icon" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="google-text">Continue with Google</span>
                  </button>
                </div>

                {/* Toggle */}
                <div className="toggle-form">
                  <p className="toggle-text">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      type="button"
                      onClick={toggleForm}
                      className="toggle-btn"
                      disabled={loading}
                    >
                      {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="auth-footer">
          © 2024 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
}