import { IAPIResponseWrapper } from "./authApi"
import baseApi from "./baseApi"
import { Review } from "./types"
export const getAllReviews = async ()=> { 
try { 
    const res= await baseApi.get<IAPIResponseWrapper<Review[]>>(`/reviews`)
return res.data
}catch (error :any) { 
    throw new Error(error.message)
}
}

