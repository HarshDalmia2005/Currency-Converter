const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns= document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button")
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(currcode in countryList){
        let newoption=document.createElement("option");
         newoption.innerText=currcode;
         newoption.value=currcode;
         if (select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
          } else if (select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
          }
         select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{

        updateflag(evt.target);
    });
}



const updateExchangeRate = async () => {
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval=="" || amtval<1){
        amtval=1;
        amount.value="1";
    }

    const newURL=`${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    let response=await fetch(newURL);
    let data=await response.json()
    
    let rate=data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    
    let finalamt=amtval*rate;
    msg.innerText=`${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
}

const updateflag=(element)=>{
   
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
}); 

window.addEventListener("load", () => {
    updateExchangeRate();
  });