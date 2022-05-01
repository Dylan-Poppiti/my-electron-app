
const counter = document.getElementById('counter')
const r = document.getElementById('output')

function noReload(e,data){
    e.preventDefault()
    console.log(nam.innerText);
    window.api.send("u-value",nam.innerText)
  
    
}
//adjusts the value of output element on html
window.electronAPI.finText((event,value)=>{
    r.innerText=value
}
)

//pulls value from the name html element 
window.electronAPI.handleCounter((event, value) => {
    const nam = document.getElementById('name')

    value.a = nam.value
    
    var sen = nam.value
    
    event.sender.send('u-value',sen)
    
    value.a=nam.value
})


