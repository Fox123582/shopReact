export default {
    getFromLocalstorage: ()=> JSON.parse(localStorage.getItem('person')) || [],
    saveToLocalstorage: (elem)=> localStorage.setItem('person',JSON.stringify(elem)),
    resetLocalStorage: ()=> localStorage.clear()
}