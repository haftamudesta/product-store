import { Edit2Icon, Trash2Icon } from "lucide-react"
import { useProductStore } from "../store/useProductStore"
import { Link } from "react-router-dom"


const ProductCard = ({product}) => {
        const {deleteProduct}=useProductStore()
  return (
    <div className="shadow-xlhover:shadow-2xl transition-shadow duration-300 rounded-3xl mb-6 bg-blue-500/50 gap-20 mr-6 p-4">
        <div className=" ">
        <div className="">
                <img src={product?.image} alt={product?.name}
                className="object-cover w-[250px] h-[250px]"
                />
        </div>
        <div className="md:mt-6">
                <h2 className="text-3xl font-semibold">{product?.name}</h2>
                <p className="text-2xl font-semibold text-sky-600">${Number(product?.price).toFixed(2)}</p>
                <div className="flex gap-4 mt-2">
                        <Link to={`/product/${product?.id}`} className="text-green-400 inset-shadow-sm inset-shadow-amber-500 inst-ring-4 inset-ring-amber-500 bg-sky-700 px-4 py-1 flex justify-center items-center rounded-full">
                        <Edit2Icon className="size-4 mr-2"/> Edit
                        </Link>
                        <button
                        className="flex justify-center items-center rounded-full text-red-500 outline-amber-200 bg-pink-300 px-4 py-1"
                        onClick={()=>deleteProduct(product?.id)}
                        >
                                <Trash2Icon className="size-4 mr-2"/>Delete
                        </button>
                </div>
        </div>
        </div>
    </div>
  )
}

export default ProductCard