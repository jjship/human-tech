let strona = 2;
let duzastrona = false;
let zliczanie=0;
const strony = document.getElementById("strona").children;
const comp = document.getElementById("computer");
const tlo = document.getElementById("tlo");
const stronaSI = document.getElementById("stronaSI");
const stronaLem = document.getElementById("stronaLem");
const stronaAn = document.getElementById("stronaAn");
const instrukcja = document.getElementById("instrukcja");
let SIY = 0;
var start = 0;//zlicza czas
var time1;//funkcja czasu
var ruch = false;//czy czas jest wlaczont
var wykonane = false;//czy zrobilo powieksszenie
function time() { start += 1; }
let pierwszyczas;///doubleclick
let drugiczas;
let czas1;//dozmienienia
let czas2;
let elementbaza = 0;
let czyzrobione = false;

 //new
 setInterval("refresh()",3000);
 function refresh()
{
    $.get( "https://human-tech-hackaton-22.vercel.app/api/computer-code ",function( data )
        {
            
            elementbaza = data.code;
            console.log(elementbaza);
        } );
        animacjakomputer();
        if (elementbaza != 0)
        {

            dataObject = {
                code: 0,
                
            };
                $.post( "https://human-tech-hackaton-22.vercel.app/api/computer-code",dataObject );
                

        }
        
}
function animacjakomputer()
{
    if(elementbaza == 1)
    {
        if(duzastrona==false)
        {
            nastepnastrona();
        }
        

    }
    else if(elementbaza == 2 )
    {
        if(duzastrona==false)
        {
            sizebig();
        }
        else
        {
            sizesmall();
            duzastrona=false;
        }
        
    }
    else if(elementbaza == 3)
    {
        if(duzastrona==false)
        {
            sizebig();
        }
        else
        {
            sizesmall();
            duzastrona=false;
        }
    }
    else if(elementbaza == 4)
    {
        if(strona%3==0)
               {
                SIY -= 200;
                stronaSI.scrollTo(0,SIY);
                wykonane=true;
               }
    }
}
$("body").keypress(function(){
    refresh();
   if(ruch == false)
   {
    
    start = 0;
    ruch = true;
    time1 = setInterval(time,100);
    wykonane = false;
   }
   
   
   if(start>2 && wykonane == false && duzastrona != true)
   {
    wykonane = true;
    
    sizebig();
    
       
   }
   
   else if(start>2 && wykonane == false && duzastrona == true)
   {
    wykonane = true;
    duzastrona = false;
    sizesmall();  
    
     
   }
  });
  
  $("body").keyup(function(){
    
   
 
   if(start<2)
   {
       if(pierwszyczas==0)
       {
           pierwszyczas = Date.now();
       }
       else
       {
           drugiczas = Date.now();
           
           if(drugiczas-pierwszyczas<250)
           {
               if(strona%3==0)
               {
                SIY -= 200;
                stronaSI.scrollTo(0,SIY);
                wykonane=true;
               }
               
           }
           pierwszyczas=drugiczas;
            drugiczas = 0;
       }
       
   }
   clearInterval(time1);
   if(wykonane==false)
   {
    if(duzastrona == true)
    {
        if(strona%3==0)
        {
            SIY += 100;
            stronaSI.scrollTo(0,SIY);
        }
        else
        {
            duzastrona = false;
            sizesmall()
        }
        ;
    }
   else if(start<2)
   {
       nastepnastrona();
   }
   }
   
   ruch=false;
   });

  
function sizebig()
{
    
    comp.classList.remove("opacityanimation2");
    comp.classList.add("opacityanimation");
    tlo.classList.remove("opacityanimation2");

    tlo.classList.add("opacityanimation");
    instrukcja.classList.remove("opacityanimation2");

    instrukcja.classList.add("opacityanimation");
    if(strona%3==0)
    {
        stronaSI.scrollTo(0,0);
        stronaSI.classList.remove("opacityanimation");
        stronaSI.classList.add("opacityanimation2");
    }
    if(strona%3==1)
    {
        stronaLem.scrollTo(0,0);
        stronaLem.classList.remove("opacityanimation");
        stronaLem.classList.add("opacityanimation2");
    }
    if(strona%3==2)
    {
        stronaAn.scrollTo(0,0);
        stronaAn.classList.remove("opacityanimation");
        stronaAn.classList.add("opacityanimation2");
    }
    
    duzastrona = true;
    strony[strona%3].classList.remove("sizeanimation2");
    void  strony[strona%3].offsetWidth;
    strony[strona%3].classList.add("sizeanimation");
    
    
    
    
}

function sizesmall()
{
    
    comp.classList.remove("opacityanimation");
    comp.classList.add("opacityanimation2");
    tlo.classList.remove("opacityanimation");
    tlo.classList.add("opacityanimation2");
    instrukcja.classList.remove("opacityanimation");
    instrukcja.classList.add("opacityanimation2");
    if(strona%3==0)
    {
        stronaSI.classList.remove("opacityanimation2");
        stronaSI.classList.add("opacityanimation");
        SIY = 0;
        
    }
    if(strona%3==1)
    {
        stronaLem.classList.remove("opacityanimation2");
        stronaLem.classList.add("opacityanimation");
        
        
    }
    if(strona%3==2)
    {
        
        stronaAn.classList.remove("opacityanimation2");
        stronaAn.classList.add("opacityanimation");
    }

    strony[strona%3].classList.remove("sizeanimation");
    void  strony[strona%3].offsetWidth;
    strony[strona%3].classList.add("sizeanimation2");
    
    
}

function nastepnastrona() {
    {
       
        strony[strona%3].classList.remove("sizeanimation2");
        strony[strona%3].classList.remove("animacja3");
        strony[strona%3].classList.add("animacja1");
        strona++;
        strony[strona%3].classList.remove("animacja2");
        strony[strona%3].classList.add("animacja3");
        strony[(strona+1)%3].classList.remove("animacja3");
        strony[(strona+1)%3].classList.add("animacja2");
       

    }
}
