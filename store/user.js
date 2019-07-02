export const state=()=>{

   return{
    userInfo:{
        token:"",
        user:""
    }
   }
}
export const mutations={
    
    setUserInfo(state,data){
        state.userInfo=data
    // console.log(data)        
    },
    clearUserInfo(state){
        state.userInfo={
            token:"",
            user:""
        }
    // console.log(data)        
    }
}