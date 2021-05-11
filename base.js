const btn = document.querySelector(".btn")
let ImgIndex = 0;
let pagecounter = 1;
ApiSearch();

async function ApiSearch(){
    var images = document.getElementsByTagName('img');
    while(images.length > 0) {
    images[0].parentNode.removeChild(images[0]);}

  let searchFor = document.forms["myForm"]["input"].value;
  const response = await fetch("https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=8f0ae8840db405a70f58e25bd6cea2dd&text=" + searchFor + "&per_page=50&page=" + pagecounter + "&format=json&nojsoncallback=1")
  const data = await response.json()
  console.log(data.photos);

  //const obj = JSON.parse(response);
  document.getElementById("h2").innerText =  data.photos.total + " photos on '" + searchFor + "' were found " ;
  document.getElementById("pages").innerText = "Page " + pagecounter + "/" + data.photos.pages;
  

  for (let photo of data.photos.photo){
    
    const farmId = photo.farm
    const serverId = photo.server
    const id = photo.id
    const secret = photo.secret
  
    console.log(farmId)
  
    const url =  'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret +'.jpg'
    const img = document.createElement("img")
    img.src = url;
    img.setAttribute("class", "pictures");
    //img.setAttribute("id",  ImgIndex)
    img.setAttribute("onClick", "OpenImg();currentImg(" + ImgIndex + ")");
    const gallary = document.getElementById("gallary");
    gallary.appendChild(img);

    var next = document.getElementsByClassName('pictures');
    ImgIndex++;


    const divtag = document.createElement("div")
    divtag.setAttribute("class", "BigImg")
    const largeimg = document.getElementById("modal-content");
    largeimg.appendChild(divtag)
    divtag.style.display = 'none';

    const img2 = document.createElement("img");
    img2.src = url;
    img2.setAttribute("class", "Bigpicture");
    
    divtag.appendChild(img2)

  }
};

btn.addEventListener("click", async function(){
    pagecounter = 1;
    ApiSearch();

  //const dlt = document.getElementsByTagName("img")
  

});

function OpenImg(){

   
    document.getElementById("myModal").style.display = 'block';
 }

function CloseImg(){

        document.getElementById("myModal").style.display = 'none';
      }


let counter = 1;

 function PrevPage(){
    pagecounter--;
   
   if(pagecounter < 1){
    swal("Sorry!", "...you are already on the first page");
    pagecounter = 1;
   }
   ApiSearch();
   
}

 function NextPage(){
    console.log(pagecounter)
    pagecounter++;
    ApiSearch();

}

function SetValues(counter){
    var next = document.getElementsByClassName('pictures');

    if(counter == 1){

        for (var i = 0; i < next.length; i++) {
            if(i > 20)
            {
                next[i].style.display = 'none';

            }
            else{
                next[i].style.display = 'block';
            }
        
        }

    }

    if(counter == 2){
        for (var i = 0; i < next.length; i++) {
            if(i < 20 || i > 40)
            {
                next[i].style.display = 'none';

            }
            else{
                next[i].style.display = 'block';
            }
        
        }
        
    }
    if(counter == 3){
        for (var i = 0; i < next.length; i++) {
            if(i < 40 || i > 60)
            {
                next[i].style.display = 'none';

            }
            else{
                next[i].style.display = 'block';
            }
        
        }
        
    }
    if(counter == 4){
        for (var i = 0; i < next.length; i++) {
            if(i < 60 || i > 80)
            {
                next[i].style.display = 'none';

            }
            else{
                next[i].style.display = 'block';
            }
        
        }
        
    }
}

function currentImg(index) {
    ImgModal(ImgIndex = index);
  }

function ImgModal(index) {
    let i;
    let slides = document.getElementsByClassName("BigImg");
    if (index > slides.length) {
      ImgIndex = 1
    }
    if (index < 1) {
      ImgIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[ImgIndex].style.display = "block";
  }

  
  window.onload = function() {
    setTimeout(function() {
        document.getElementById('popup').style.display = 'block';
    }, 10000);
}

function ClosePopUp(){
    document.getElementById('popup').style.display = 'none';
}

  