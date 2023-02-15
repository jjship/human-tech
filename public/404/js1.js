let screenelement = 0;
let page = 0;
let sizeelement = 0;
let pageelement = 0;
let przewijanieelement = 0;
let info = "0";
let info2 = "0";
let wybor = 0;
let oldcode = 0;
let oldsize = 0;
let oldprzewijanie = 0;
let oldwybor = 0;
let oldid = 0;
let futureid = 0;

const idstrony = document.getElementById("strona").children;
const idcomputer = document.getElementById("computer");
const idqrcode = document.getElementById("qrcode");
const idqrdiv = document.getElementById("qrdiv");
const idtlo = document.getElementById("tlo");
const podstronaSI = document.getElementById("podstronaSI");
const podstronaTekstSI = document.getElementById("tekstSI");
const podstronaLem = document.getElementById("podstronaLem");
const podstronaPrzenikanie = document.getElementById("podstronaPrzenikanie");
const podstronaAn = document.getElementById("podstronaAn");
let id = Math.floor(Math.random()* (1000-100)+100);
let idlista = String(id);
var data = 956259420000

var qrcode = new QRCode(document.getElementById("qrcode"), {
	width : 100,
	height : 100
});
window.onload = function(){
    createqr()
    
}
function createqr()
{
    let nazwa = "jan.tlaga.com/index2.html?screen=" + String(id) + "&date=" +String(data);
    qrcode.makeCode(nazwa);
    futureid = Math.floor(Math.random()* (1000-100)+100);
    postid();
}

function refreshqr()
{
    data = Date.now();
    let nazwa = "jan.tlaga.com/index2.html?screen=" + String(futureid) + "&date=" +String(data);
    qrcode.makeCode(nazwa);
    oldid = id;
    
}
function restart()
{
     futureid = Math.floor(Math.random()* (1000-100)+100);
    
    if(futureid == id)
    {
        futureid = Math.floor(Math.random()* (1000-100)+100);
    }
    postid();
    wybor = 0;
    pageelement = 0;
    sizeelement = 0;
    
    if(oldsize != sizeelement)
    {
        funsize(0,4-page);
    }
    podstronaSI.classList.remove('opacityanimation2');
    podstronaPrzenikanie.classList.remove('opacityanimation2');
    podstronaLem.classList.remove('opacityanimation2');
    podstronaAn.classList.remove('opacityanimation2');
    podstronaSI.className = "restartopacity";
    podstronaPrzenikanie.className = "restartopacity";
    podstronaLem.className = "restartopacity";
    podstronaAn.className = "restartopacity";
    idqrcode.classList.remove("opacityanimation");
    idqrcode.classList.add("opacityanimation2");
    idqrdiv.classList.remove("opacityanimation");
    idqrdiv.classList.add("opacityanimation2");
    idcomputer.classList.remove("opacityanimation");
    idcomputer.classList.add("opacityanimation2");
    idtlo.classList.remove("opacityanimation");
    idtlo.classList.add("opacityanimation2");
    if(oldcode != 1)
    {
       setTimeout("funcode(3)",1000)
    }
    funprzewijanie(0);

    oldcode = 1;
    oldsize = 0;
    oldprzewijanie = 0;
}
function postid()
{
    dataObject =
    {
        code:String(id)+String(futureid)
    }

    $.post( "https://human-tech-hackaton-22.vercel.app/api/computer-code",dataObject );
}
setInterval("refresh()",1000);
function refresh()
{
    let idnew = 0;
    
    $.get( "https://human-tech-hackaton-22.vercel.app/api/computer-code",function( data )
       {
           info2 = data.code;
       });
    if((data != 956259420000 && Math.floor((Date.now()-Number(data)) / 1000)>89))
    {
        id = futureid;
        data = 956259420000;
        restart();
    }

    if(info2==0)
    {
        postid();
    }
    if(info2.length==3 && info2[0]+info2[1]+info2[2]==(futureid || id))
        {
    
            id = futureid;
            idnew = id;
            data = 956259420000;
            restart();
            
        }
    $.when(
        $.get( "https://human-tech-hackaton-22.vercel.app/api/computer-click",function( data )
        {
            info = data.clickMode;
        }).then(
            function ()
            {
                if(info.length>7)
                {
                 idnew = info[5]+info[6] + info[7];
                 idnew = Number(idnew);
                }
                
                
            
                if(idnew == id)
                { 
                    wybor = Number(info[4]);
                    pageelement = 10 * Number(info[2]) + Number(info[3])
                    sizeelement = Number(info[1]);
                    page = Number(info[0]);
                    
                    
                    if(oldid != id)
                    {
                        refreshqr();
                    }
                    if(oldsize != sizeelement)
                    {
                        funsize(sizeelement,4-page);
                    }
                    if(oldcode != page && sizeelement != 1)
                    {
                        funcode(4-page);
                    }
                    else if(oldcode != page && sizeelement == 1)
                    {
                        funcodebig(4-page,4-oldcode);
                    }
                    
                    if(oldprzewijanie != pageelement && page == 1)
                    {
                        funprzewijanie(pageelement);
                    }
                    if(wybor == 1 && page == 4 && oldwybor != 1)
                    {
                        
                        graph();
                        oldwybor =1;
                    }
                    else if(wybor == 0 && page == 4 && oldwybor == 1)
                    {
                        
                        graphclose();
                        oldwybor=0;
                    }
                    oldcode = page;
                    oldsize = sizeelement;
                    oldprzewijanie = pageelement;
                }
            }
        ))
   
     
       
}
function funprzewijanie( procent) {
   
    let stronaheight = podstronaTekstSI.offsetHeight;
    
    let pom =  Math.round(stronaheight*(procent/100));
    
    $('#podstronaSI').animate({scrollTop:pom},'50');
}
function funcode(strona)
{
             
    idstrony[strona%4].className = 'animacjaStrona2naPrzod';
    idstrony[(strona+1)%4].className = 'animacjaStronaPrzodnaTyl';
    idstrony[(strona+2)%4].className = 'animacjaStronaTylna3';
    idstrony[(strona+3)%4].className = 'animacjaStrona3na2';
   
    
}

