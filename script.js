let current;
let butHolder = document.getElementsByClassName('buttonsHolder')
let textBox=document.getElementById('textBox')
let form = document.getElementById('formInfo')
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];



 function cleanModal() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function clean(){
    document.getElementById("response").innerHTML = '';
    butHolder[0].innerHTML= '<button type="button"onclick="doAll()">Decide</button>';
    current = "";
    document.getElementById("textBox").value ="";

}

function doAll(){
    let arroz = document.getElementsByClassName("modal-content");
    let butHolder = document.getElementsByClassName('buttonsHolder')
    if(textBox.value == current && current !== ""){
       clean()
       arroz[0].innerHTML = `  <h2>OOPS!</h2>
       <p>Please do another THING</p>
       <button class="close" onclick="cleanModal()">Okay</button>`;
        modal.style.display = "block";
        return;
    }

    if(textBox.value==""){
        arroz[0].innerHTML = `  <h2>OOPS!</h2>
        <p>Please enter what you want to do.</p>
        <button class="close" onclick="cleanModal()">Okay</button>`;

        modal.style.display = "block";
     
        return;
    }
  
    current = textBox.value;
   
    if(document.getElementsByClassName("message")){
        document.getElementById("response").innerHTML = '';
    }
    fetch('https://shouldyoudoit.herokuapp.com/')
	.then(response => response.json())
	.then(data => 
        {
            document.getElementById("response").innerHTML +=`<p class="message">` + data.msg + "</p>"+  
                                                            `<img style="width:100%; height: 420px;border-radius:5px;"src=${data.img}>`;     
            butHolder[0].innerHTML= '<button style="width:49%" type="button" onclick="clean()">clean</button>'+ '<button style="width:49%" type="button" onclick="doAll()">Decide</button>';
        }
    )
	.catch(err => console.error(err));
   
}

let count = 0;
let allFetch = [];
function galleryImg(){
    let doItDiv = document.getElementById("doit");
    let dontDoItDiv = document.getElementById("dontdoit");
   
    if (count !== 0){
        for(const current in allFetch){
            console.log(current);
            if(data[current].msg == "do it"){
                doItDiv.innerHTML +=  `<img alt="do it" src="${data[current].img}"></img> `
                allFetch.push({msg:`${data[current].msg}`, img:`{data[current].msg}` });
                continue;  
             }
             dontDoItDiv.innerHTML +=  `<img alt="dont do it" src="${data[current].img}"></img> `
             allFetch.push({msg:`${data[current].msg}`, img:`{data[current].msg}` });
        }
    }
    count ++;
    fetch('https://shouldyoudoit.herokuapp.com/all')
	.then(response => response.json())
	.then(data =>{
        for(const current in data){
            console.log(current);
            if(data[current].msg == "do it"){
                doItDiv.innerHTML +=  `<img alt="do it" src="${data[current].img}"></img> `
                allFetch.push({msg:`${data[current].msg}`, img:`{data[current].msg}` });
                continue;  
             }
             dontDoItDiv.innerHTML +=  `<img alt="dont do it" src="${data[current].img}"></img> `
             allFetch.push({msg:`${data[current].msg}`, img:`{data[current].msg}` });
        }
           
    });
}



