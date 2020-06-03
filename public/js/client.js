console.log("Client side JS loaded!!")

const button = document.querySelector('#search')
const gifInput = document.querySelector('#gif')
const trendingBtn = document.querySelector('#trends')



API_key = 'Upu1PbcVEcikCbr4wFjRcrND4OeSfbIS'
filters = '&limit=7'
gifurl = 'https://api.giphy.com/v1/gifs/search?api_key=Upu1PbcVEcikCbr4wFjRcrND4OeSfbIS&q='
trendurl = "https://api.giphy.com/v1/trending/searches?api_key=Upu1PbcVEcikCbr4wFjRcrND4OeSfbIS"


// button.addEventListener('click',(e)=>{
//     e.preventDefault()
//     const q = gifInput.value
//     fetch(gifurl+q+filters)
//     .then((res) => {return res.json()})
//     .then((payload)=>{
//         //const gifdata = JSON.parse(data)
//         console.log(payload.data)
//         document.querySelector('#title').innerHTML = payload.data[0].title
//         document.querySelector('#gifholder').src = payload.data[0].images.fixed_height.url
        
//     })
//     //document.querySelector('#gifholder').innerHTML = "Heyyyy"
// })


//Using fetch is not real-time..Use Asychronous JS n XML instead
// gifInput.addEventListener('keyup',(e)=>{
//     //e.preventDefault()
//     console.log(gifInput.value)
//     //document.getElementById("gif").value = ""
//     var chars = gifInput.value
//     fetch(gifurl+chars+filters)
//     .then((res) => {return res.json()})
//     .then((payload)=>{
//         //const gifdata = JSON.parse(data)
//         console.log(payload.data)
//         document.querySelector('#title').innerHTML = payload.data[0].title
//         document.querySelector('#gifholder').src = payload.data[0].images.fixed_height.url
        
//     })
// })

gifInput.addEventListener('keyup',(e)=>{
    var chars = gifInput.value
    var mygiphy = new XMLHttpRequest()
    mygiphy.open('GET',gifurl+chars+filters)
    mygiphy.onload = ()=>{
        console.log(JSON.parse(mygiphy.responseText))
        const payload = JSON.parse(mygiphy.responseText)
        document.querySelector('#title').innerHTML = payload.data[0].title
        document.querySelector('#gifholder').src = payload.data[0].images.downsized_medium.url
        createHTML(payload.data)
    }
    mygiphy.send()
})

createHTML = (a)=>{
    console.log("crazyy")
    for(var i=1; i<a.length;i++){
        var s = i.toString(10)
        document.querySelector('#gifholder'+s).src = a[i].images.original.url
    }
}


trendingBtn.addEventListener('click',(e)=>{
    fetch(trendurl)
    .then((payload)=>{
        //const gifdata = JSON.parse(data)
        console.log(payload)  
    })
})