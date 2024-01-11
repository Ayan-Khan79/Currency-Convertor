// Some defined varibles and link to api
let base_url ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
let dropDown = document.querySelectorAll("select");
const button = document.querySelector(".button-64");
const fromCurr = document.querySelector(" .from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".footer p");

// Loop to add the options of country code to the both select
for(let i = 0; i<dropDown.length;i++){
    let select = dropDown[i];
    for(let code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name==="to" && code ==="INR"){
            select.selected = "selected";
        }
        else if(select.name==="from" && code ==="USD"){
            select.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}


// Function to update Flag
const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;

}
// Adding Event LIstner to the button for click and performing function according to that
button.addEventListener("click", async (evt)=>{
    let amount = document.querySelector("#input");
    let amtValue = amount.value;
    if(amtValue==="" || amtValue<0){
        amtValue=1;
        amount.value="1";
    }
    const url =`${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
   let data = await response.json();
   let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amtValue*rate;
    msg.innerText=`${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});