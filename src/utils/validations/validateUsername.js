const ValidateUsername = (str)=>{
    let array = "abcdefghijklmnopqrstuvwxyz1234567890_-."
    return str.split('').every(char=>{
        if(array.includes(char.toLowerCase())){
            return true
        }else{
            return false
        }
    })
}

export default ValidateUsername