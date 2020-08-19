console.log("okay");
let symbols=new Object();
let rate={};
function evl(){
    fetch("http://data.fixer.io/api/latest?access_key=a547d1c8f81f06614005563b61a49508&format=1")
    .then(res=>res.json())
    .then((dt)=>{
    for(ta in dt['rates'])
    rate[ta]=dt['rates'][ta];
});
}
fetch("https://gist.githubusercontent.com/Fluidbyte/2973986/raw/8bb35718d0c90fdacb388961c98b8d56abc392c9/Common-Currency.json")
      .then(blob=>blob.json())
      .then((datas)=>{
          for(data in datas){
          symbols[data]={...datas[data]}
        }
        let select=document.querySelectorAll("select") ;  
        let native_symbol={};
        let native_code={};
        for(opt in symbols){
            select[0].innerHTML+=`<option value="">${symbols[opt].name}-${symbols[opt].symbol}</option>`;
            select[1].innerHTML+=`<option value="">${symbols[opt].name}-${symbols[opt].symbol}</option>`;
            let option=symbols[opt].name+'-'+symbols[opt].symbol;
            native_symbol[option]=symbols[opt].symbol;
            native_code[option]=symbols[opt].code;
        }
        let selectedOption1,selectedOption2;
        let tt1=-1,tt2=-1;
        select[0].addEventListener('change',(e)=>{
            e.preventDefault();
            selectedOption1=select[0].options[select[0].selectedIndex].text;
            let sym=document.getElementsByClassName("choose_1");
            sym[0].firstChild.data=native_symbol[selectedOption1];
        });
        select[1].addEventListener('change',(e)=>{
            e.preventDefault();
            selectedOption2=select[1].options[select[1].selectedIndex].text;
            let sym=document.getElementsByClassName("choose_2");
            sym[0].firstChild.data=native_symbol[selectedOption2];
            
        });

        let input=document.querySelectorAll("input");
        input[0].addEventListener('click',()=>{
            evl();
            input[0].style.removeProperty('border');
        });
        input[1].addEventListener('click', ()=>{
            evl();
            input[1].style.removeProperty('border');
        });

        input[0].addEventListener('input',(e)=>{
            //val1=rate[native_code[selectedOption1]];   
            tt1=input[0].value;
        })
        input[1].addEventListener('input',(e)=>{
            //val2=rate[native_code[selectedOption2]];
            tt2=input[1].value;               
        })
        let btn=document.querySelector("button");
        btn.addEventListener('click',(e)=>{
            e.preventDefault();
           let val1=rate[native_code[selectedOption1]];
           let val2=rate[native_code[selectedOption2]];
           console.log(val1,val2)
           if(val1==undefined||(tt1==-1&&tt2==-1)){
           input[0].style.border="1px solid red";

           }
           else if(val2==undefined||(tt1==-1&&tt2==-1)){
            input[1].style.border="1px solid red";
           }
            else if(tt2==-1)
                input[1].value=tt1*(val2/val1);
            else if(tt1==-1)
                input[0].value=tt2*(val1/val2);
            else
                input[1].value=tt1*(val2/val1);
        })
        
      });
      


  
     
