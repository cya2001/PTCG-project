export function setSearchHistory(query){
    let his = JSON.parse(sessionStorage.getItem('searchHistory')) || []
    if(!his.includes(query)){
        his.push(query)
    }
    return sessionStorage.setItem('searchHistory',JSON.stringify(his))
}

export function getSearchHistory(){
    return sessionStorage.getItem('searchHistory')
}