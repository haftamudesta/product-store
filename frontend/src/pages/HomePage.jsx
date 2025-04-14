import React, { useEffect,useState } from 'react'
import { useProductStore } from '../store/useProductStore'
import { PlusCircleIcon, RefreshCwIcon, PackageIcon } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';

const HomePage = () => {
        const {loading,error,products,fetchProducts}=useProductStore();
        const [isOpen,setIsOpen]=useState(false)
        const handleRefresh=()=>{
                fetchProducts()
        }
        useEffect(()=>{
                fetchProducts()
        },[fetchProducts])

  return (
    <main className='max-w-6xl mx-auto px-4 py-8'>
         <AddProductModal isOpen={isOpen} setIsOpen={setIsOpen}/>
        <div className='flex justify-between items-centermb-8'>
                <div className='relative'>
                        {/* <div className='absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-indigo-900 rounded-2xl blur-8xl opacity-50 animate-pulse p-2'></div> */}
                        <button className='flex gap-2 bg-green-400 text-white rounded-full px-2 py-1.5 mb-2 cursor-pointer z-50'
                        onClick={()=>setIsOpen(true)}
                        >
                                <PlusCircleIcon className='size-5 mr-2'/>
                                Add Product
                        </button>
                </div>
                <button onClick={handleRefresh}>
                        <RefreshCwIcon className='size-5' />
                </button>
        </div>
        {error && 
        <div className='text-red-500 mb-8'>
                {error}
        </div>
        }
        {
        products.length===0 &&!loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
               <div className="bg-gray-200 rounded-full p-6">
                    <PackageIcon className="size-5" />
               </div>
               <div className="text-center space-y-2">
                    <h3 className="text-2xl font-semibold">No product found</h3> 
                    <p className="max-w-sm text-gray-500">
                        Get started by adding product to the store
                     </p>
               </div>
        </div>
        )
        }
        {loading?(
                <div className='flex justify-center items-center h-64'>
                        <div>
                                Loading...
                        </div>
                </div>
        ):(
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        {products.map((product)=>(
                                <ProductCard key={product.id} product={product}/>
                        ))}
                </div>
        )}
    </main>
  )
}

export default HomePage