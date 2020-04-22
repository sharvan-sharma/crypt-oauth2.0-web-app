const ContainsSpecialChars = (str)=>{
    const array = 'abcdefghijklmnopqrstuvwxyz1234567890'
    let flag = str.split('').every(char=>{
        if(array.includes(char.toLowerCase())){
            return true
        }else{
            return false
        }
    })

    return !flag
}

export default ContainsSpecialChars