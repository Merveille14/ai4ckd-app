
import { Badge } from "@/components/ui/badge"
import { Users ,HeartHandshake } from "lucide-react"
import Mychart from "./ui/mychart"
import { User } from "./users"

export default function EcommerceMetrics() {
  return (
    <div>
    
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
    <div className="shadow-lg hover:shadow-2xl hover:translate-1 transition"> <Mychart  /></div>
     <div className="  grid gap-4">
         {/* <!-- Metric Item Start --> */}
         <div className="rounded-2xl shadow-lg hover:shadow-2xl hover:translate-1 transition border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Users className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div >
            <span className="text-sm text-gray-500 dark:text-gray-400">
             Nombres de patients
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              3,782
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border shadow-lg hover:shadow-2xl hover:translate-1 transition border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
      
        <HeartHandshake  className="text-gray-800 size-6 dark:text-white/90"/>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Orders
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              5,359
            </h4>
          </div>

          <Badge color="error">
       
            9.05%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
      
     </div>
   
    </div>
    <div className=" shadow-lg"><User></User></div>
    </div>
  )
}
