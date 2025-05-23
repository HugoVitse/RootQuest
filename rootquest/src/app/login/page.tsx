'use client';
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  
  const [stateSignIn, setStateSignIn] = useState(true);
  const [stateSignUp, setStateSignUp] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [positionLeft, setPositionLeft] = useState(false); // Nouvel état pour la position
  const [positionRight, setPositionRight] = useState(false); // Nouvel état pour la position
  const [error, setError] = useState("");

  const [usernameSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");

  const [usernameSignUp, setUsernameSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordRetypeSignUp, setPasswordRetypeSignUp] = useState("");

  

  // Fonction de gestion du clic
  const handleClick = () => {
    setHidden(true);

    setTimeout(() => {
      setExpanded(true);
    }, 500);

    setTimeout(() => {
      setStateSignIn(!stateSignIn);
      setStateSignUp(!stateSignUp);
      setExpanded(false);
      setPositionLeft(!positionLeft);
    }, 1500); // 1500 ms correspond au temps nécessaire pour l'agrandissement

    setTimeout(() => {
      setHidden(false); // Remettre la div à sa position initiale
    }, 2500);
  };

  const SignIn = async (e:any) => {
    e.preventDefault()
    try {

      const req  = await axios.post("api/login", {
        username: usernameSignIn,
        password: passwordSignIn
      });

      router.push('/');
    }

    catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError && error.response?.status === 401) {
        setError("Invalid password");
      } else {
        setError("Error");
      }
    }
    


  };

  const SignUp = async (e:any) => {
    e.preventDefault()
    try {

      if(passwordSignUp !== passwordRetypeSignUp) {
        throw new Error("Passwords do not match");    
      }

      const req  = await axios.post("/api/register", {
        username: usernameSignUp,
        email : emailSignUp,
        password: passwordSignUp
      });

      router.push('/');
    }

    catch (error: unknown) {
      console.log(error);
      
      if (error instanceof AxiosError && error.response?.status === 401) {
        setError("Invalid password");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error");
      }
    }
    


  };

  return (
    <div>
      {/* State sign in */}
      {stateSignIn && (
        <div className="w-1/2 h-screen fixed top-0 left-0 scale-75 2xl:scale-150 xl:scale-125 lg:scale-110 sm:scale-100">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h1 className="text-3xl font-extrabold">Welcome back</h1>
              <h2 className="text-l tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      value={usernameSignIn}
                      onChange={(e) => setEmailSignIn(e.target.value)}
                      
                      name="email"
                      id="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-blue-700 hover:text-blue-600"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      value={passwordSignIn} 
                      onChange={(e) => setPasswordSignIn(e.target.value)}
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-700 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-blue-700"
                    onClick={SignIn}
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-2 text-sm text-gray-500">
                Not a member ?{" "}
                <span
                  className="cursor-pointer font-semibold text-blue-700 hover:text-blue-600"
                  onClick={handleClick}
                >
                  {" "}
                  Sign up here
                </span>
              </p>
              <p className="mt-2 text-sm text-red-500">
                {error}
                
              </p>
            </div>
          </div>
        </div>
      )}

      {/* State sign up */}
      {stateSignUp && (
        <div className="w-1/2 h-screen fixed top-0 right-0 scale-75 2xl:scale-150 xl:scale-125 lg:scale-110 sm:scale-100">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h1 className="text-3xl font-extrabold">Welcome</h1>
              <h2 className="text-l tracking-tight text-gray-900">
                Sign up for an account
              </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      value={usernameSignUp}
                      onChange={(e) => setUsernameSignUp(e.target.value)}
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-red-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      value={emailSignUp}
                      onChange={(e) => setEmailSignUp(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-red-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      value={passwordSignUp}
                      onChange={(e) => setPasswordSignUp(e.target.value)}
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-red-700 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="retype-password"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Retype Password
                  </label>
                  <div className="mt-2">
                    <input
                      value={passwordRetypeSignUp}
                      onChange={(e) => setPasswordRetypeSignUp(e.target.value)}
                      type="password"
                      name="retype-password"
                      id="retype-password"
                      autoComplete="new-password"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-red-700 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={SignUp}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-red-700"
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <p className="mt-2 text-sm text-gray-500">
                Already a member ?{" "}
                <span
                  className="cursor-pointer font-semibold text-red-700 hover:text-red-600"
                  onClick={handleClick}
                >
                  {" "}
                  Sign in here
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        className={`parent w-1/2 h-screen fixed top-0  transition-all duration-1000 ${
          expanded ? "w-full" : "w-1/2"
        } ${
          positionLeft
            ? "left-0 right-auto bg-red-400"
            : "right-0 left-auto bg-blue-400"
        } `}
      >
        {stateSignIn && (
          <img
            src="Cyber attack-pana-blue.svg"
            alt="Photo hacking"
            className={`child w-full h-full object-cover transition-opacity duration-500 ${
              hidden ? "opacity-0" : "opacity-100"
            }`}
          />
        )}

        {stateSignUp && (
          <img
            src="Cyber attack-pana-red.svg"
            alt="Photo hacking"
            className={`child w-full h-full object-cover transition-opacity duration-500 ${
              hidden ? "opacity-0" : "opacity-100"
            }`}
          />
        )}
      </div>
    </div>
  );
}
