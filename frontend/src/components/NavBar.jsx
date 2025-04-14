import React from 'react'
import { Link, useResolvedPath } from 'react-router-dom'
import {ShoppingCartIcon,ShoppingBagIcon} from "lucide-react"
import ThemeSelector from './ThemeSelector'
import { useProductStore } from '../store/useProductStore'
import { useEffect, useState } from "react"
import { MoonIcon, SunIcon } from "lucide-react"

const NavBar = () => {
        const {pathname}=useResolvedPath();
        const isHomePage=pathname==="/";
        const {products}=useProductStore();
        const [darkMode,setDarkMode]=useState(()=>{
                const savedTheme=localStorage.getItem("theme")
                if(savedTheme){
                        return savedTheme==="dark"
                }else{
                        return window.matchMedia('(prefers-color-scheme:dark)').matches
                }
                
        });
        useEffect(()=>{
            if(darkMode){
              document.documentElement.classList.add("dark")
              localStorage.setItem("theme","dark")
            }else{
              document.documentElement.classList.remove("dark")
              localStorage.setItem("theme","light")
            }
          },[darkMode])
          const toggleDarkMode=()=>{
            setDarkMode(!darkMode)
          }
  return (
    <div className='bg-gray-200/80 backdrop-blur-lg border-b sticky z-50 top-0 border-current/10'>
        <div className='max-w-7xl mx-auto'>
                <div className='flex justify-between items-center px-4 min-h-[4rem]'>
                        <div>
                                <Link>
                                <div className='flex items-center gap-4'>
                                        <ShoppingCartIcon className="size-9 text-purple-500" />
                                        <span className='font-semibold font-mono tracking-widest text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600'>
                                                POSTGRESQL STORE
                                        </span>
                                </div>
                                </Link>
                        </div>
                        <div>
                       <div className='flex justify-center items-center gap-12'>
                        <div>
                        <button
                        onClick={toggleDarkMode}
                        className=" w-9 h-9 lg:w-10 lg:h-10 flex justify-center items-center rounded-full bg-amber-500 text-neutral-500 shadow-lg hover:bg-amber-600 transition-colors">
                                        {darkMode?(<SunIcon className="text-center"/>):(<MoonIcon className="text-center"/>)}
                        </button>
                        </div>
                        <div>
                        {isHomePage && (
                                        <div className='relative inline-block'>
                                                <div className='p-2 rounded-full hover:bg-gray-200'>
                                                <ShoppingBagIcon className='w-5 h-5' />
                                                <span className='absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                                                        {products.length}
                                                </span>
                                                </div>
                                        </div>
                                )}
                        </div>
                       </div>
                                
                        </div>
                </div>
        </div>
    </div>
  )
}

export default NavBar