function funsize(size,strona)
{

    if(size == 1)
    {
        idcomputer.classList.remove("opacityanimation2");
        idcomputer.classList.add("opacityanimation");
        idtlo.classList.remove("opacityanimation2");
        idtlo.classList.add("opacityanimation");
        idqrcode.classList.remove("opacityanimation2");
        idqrcode.classList.add("opacityanimation");
        idqrdiv.classList.remove("opacityanimation2");
        idqrdiv.classList.add("opacityanimation");
        
        if(strona%4==0)
        {
            podstronaAn.className = 'opacityanimation2';
        }
        else if(strona%4==1)
        {
            podstronaPrzenikanie.className = 'opacityanimation2';
        }
        else if(strona%4==2)
        {
            podstronaLem.className = 'opacityanimation2';
        }
        else if(strona%4==3)
        {
            podstronaSI.className = 'opacityanimation2';
        }
        
        idstrony[strona%4].className = 'animacjaRozmiar';
        
    }
    else
    {
       
        idqrcode.classList.remove("opacityanimation");
        idqrcode.classList.add("opacityanimation2");
        idqrdiv.classList.remove("opacityanimation");
        idqrdiv.classList.add("opacityanimation2");
        idcomputer.classList.remove("opacityanimation");
        idcomputer.classList.add("opacityanimation2");
        idtlo.classList.remove("opacityanimation");
        idtlo.classList.add("opacityanimation2");
        if(strona%4==0)
        {
            podstronaAn.className = 'opacityfastanimation';

            podstronaSI.classList.remove('opacityanimation2');
            podstronaPrzenikanie.classList.remove('opacityanimation2');
            podstronaLem.classList.remove('opacityanimation2');
        }
        else if(strona%4==1)
        {
            podstronaPrzenikanie.className = 'opacityfastanimation';

            podstronaSI.classList.remove('opacityanimation2');
            podstronaLem.classList.remove('opacityanimation2');
            podstronaAn.classList.remove('opacityanimation2');
            
        }
        else if(strona%4==2)
        {
            podstronaLem.className = 'opacityfastanimation';

            podstronaSI.classList.remove('opacityanimation2');
            podstronaPrzenikanie.classList.remove('opacityanimation2');
            podstronaAn.classList.remove('opacityanimation2');
        }
        else if(strona%4==3)
        {
            podstronaSI.className = 'opacityfastanimation';

            podstronaLem.classList.remove('opacityanimation2');
            podstronaPrzenikanie.classList.remove('opacityanimation2');
            podstronaAn.classList.remove('opacityanimation2');
           
        }
        

        idstrony[strona%4].className = 'animacjaRozmiarPowrot';
       
        
    }
    
}

