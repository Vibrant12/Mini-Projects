const endpoint="https://api.covid19india.org/state_district_wise.json";
let state={};
fetch(endpoint)
    .then((res)=>res.json())
    .then((datas)=>{
        
        for(let data in datas){
            state[data]={...datas[data]["districtData"]};
        }
        let html=` <div class="total-state-wise-cases">
        <div class="state-name tb">
            <button>State/UT</button>
        </div>
        <div class="total-state-wise-confirm">
             <button>Confirm</button>
        </div>
        <div class="total-state-wise-active">
             <button>Active</button>
        </div>
        <div class="total-state-wise-recover">
             <button>Recover</button>
        </div>
        <div class="total-state-wise-deceased">
             <button>Deceased</button>
        </div>
    </div>`;
        let total_active=0,total_confirm=0,total_recover=0,total_deceased=0;
        let tc=document.querySelector(".total-confirm");
        let ta=document.querySelector(".total-active");
        let tr=document.querySelector(".total-recover");
        let td=document.querySelector(".total-deceased");
        let cls;
        for(let name in state){
            let active=0,confirm=0,recover=0,deceased=0;
            for(let val in state[name]){
                active+=state[name][val].active;
                confirm+=state[name][val].confirmed;
                recover+=state[name][val].recovered;
                deceased+=state[name][val].deceased;
            }
            if(active==0)
                continue;
            total_active+=active;
            total_confirm+=confirm;
            total_recover+=recover;
            total_deceased+=deceased;
            tc.innerHTML=`Confirm <p>${total_confirm}</p>`;
            ta.innerHTML=`Active <p>${total_active}</p>`;
            tr.innerHTML=`Recover <p>${total_recover}</p>`;
            td.innerHTML=`Deceased <p>${total_deceased}</p>`;
            console.log(name)
            if(name=="Andaman and Nicobar Islands")
                 cls="andaman";
            else if(name=="Dadra and Nagar Haveli and Daman and Diu")
                 cls="dadra";
            else
                 cls="";
            html+=` <div class="total-state-wise-cases ">
            <div class="state-name">
                <button class="${cls}">${name}</button>
            </div>
            <div class="total-state-wise-confirm">
                 <button class="${cls}">${confirm}</button>
            </div>
            <div class="total-state-wise-active">
                 <button class="${cls}">${active}</button>
            </div>
            <div class="total-state-wise-recover">
                 <button class="${cls}">${recover}</button>
            </div>
            <div class="total-state-wise-deceased">
                 <button class="${cls}">${deceased}</button>
            </div>
        </div>`
        }
        let st=document.getElementsByClassName("table");
        st[0].innerHTML=html;
        const stName=document.querySelectorAll(".total-state-wise-cases");
        console.log(stName[0].style);
        stName.forEach((node)=>{
            if(node.className=="");
        })
    })