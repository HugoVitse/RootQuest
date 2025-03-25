'use client';

export default function LoginPage() {
  return (
    <div>
        <div className="w-1/2 h-screen fixed top-0 left-0">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-3xl font-extrabold">Welcome back</h1>
            <h2 className="text-l tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
                <div className="mt-2">
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    autoComplete="email" 
                    required 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                </div>
                </div>

                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                    <div className="text-sm">
                    <a href="#" className="font-semibold text-blue-700 hover:text-blue-600">Forgot password?</a>
                    </div>
                </div>
                <div className="mt-2">
                    <input 
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
                <button type="submit" className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-blue-700">Sign in</button>
                </div>
            </form>

            <p className="mt-2 text-sm text-gray-500">
                Not a member ?  
                <a href="#" className="font-semibold text-blue-700 hover:text-blue-600"> Sign up here</a>
            </p>
            </div>
        </div>
      </div>

      <div className="parent w-1/2 h-screen fixed top-0 right-0 bg-blue-400">
        <img src="Cyber attack-pana.svg" alt="Photo hacking" className="child w-full h-full object-cover"/>
      </div>

    </div>
  );
}
