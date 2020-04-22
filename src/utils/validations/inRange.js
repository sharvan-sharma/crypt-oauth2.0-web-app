const inRange = (str,min=0,max)=>{
    if(str.length >= min && str.length <=max){
        return true
    }else{
        return false
    }
}

export default inRange