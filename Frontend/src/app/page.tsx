'use client';

import React, { useEffect, useState } from 'react';
import { 
  Cloud, 
  ArrowRight,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff
} from 'lucide-react';
import Features from '@/components/Features';

const SplitHeroAuth = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div>
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Half - Hero Content */}
      <div className="flex-1 bg-white relative overflow-hidden flex items-center min-h-[50vh] lg:min-h-screen">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 lg:top-20 left-5 lg:left-10 w-48 lg:w-72 h-48 lg:h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 lg:bottom-20 right-5 lg:right-10 w-56 lg:w-80 h-56 lg:h-80 bg-cyan-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 lg:py-0">
          {/* Logo */}
          <div className={`mb-6 lg:mb-8 flex justify-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl shadow-2xl shadow-blue-500/25 flex items-center justify-center">
                <Cloud className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="block text-gray-900">Task Management</span>
            <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed transition-all duration-1000 delay-400 px-4 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Collaborate in real-time with your team. <br className="hidden sm:block" />
            <span className="text-blue-600 font-semibold">Stay organized, stay productive.</span>
          </p>
        </div>
      </div>

      {/* Right Half - Auth Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-[50vh] lg:min-h-screen">
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl p-6 sm:p-8 border border-gray-100">
            {/* Form Header */}
            <div className="text-center mb-6 lg:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Get Started'}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {isLogin ? 'Sign in to your account' : 'Create your account'}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4 sm:space-y-6">
              {/* Name Field (Sign Up Only) */}
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required={!isLogin}
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>

              {/* Confirm Password (Sign Up Only) */}
              {!isLogin && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required={!isLogin}
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 sm:py-3 px-6 text-sm sm:text-base rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Toggle Form */}
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-sm sm:text-base text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Features />
    </div>
  );
};

export default SplitHeroAuth;

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { 
//   Cloud, 
//   ArrowRight,
//   Play
// } from 'lucide-react';
// import Features from '@/components/Features';

// const HomePage = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      
//       {/* Hero Section */}
//       <section className="relative overflow-hidden">
//         {/* Background Elements */}
//         <div className="absolute inset-0">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//           <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
//           <div className="text-center">
            
//             {/* Logo Animation */}
//             <div className={`mb-8 flex justify-center transition-all duration-1000 ${
//               isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//             }`}>
//               <div className="relative">
//                 <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl shadow-2xl shadow-blue-500/25 flex items-center justify-center animate-float">
//                   <Cloud className="w-10 h-10 text-white" />
//                 </div>
//                 <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-ping"></div>
//                 <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse"></div>
//               </div>
//             </div>

//             {/* Main Heading */}
//             <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 delay-200 ${
//               isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//             }`}>
//               <span className="block text-gray-900">Task Management</span>
//               <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
//                 Made Simple
//               </span>
//             </h1>

//             {/* Subtitle */}
//             <p className={`text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
//               isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//             }`}>
//               Collaborate in real-time with your team. Manage tasks efficiently. 
//               <span className="text-blue-600 font-semibold"> Stay organized, stay productive.</span>
//             </p>

//             {/* CTA Buttons */}
//             <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-600 ${
//               isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//             }`}>
//               <a
//                 href="/register"
//                 className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
//               >
//                 <span className="flex items-center space-x-2">
//                   <span>Get Started Free</span>
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </a>
              
//               <a
//                 href="/login"
//                 className="group px-8 py-4 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-blue-600 font-semibold rounded-2xl border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
//               >
//                 <span className="flex items-center space-x-2">
//                   <Play className="w-5 h-5" />
//                   <span>Watch Demo</span>
//                 </span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Features/>
//     </div>
//   );
// };

// export default HomePage;


// // import { redirect } from 'next/navigation';
// // import { getServerSession } from '@/app/protected/getServerSession';
// // import Navbar from '@/components/Navbar';
// // import Footer from '@/components/Footer';

// // export default async function HomePage() {
// //   const session = await getServerSession();
  
// //   // Redirect authenticated users to dashboard
// //   if (session) {
// //     redirect('/dashboard');
// //   }

// //   return (
// //     <div className="min-h-screen flex flex-col">
// //       <Navbar />
      
// //       <main className="flex-grow">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
// //           <div className="text-center">
// //             <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
// //               <span className="block">Task Management</span>
// //               <span className="block text-primary-600">Made Simple</span>
// //             </h1>
// //             <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
// //               Collaborate in real-time with your team. Manage tasks efficiently.
// //             </p>
// //             <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
// //               <div className="rounded-md shadow">
// //                 <a
// //                   href="/register"
// //                   className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
// //                 >
// //                   Get Started
// //                 </a>
// //               </div>
// //               <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
// //                 <a
// //                   href="/login"
// //                   className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
// //                 >
// //                   Sign In
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </main>

// //       <Footer />
// //     </div>
// //   );
// // }