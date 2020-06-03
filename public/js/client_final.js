const button = document.querySelector('#search')
const gifInput = document.querySelector('#gif')
const trendingBtn = document.querySelector('#trends')
const instagif = document.querySelector('#joey')
const body = document.querySelector('#body')
const musicBtn = document.querySelector('#musicbtn')
const gifurl = 'https://api.giphy.com/v1/gifs/search?api_key=Upu1PbcVEcikCbr4wFjRcrND4OeSfbIS&limit=7&q='
let imgs = document.getElementsByTagName("img")

document.addEventListener('DOMContentLoaded', (e)=>{
    //e.preventDefault()
    setTimeout(()=>{
        loadIntro()
    }, 1500)
})

gifInput.addEventListener('keyup',(e)=>{
    //e.preventDefault()
    if ( (e.which==32)||(e.which==8)||(e.which <= 90 && e.which >= 48)){
    loadmusic()
    loadGifQuery()
    }
    
})

loadGifQuery = ()=>{
    var chars = gifInput.value
    var mygiphy = new XMLHttpRequest()
    mygiphy.open('GET',gifurl+chars)
    mygiphy.onload = ()=>{
        //console.log(JSON.parse(mygiphy.responseText))
        const payload = JSON.parse(mygiphy.responseText)
        console.log(payload)
        document.querySelector('#title').innerHTML = payload.data[0].title.replace("GIF","").toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
        //document.querySelector('#gifholder_link').href = payload.data[0].images.downsized_medium.url
        document.querySelector('#gifholder').src = payload.data[0].images.fixed_height.url
        document.querySelector('#gifholder').title = payload.data[0].title
        createHTML(payload.data)
    }
    mygiphy.send()
}

createHTML = (a)=>{
    //console.log("crazyy")
    for(var i=1; i<a.length;i++){
        var s = i.toString(10)
        //document.querySelector('#gifholder'+s+'_link').href = a[i].images.original.url
        document.querySelector('#gifholder'+s).src = a[i].images.fixed_width.url
        document.querySelector('#gifholder'+s).title = a[i].title
    }
}


instagif.addEventListener('click',(e)=>{
    e.preventDefault()
    random = ["Joey","Trump","Beiber","Macklemore","putin","Game of Thrones","Tom Cruise","Chandler","Uptown Funk","Sacred Games","The Office","Mark Zuckerburg","Facepalm","Dab","Bollywood","Cute Baby","The Social Network"]
    gifInput.value =  random[Math.floor(Math.random() * random.length)]
    loadmusic()
    loadGifQuery()
    
})

loadmusic = ()=>{
    var xhr = new XMLHttpRequest()
    var chars = gifInput.value
    xhr.open('GET','https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?lang=en,hi&limit=3&output=json&q='+chars)//https://cors-anywhere.herokuapp.com/
    xhr.onload = ()=>{
        var music = JSON.parse(xhr.responseText)
        var rand = getrandom(music.data)
        //console.log(music.data)
        document.querySelector('#music').src = music.data[rand].preview
    }
    xhr.send()
}



getrandom = (jsonfiledata)=>{
    return Math.floor(Math.random() * jsonfiledata.length)
}

loadIntro = ()=>{
    
        random = ["dostana","sholay","kabir singh","ariana","dil chahta hai","pewdiepie","eminem","kal ho na ho","hotline bling","koi mil gaya","dilwale","miguel herrera"]
        gifInput.value = random[Math.floor(Math.random() * random.length)];
        loadmusic()
        loadGifQuery()
    
}

var toggle = 0
var firstTimeOnLoad = true

musicBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    if ( toggle == 0)
    {   
        if (firstTimeOnLoad)
        {
            loadmusic()//coz you dont want to load new music everytime you hut the button
            firstTimeOnLoad = false
        }
        document.getElementById('musicbtn').style.color = '#bdbdbd'
        document.getElementById('musicbtn').style.backgroundColor = 'white'
        document.getElementById('music').muted = false
        document.getElementById('musicbtn').innerHTML = "||||||||||"
        setTimeout(()=>{document.getElementById('musicbtn').innerHTML = "Mute"},100)
        toggle = 1
        
    }
    else{
        document.getElementById('musicbtn').style.color ='white' 
        document.getElementById('musicbtn').style.backgroundColor = '#bdbdbd'
        document.getElementById('music').muted = true
        document.getElementById('musicbtn').innerHTML = "||||||||"
        setTimeout(()=>{document.getElementById('musicbtn').innerHTML = "Music"},100)
        toggle = 0
    }
})
console.log(imgs)

//var inputElem = document.getElementsByTagName('input');
arr = []

for(var i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', function(e){
        if (e.target && e.target.id){ //dynamic loading...event delegation
            e.preventDefault()
            let giftitle = document.getElementById(e.target.id).title
            giftitle = giftitle.replace("GIF","").replace("By","")
            console.log(giftitle)
            let words = giftitle.split(" ")
            let query = giftitle
            if ( words.length > 0 ){
                query = words.splice(0,2).join(" ")
            }
            gifInput.value = query
            console.log(gifInput.value)
            loadmusic()
            loadGifQuery()
    } 
    }, true);
}