function funcodebig(strona,usunstrona)
    {

        idstrony[strona%4].className = 'rozmiar';
        
        idstrony[usunstrona%4].className = 'animacjaStrona3naPrzod';
        idstrony[(strona+1)%4].className = 'animacjaStronaPrzodnaTyl';
        idstrony[(strona+2)%4].className = 'animacjaStronaTylna3';
        idstrony[(strona+3)%4].className = 'animacjaStrona3na2';
        if(strona%4==0)
        {
            podstronaAn.className = 'opacityfastanimation2';
        }
        else if(strona%4==1)
        {
            podstronaPrzenikanie.className = 'opacityfastanimation2';
        }
        else if(strona%4==2)
        {
            podstronaLem.className = 'opacityfastanimation2';
        }
        else if(strona%4==3)
        {
            podstronaSI.className = 'opacityfastanimation2';
        }
        if(usunstrona%4==0)
        {
            podstronaAn.className = 'opacityfastanimation';
        }
        else if(usunstrona%4==1)
        {
            podstronaPrzenikanie.className = 'opacityfastanimation';
        }
        else if(usunstrona%4==2)
        {
            podstronaLem.className = 'opacityfastanimation';
        }
        else if(usunstrona%4==3)
        {
            podstronaSI.className = 'opacityfastanimation';
        }

    }
    function graph()
    {
        $.when(
            getVote())
        .then(
                function()
                {
                    document.getElementById('poll2').style.display = "flex";
                    document.getElementById('loading').style.display = "none";
                    document.getElementById('tekstAn2').style.display = "none";
                    document.getElementById('tekstAn3').style.display = "block";
                    document.getElementById('tekstAn3').classList.add = "opacityfastanimation2";
                }
            )
            
        
        
       
    }
    function graphclose()
    {

        document.getElementById('poll2').style.display = "none";
        document.getElementById('tekstAn3').style.display = "none";
        document.getElementById('loading').style.display = "block";
        document.getElementById('loading').classList.add = "opacityfastanimation2";
        document.getElementById('tekstAn2').style.display = "block";
        document.getElementById('tekstAn2').classList.add = "opacityfastanimation2";
    }
    function getVote() {
    
        let yes;
        let no;
        let suma;
        $.when(
            $.get( "https://human-tech-hackaton-22.vercel.app/api/computer-poll_object",function( poll_object )
        {
            yes = poll_object.yes;
            no = poll_object.no;
        })).then(
           function()
            {
                yes= Number(yes);
                no = Number(no);
                suma = yes+no;
                yes = Math.round((yes/suma)*100);
                no = Math.round((no/suma)*100);
                document.getElementById('pollResult').innerHTML = "Tak: " + String(yes) + "%" + "\nNie: " + String(no) + "%";
                document.getElementById('tekstAn3').innerHTML = "liczba głosów: " + String(suma);
           }
        )
        
        
       
      }