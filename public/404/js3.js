

let start = 0;//zlicza czas
let time1;//funkcja czasu
let ruch = false;//czy czas jest wlaczont
let wykonane = false;//czy zrobilo powieksszenie
const textinput = document.getElementById("numberinto");
let info;
let last;
let made = false;
function time() {
     start += 1; 
     if(start>2)
     {
     info = 2;
     ruch=false;
     clearInterval(time1);
     wykonane=true;
     }
    }
function myFunction() {
    
    info = 3;
    
  }
  
  $("#przycisk").mousedown(function(){
    
    if(ruch == false)
    {
     
     start = 0;
     ruch = true;
     time1 = setInterval(time,100);
     wykonane = false;
    }
    
    
    
    
    else if(start>2  )
    {
     wykonane = true;
     
     sizesmall();  
     info = 2;
    
    }
   });
   
   $("#przycisk").mouseup(function(){
     
    
  
    
    clearInterval(time1);
    if(wykonane==false)
    {
     if(start>1)
     {
        
         info = 2;
     }
    else if(start<2)
    {
        
        info = 1;
    }
    last=info;
    ruch =false;
    }
    // tu potrzebny kod 
    // wyślij do api POST call z body JSON.stringify(dataObject)
    //
    
  
    if(info === null || info == 0)
    {
        info = 0;
    }
   
    
    //  dataObject,JSON  )
    const dataObject = {
        code: info
    };
    	$.post( "https://human-tech-hackaton-22.vercel.app/api/computer-code",dataObject );
    
    ruch=false;
    });
