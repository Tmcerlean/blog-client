import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginErr, setLoginErr] = useState(false);

    let history = useHistory();
    
    const isUsernameValid = username.length > 0;
    const isPasswordValid = (password !== '' && password.length > 5);
    const isLoginValid = isUsernameValid && isPasswordValid;

    useEffect(() => {
        document.title = 'Login';
    }, []);

    const logIn = async (e, username, password) => {

        e.preventDefault();

        const data = {username, password}
        const formData = JSON.stringify(data);

        try {
          const req = await fetch(
            "https://shrouded-retreat-49775.herokuapp.com/api/login",
            {
              method: "POST",
              body: formData,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          const myJson = await req.json();
          if (req.status !== 200) {
            setLoginErr(true);
            return;
          }
          localStorage.setItem("token", myJson.token);
          localStorage.setItem("userAuth", true);
          history.go(0)
        } catch (err) {
          console.log(err)
          setLoginErr(true);
        }
    }

    return (
      <div className="my-24 container w-full mx-auto flex flex-col flex-wrap">
          <div className="container shadow-md rounded m-auto w-4/5 md:w-1/2 flex flex-wrap justify-center bg-white shadow-new">
              <h1 className="text-3xl font-bold m-4">Blog.</h1>
              <form className="flex flex-wrap justify-center" onSubmit={(e) => logIn(e, username, password)}>
                  <input 
                      className="border rounded w-9/12 p-1 mb-2 pl-2 bg-gray-100 outline-none" 
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
                  <input 
                      className="border rounded w-9/12 p-1 mb-4 pl-2 bg-gray-100 outline-none" 
                      name="password"
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                      className={`border rounded w-9/12 p-1 mb-4 bg-blue-400 text-white font-medium ${isLoginValid ? "cursor-pointer" : "bg-opacity-50 cursor-default"}`}
                      type="submit"
                  >Log In</button>
                  <div className="mb-4">
                      <p>Don't have an account? <Link to={ROUTES.SIGNUP} className="font-medium text-blue-500 cursor-pointer">Sign up</Link></p>
                  </div>
                  <br />
                  {loginErr && <p className="text-xs text-red-600">Error with login information</p>}
              </form>
          </div>
      </div>    
    )

}

export default Login;