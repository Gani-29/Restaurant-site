import { useState } from 'react';
import { User, Lock, Loader2 } from 'lucide-react';
import { supabase } from "../supabase_config";


const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C39.756 34.976 44 28.3 44 20c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.01C18.343 21.128 22 16.991 22 12z"></path>
  </svg>
);

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false); 
  const [signupSuccess, setSignupSuccess] = useState(''); 

  // Email & Password Login --------------------------------
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setSignupSuccess('');

    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } 
  };

  // NEW: Email & Password Sign Up -------------------------
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSignupSuccess('');

    if (!email || !password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: email.split('@')[0] } 
      }
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else if (data.user) {
      setSignupSuccess("Success! Check your email to confirm your account before logging in.");
      setIsSigningUp(false); 
      setEmail('');
      setPassword('');
    }
  };
    
  // Helper to switch between forms
  const toggleMode = () => {
      setIsSigningUp(!isSigningUp);
      setError('');
      setSignupSuccess('');
      setEmail('');
      setPassword('');
  };

  const handleSubmit = isSigningUp ? handleSignUp : handleSignIn; 

  // Google Login 
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) setError(error.message);
  };

  // Facebook Login 
  const loginWithFacebook = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });

    if (error) setError(error.message);
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden md:grid md:grid-cols-2">
        
        {/* Form Section */}
        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-bold mb-2">
            {isSigningUp ? 'SIGN UP' : 'LOGIN'}
          </h2>

          <p className="text-gray-500 mb-8">
            {isSigningUp ? 'Create your new account to start ordering.' : 'Welcome back! Please login to continue.'}
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password (min 6 chars)"
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {signupSuccess && <p className="text-sm text-green-600 font-semibold">{signupSuccess}</p>}

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              disabled={loading}
            >
              {loading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
              {loading 
                ? (isSigningUp ? 'Creating account...' : 'Logging in...') 
                : (isSigningUp ? 'Create Account' : 'Login now')}
            </button>
          </form>

          {/* Toggle Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            {isSigningUp ? 'Already have an account?' : 'New here?'}
            <button 
                onClick={toggleMode} 
                className="text-blue-600 hover:underline ml-1 font-medium"
                type="button"
            >
                {isSigningUp ? 'Sign In' : 'Create an Account'}
            </button>
          </p>
          
          <div className="mt-8">
            <p className="text-center text-gray-500 mb-4">
              {isSigningUp ? 'Or sign up with' : 'Login with Others'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={loginWithGoogle}
                className="flex-1 flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <GoogleIcon />
                <span className="font-medium text-gray-700">{isSigningUp ? 'Sign up with Google' : 'Login with Google'}</span>
              </button>

              <button
                onClick={loginWithFacebook}
                className="flex-1 flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <FacebookIcon />
                <span className="font-medium text-gray-700">{isSigningUp ? 'Sign up with Facebook' : 'Login with Facebook'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Section */}
        <div className="hidden md:flex items-center justify-center bg-gray-900 p-12">
          <div className="bg-gray-800 rounded-3xl p-8 max-w-sm mx-auto">
            <h3 className="text-white text-3xl font-semibold text-center leading-relaxed">
              Very good <br />
              works are <br />
              waiting for <br />
              you. {isSigningUp ? 'Sign Up' : 'Login'} <br />
              Now!!!
            </h3>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
