import axios from "axios";

const { createContext } = require("react");

export let WishListContext = createContext();
export default function WishListContextProvider(props){

    let headers ={
        token : localStorage.getItem('userToken')
    }

    function addToWishList(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        productId
        },{
            headers
        }).then((response)=> response )
        .catch((err)=>err)
    }
    function getWishList(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers
        }).then((response)=> response )
        .catch((err)=>err)
    }
    function deleteWishList(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers
        }).then((response)=> response )
        .catch((err)=>err)
    }


    return <WishListContext.Provider value={{addToWishList ,getWishList ,deleteWishList}}>
{props.children}
    </WishListContext.Provider>
}

