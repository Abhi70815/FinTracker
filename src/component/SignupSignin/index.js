import React, { useState } from 'react'
import './style.css'
import Input from '../input'
import Button from '../Button';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, doc, provider, setDoc } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';

const SignupSignInComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);

  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);

    console.log("name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("confirmPassword", confirmPassword);

    // Authenticate the user, or basically create a new account using email and pass
    if (name !== '' && email !== '' && password !== '' && confirmPassword !== '') {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("User>>", user);
            toast.success("user Created!")
            navigate('/dashboard')
            setLoading(false);

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            // Create a doc with user id aa the following id
            createDoc(user)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage)
            toast.error(errorCode);
            // setLoading(false);
            setLoading(false);



          });
      } else {
        toast.error("Password and Confirm Password dont't match ")
      }
    }
    else {
      toast.error("All field are mandatory");
      setLoading(false);

    }
  }

  function loginUsingEmail() {
    console.log("Email", email);
    console.log("password", password);
    setLoading(true);
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success("User Logged In!");
          console.log("User Log>>>", user)
          setLoading(false);
          navigate('/dashboard')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          toast.error(errorCode);
          setLoading(false)
        });
    } else {
      toast.error("All feilds are mandatory!")
      setLoading(false);
    }
  }
  async function createDoc(user) {
    setLoading(true);

    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email,
          photoUrl: user.photoUrl ? user.photoUrl : "",
          createdAt: new Date(),
        });
        toast.success("Doc created!");
        setLoading(false);
      }
      catch (e) {
        toast.error(e.message)
        setLoading(false);

      }
    } else {
      toast.error("user Already exists");
      setLoading(false);

    }
  }

  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("Google>>>", user);
        toast.success("user authenticated! ");
        createDoc(user);
        setLoading(false);
        navigate('/dashboard');
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
       toast.error(errorCode);
       toast.error(errorMessage);
        
      })
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
   
  }
  return (
    <>
      {loginForm ? (
        <div className='signup-wrapper'>
          <h2 className='title'>Sign Up on <span style={{ color: "var(--theme)" }}>FinTracker</span></h2>
          <form>

            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"abc@gmail.com"}
              type={"email"}
            />
            <Input
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Exp@123"}
              type={"password"}
            />

            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login using Email and Password"}
              onClick={loginUsingEmail}

            />
            <p style={{ textAlign: "center" }}>or</p>
            <Button text={loading?"Loading...":"Login using Google"} blue onClick={googleAuth} />
            <p style={{ textAlign: "center", margin: 0 }} onClick={() => setLoginForm(false)}> or Don't have an account Already? Click Here</p>
          </form>
        </div>
      ) :
        (<div className='signup-wrapper'>
          <h2 className='title'>Sign Up on <span style={{ color: "var(--theme)" }}>FinTracker</span></h2>
          <form>
            <Input label={"Full Name"}
              state={name} setState={setName}
              placeholder={"John Doe"}
              type={"text"}
            />
            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"abc@gmail.com"}
              type={"email"}
            />
            <Input
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Exp@123"}
              type={"password"}
            />
            <Input
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Exp@123"}
              type={"password"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup using Email and Password"}
              onClick={signupWithEmail}

            />
            <p style={{ textAlign: "center" }}>or</p>
            <Button
              text={loading ?"Loading...":"signup using Google"}
              blue
              onClick={googleAuth}
            />
            <p
              style={{ textAlign: "center", margin: 0 }}
              onClick={() => setLoginForm(true)}
            >
              or Have an account Already? Click Here</p>
          </form>
        </div>)
      }
    </>
  )
}

export default SignupSignInComponent