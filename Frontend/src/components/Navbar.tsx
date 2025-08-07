'use client';

import React, { useState, useEffect } from 'react';
import { Cloud, Menu, X, User, LogOut, Home, Settings } from 'lucide-react';

// Mock auth hook - replace with your actual useAuth hook
const useAuth = () => ({
  user: { name: 'Salman', email: 'john@example.com' },
  isAuthenticated: false
});

const useLogoutMutation = () => {
  return [
    () => console.log('Logout clicked'),
    { isLoading: false, isSuccess: false }
  ] as const;
};

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const [logout, { isLoading }] = useLogoutMutation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20' 
          : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center group-hover:scale-105">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  TodoCloudy
                </span>
                <span className="text-xs text-gray-500 -mt-1">Task Management</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            {isAuthenticated && user && (
              <div className="hidden md:flex items-center space-x-8">
              <a href="/dashboard" className="nav-link group relative">
                <span className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-full transition-all duration-300"></div>
              </a>
              
              <a href="/profile" className="nav-link group relative">
                <span className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                <Settings className="w-4 h-4" />
                <span>Profile</span>
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-full transition-all duration-300"></div>
              </a>
              </div>
            )}

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                      <span className="text-xs text-gray-500">Welcome back!</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-red-50 hover:to-red-100 text-gray-700 hover:text-red-600 transition-all duration-200 hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className="px-6 py-2 rounded-xl bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:scale-105"
                  >
                    Get Started
                  </a>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ${
          isMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-4 py-4 bg-white/95 backdrop-blur-xl border-t border-gray-100">
            <div className="space-y-3">
              {isAuthenticated && user && (
                <>
                  <a href="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200">
                    <Home className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">Dashboard</span>
                  </a>
                  
                  <a href="/profile" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200">
                    <Settings className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">Profile</span>
                  </a>
                </>
              )}

              {isAuthenticated && user ? (
                <>
                  <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors duration-200 disabled:opacity-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <a
                    href="/login"
                    className="block w-full px-4 py-3 rounded-xl bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-center transition-colors duration-200"
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="block w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center shadow-lg transition-colors duration-200"
                  >
                    Get Started
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;

// 'use client';

// import Link from 'next/link';
// import { useAuth } from '@/hooks/useAuth';
// import { useLogoutMutation } from '@/features/auth/authApi';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import { toast } from 'react-hot-toast';

// export default function Navbar() {
//   const { user } = useAuth();
//   const [logout, { isLoading, isSuccess }] = useLogoutMutation();
//   const router = useRouter();

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success('Logged out successfully');
//       router.push('/login');
//     }
//   }, [isSuccess, router]);

//   return (
//     <nav className="bg-white shadow">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 justify-between">
//           <div className="flex">
//             <div className="flex flex-shrink-0 items-center">
//               <Link href="/dashboard">
//                 <span className="text-xl font-bold text-gray-900">
//                   TodoCloudy
//                 </span>
//               </Link>
//             </div>
//             <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//               <Link
//                 href="/dashboard"
//                 className="inline-flex items-center border-b-2 border-primary-500 px-1 pt-1 text-sm font-medium text-gray-900"
//               >
//                 Dashboard
//               </Link>
//               <Link
//                 href="/profile"
//                 className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
//               >
//                 Profile
//               </Link>
//             </div>
//           </div>
//           <div className="hidden sm:ml-6 sm:flex sm:items-center">
//             {user ? (
//               <>
//                 <span className="mr-4 text-sm font-medium text-gray-500">
//                   Hello, {user.name}
//                 </span>
//                 <button
//                   onClick={() => logout()}
//                   disabled={isLoading}
//                   className="rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
//                 >
//                   {isLoading ? 'Logging out...' : 'Logout'}
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/login"
//                   className="rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="ml-4 rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }