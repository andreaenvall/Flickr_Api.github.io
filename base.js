const btn = document.querySelector(".btn")
let ImgIndex = 0;
let pagecounter = 1;
let imgarray = [];

CreateImg()

async function ApiSearch() {
    imgarray = [];
    var images = document.getElementsByClassName('pictures');
    while (images.length > 0) {
        images[0].parentNode.removeChild(images[0]);
    }

    let searchFor = document.forms["myForm"]["input"].value;
    const response = await fetch("https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=8f0ae8840db405a70f58e25bd6cea2dd&text=" + searchFor + "&per_page=30&page=" + pagecounter + "&format=json&nojsoncallback=1");
    const data = await response.json();
   
    document.getElementById("h2").innerText = data.photos.total + " photos on '" + searchFor + "' were found ";
    document.getElementById("pages").innerText = "Page " + pagecounter + "/" + data.photos.pages;


    for (let photo of data.photos.photo) {

        const farmId = photo.farm;
        const serverId = photo.server;
        const id = photo.id;
        const secret = photo.secret;

        console.log(farmId);

        const url = 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg';
        imgarray.push(url);
        
    }
    await CreateImg();
};

btn.addEventListener("click", async function () {
    pagecounter = 1;
    ApiSearch();
});

async function CreateImg(){

for(let i = 0; i < imgarray.length; i++){

    console.log(imgarray[i]);
        const img = document.createElement("img");
        img.src = imgarray[i];
        img.setAttribute("class", "pictures");
        img.setAttribute("id", i)
        const gallary = document.getElementById("gallary");
        gallary.appendChild(img);

        img.addEventListener("click", function() {
            let imgModal = document.getElementById(i);
            let src = imgModal.getAttribute("src");
            console.log(src);
            document.getElementById("modalid").setAttribute("src",src);
            
            OpenImg();

        });
        
}
}

function OpenImg() {
   
    document.getElementById("myModal").style.display = 'block';
    
}

function CloseImg() {

    document.getElementById("myModal").style.display = 'none';
}


let counter = 1;

function PrevPage() {
    pagecounter--;

    if (pagecounter < 1) {
        swal("Sorry!", "...you are already on the first page");
        pagecounter = 1;
    }
    ApiSearch();

}

function NextPage() {
    console.log(pagecounter)
    pagecounter++;
    ApiSearch();

}

function currentImg(index) {
    ImgModal(index);
}

function ImgModal(index) {
    let i;
    let slides = document.getElementsByClassName("BigImg");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[index].style.display = "block";
}


/*window.onload = function () {
    setTimeout(function () {
        document.getElementById('popup').style.display = 'block';
    }, 20000);
}*/

function ClosePopUp() {
    document.getElementById('popup').style.display = 'none';
}

