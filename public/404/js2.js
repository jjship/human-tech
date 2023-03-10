let kolonumber = 1;
let temponumber = 0;
let sizenumber = 0;
const idkolo = document.getElementById("kolo").children;
const idtempo = document.getElementById("tempo");
const idslider = document.getElementById("slider");
const idankieta = document.getElementById("ankieta");

const idtimer = document.getElementById("timer");
const idkoniec = document.getElementById("koniec");
const idpuste = document.getElementById("puste");
const idsize = document.getElementById("size").children;
const searchlocation = window.location.search;
const urlparametr = new URLSearchParams(searchlocation);
const screen = urlparametr.get('screen');

const date = urlparametr.get('date');
let getid = "100000";
let date2 = 0;
const sliderheight = document.getElementById("slider").offsetHeight;
let wybor = 0;
let clock;
let clock2;
let zliczanie = 0;
let makstimer;
let load = false;
let olddeg = 55;
let olddeg2 = 0;
let random = 100;
let Btouchmove = false;
const lemCytaty = ["Żyć to znaczy mieć przyszłość, która zamienia się w teraźniejszość.",
"Nic się nie sprawdziło. Okazało się, że rację miał tylko Antoni Gołubiew, który lubił powtarzać, że przyszłość polega na tym, iż „wszystko jest inaczej” - inaczej, niż sobie wyobrażamy. I tak rzeczywiście jest. Z tym że inaczej - nie znaczy ani wspanialej, ani straszniej. Po prostu inaczej."
,"Wielki mamy kłopot z rozumem, ponieważ jest on skupieniem tajemnic."
,"Kiedy wszyscy są wariatami, nikt nie jest wariatem."
,"Genialność jest nieustającym zwątpieniem..."
]
const src3 = document.getElementById("wskaznik");


  
src3.addEventListener(
  "touchmove",
  (e) => {
    let dokY = document.getElementById("wskaznik").offsetHeight;
    let dokYmargin2 = document
      .getElementById("pokretlo")
      .getBoundingClientRect().top;
    for (let i = 0; i < e.changedTouches.length; i++) {
      let Y = `${e.changedTouches[i].pageY}`;
      let X = `${e.changedTouches[i].pageX}`;
      Y = Y - dokYmargin2;
      let deg = (Math.atan2(dokY / 2 - Y, X - dokY / 2) * 180) / Math.PI;
      funobrot(90 - Math.round(deg));
      olddeg = 90 - Math.round(deg);
      Btouchmove = true;
    }
  },
  false
);
function funobrotEnd() {
    if (Btouchmove == true) {   
        if (olddeg < 55) {
            funobrot(55);
            kolonumber = 1;
        } else if (olddeg < 90) {
            funobrot(80);
            kolonumber = 2;
        } else if (olddeg < 120) {
            funobrot(95);
            kolonumber = 3;
        } else {
            funobrot(120);
            kolonumber = 4;
        }
        refresh();
    }

}
function ftemponumber(min, max, y) {
  if (min < y) {
    if (y - min < max) {
        return Math.round(((y - min) / max) * 100);
    } else {
      return 100;
    }
    } else {
      return 0;
    }
}



$("#wskaznik").click(function obrot() {
    if (kolonumber == 1) {
        kat = 80;
        kolonumber = 2;
    } else if (kolonumber == 2) {
        kat = 95;
        kolonumber = 3;
    } else if (kolonumber == 3) {
        kat = 120;
        kolonumber = 4;
    } else if (kolonumber == 4) {
        kolonumber = 1;
        kat = 55;
    }
    Btouchmove = false;
    funobrot(kat);
    refresh();
    
});  


function funobrot(deg)
{
    $('#wskaznik').css({
        'transform': 'rotate(' + deg + 'deg)',
        '-ms-transform': 'rotate(' + deg + 'deg)',
        '-moz-transform': 'rotate(' + deg + 'deg)',
        '-webkit-transform': 'rotate(' + deg + 'deg)',
        '-o-transform': 'rotate(' + deg + 'deg)'
      }); 
} 
 

function ssize()
{
    idsize[sizenumber].style.display = "none";
    sizenumber++;
    if(sizenumber>1)
    {
        sizenumber = 0;
    }
    idsize[sizenumber].style.display = "block";
    refresh();
} 


const src = document.getElementById("linia");

src.addEventListener('touchmove', (e) => {
   
    for (let i = 0; i < e.changedTouches.length; i++) {
      
      let Y = `${e.changedTouches[i].pageY}`;

    
    let dokY = document.getElementById("linia").offsetHeight;
    let dokYMargin = dokY*0.166;
    let dokY2 = document.getElementById("linia").getBoundingClientRect().top;
    let sliderheight = document.getElementById("slider").offsetHeight;
    temponumber = ftemponumber(dokY2+dokYMargin,dokY-2*dokYMargin,Y);
    if(Y<dokY2 + dokYMargin)
    {
       
        idslider.style.marginTop = String(dokY2-sliderheight/2 + sliderheight) + "px";
        
    }
    else if(Y>dokY2 + dokY - dokYMargin + sliderheight*0.365) 
    {
        idslider.style.marginTop = String(dokY2+dokY-sliderheight/2 - sliderheight + sliderheight*0.365) + "px";
    }
    else
    {
        idslider.style.marginTop = String(Y-sliderheight/2) + "px";
        
    }
    

    }
  }, false);
  
  const src2 = document.getElementById("slider");

src2.addEventListener('touchmove', (e) => {
   
    for (let i = 0; i < e.changedTouches.length; i++) {
      
      let Y = `${e.changedTouches[i].pageY}`;
      let dokY = document.getElementById("linia").offsetHeight;
      let dokYMargin = dokY*0.166;
      let dokY2 = document.getElementById("linia").getBoundingClientRect().top;
      let sliderheight = document.getElementById("slider").offsetHeight;
      temponumber = ftemponumber(dokY2+dokYMargin,dokY-2*dokYMargin,Y);
      if(Y<dokY2 + dokYMargin)
      {
         
          idslider.style.marginTop = String(dokY2-sliderheight/2 + sliderheight) + "px";
          
      }
      else if(Y>dokY2 + dokY - dokYMargin + sliderheight*0.365) 
      {
          idslider.style.marginTop = String(dokY2+dokY-sliderheight/2 - sliderheight + sliderheight*0.365) + "px";
      }
      else
      {
          idslider.style.marginTop = String(Y-sliderheight/2) + "px";
      }
    
    }
  }, false);
  src.addEventListener("touchend", refresh);
  src2.addEventListener("touchend", refresh);
  src3.addEventListener("touchend", funobrotEnd);
  $("#tempo").mousedown(function (e) {
    let Y = e.pageY;
    let dokY = document.getElementById("linia").offsetHeight;
    let dokYMargin = dokY * 0.166;
    let dokY2 = document.getElementById("linia").getBoundingClientRect().top;
    let sliderheight = document.getElementById("slider").offsetHeight;
    temponumber = ftemponumber(dokY2 + dokYMargin, dokY - 2 * dokYMargin, Y);
    if (Y < dokY2 + dokYMargin) {
      idslider.style.marginTop =
        String(dokY2 - sliderheight / 2 + sliderheight) + "px";
    } else if (Y > dokY2 + dokY - dokYMargin + sliderheight * 0.365) {
      idslider.style.marginTop =
        String(
          dokY2 + dokY - sliderheight / 2 - sliderheight + sliderheight * 0.365
        ) + "px";
    } else {
      idslider.style.marginTop = String(Y - sliderheight / 2) + "px";
    }
    refresh();
  });
  $("#An00").bind("mousedown", function (e) {
    if (wybor == 0) {
      let Y =
        e.pageY - document.getElementById("An00").getBoundingClientRect().top;
      let dokY = document.getElementById("An00").offsetHeight;
      if (Y < dokY / 2) {
        document.getElementById("An10").style.display = "block";
        getVote(0);
      } else {
        document.getElementById("An01").style.display = "block";
        getVote(1);
      }
      wybor = 1;
      refresh();
    }
  }); 
  $("#An00").bind("touchstart", function (e) {
    if (wybor == 0) {
      let Y =
        e.pageY - document.getElementById("An00").getBoundingClientRect().top;
      let dokY = document.getElementById("An00").offsetHeight;
      if (Y < dokY / 2) {
        document.getElementById("An10").style.display = "block";
        getVote(0);
      } else {
        document.getElementById("An01").style.display = "block";
        getVote(1);
      }
      wybor = 1;
      refresh();
    }
  });


function getVote(int) {
  if(int == 0)
  {
    const body ={
        yesChange: "1",
        noChange: "0"
    }
     
    $.post("https://human-tech-hackaton-22.vercel.app/api/computer-poll_object", body)
  }
  else if(int == 1)
  {
    const body ={
        yesChange: "0",
        noChange: "1"
    } 
      $.post("https://human-tech-hackaton-22.vercel.app/api/computer-poll_object", body)
  }

}
 
  window.onload = funload();

  function funload()
  {
    
        random =  Math.floor(Math.random() * (900) + 100);
        while(random == screen)
        {
            random =  Math.floor(Math.random() * (900) + 100);
        }
        $.get( "https://human-tech-hackaton-22.vercel.app/api/computer-code",function( data )
        {

            getid = data.code;
            let pom2 = Math.floor((Date.now()-Number(date)) / 1000);
            
            if(getid.length==6 && getid[3]+getid[4]+getid[5]==screen)
            {
                
                date2 = Date.now();
                clock2 = setTimeout("funendtimer()",90000);
               const dataObject=
               {
                   code:String(screen)+String(random)
               }
                $.post("https://human-tech-hackaton-22.vercel.app/api/computer-code",dataObject,function()
                {
                    load = true;
                    reset();
                });
                

            }
            else if(getid.length == 3 && getid[0]+getid[1]+getid[2]==screen)
            {
                date2 = Date.now();
                clock2 = setTimeout("funendtimer()",90000);
                const dataObject=
               {
                   code:String(screen)+String(random)
               }
                $.post("https://human-tech-hackaton-22.vercel.app/api/computer-code",dataObject,function()
                {
                    load = true;
                    reset();
            
                });
            }
            else if(getid[0]+getid[1]+getid[2]==screen){
                
                date2 = Date.now();
                clock2 = setTimeout("funendtimer()",90000);
                load = true;
                reset();
            }
            else
            {
                idkoniec.classList.add('animacjaankieta');
            }
        })

      
        
  }

  function funendtimer()
  {
    
    idkoniec.classList.add('animacjaankieta');
    clearInterval(clock2);
    refresh();
    load = false;
  }
 
  $(".endTap").bind("touchstart", function (e) {
    document.getElementById("end0").style.display = "none";
    document.getElementById("end1").style.display = "block";
    
    
});
$(".endTap").bind("mousedown", function (e) {
    document.getElementById("end0").style.display = "none";
    document.getElementById("end1").style.display = "block";
    
})

$(".endTap").bind("mouseup", function (e) {
    document.getElementById("end0").style.display = "block";
    document.getElementById("end1").style.display = "none";
    sendMail();
});
$(".endTap").bind("touchend", function (e) {
    document.getElementById("end0").style.display = "block";
    document.getElementById("end1").style.display = "none";
    sendMail();
});

function sendMail()
{
    let a = Math.floor(Math.random()*5);
    information = "\„"+lemCytaty[a]+"\"" + '\r\n' + "Stanisław Lem";
    information  = encodeURIComponent(information);
    window.location.href = "mailto:404klub404@gmail.com?body="+information;
}
        

function funIntroobrot(deg,time){
    $('#introback').css({
        'transition': 'transform ' + time + 's' + ' linear',
        'transform': 'rotate(' + deg + 'deg)',
        '-ms-transform': 'rotate(' + deg + 'deg)',
        '-moz-transform': 'rotate(' + deg + 'deg)',
        '-webkit-transform': 'rotate(' + deg + 'deg)',
        '-o-transform': 'rotate(' + deg + 'deg)'
    }); 
  } 
function refresh(){
    
  
    
    if(load == true)
    {
        $.get( "https://human-tech-hackaton-22.vercel.app/api/computer-code",function( data )
    
        {
            getid = data.code;
            if(getid[0]+getid[1]+getid[2]==screen)

                {
                    
                    if(kolonumber == 4 && sizenumber == 1){
                        idpuste.style.display = "none";
                        idtempo.style.display = "none";
                        idankieta.style.display = "block";
                    }
                
                    else if(kolonumber == 1 && sizenumber == 1) {
                        idpuste.style.display = "none";
                        idankieta.style.display = "none";
                        idtempo.style.display = "block";
                    }
        
                    else {
                        idankieta.style.display = "none";
                        idtempo.style.display = "none";
                        idpuste.style.display = "block";
                    }
                    if(screen != null && date != null){
                        let pomtemponumber = "00";
                        if(temponumber>99)
                        {
                            pomtemponumber = "99"
                        }
                        else if(temponumber>9)
                        {
                            pomtemponumber = String(temponumber);
                        }
                        else
                        {
                            pomtemponumber = "0" + String(temponumber);
                        }
                    
                        const pom = String(kolonumber) + String(sizenumber)  + pomtemponumber + String(wybor) + screen;
                        let dataObject = 
                        {
                            clickMode:pom
                        }
                    
                        $.post("https://human-tech-hackaton-22.vercel.app/api/computer-click", dataObject);
                        zliczanie = 0;
                    }
                }
                else if(getid[3]+getid[4]+getid[5]==screen && zliczanie<3)
                {
                    zliczanie++;
                   refresh();
                }
                else
                    {
                        funendtimer();
                    }
        })
    }              
        
}
function reset(){
    const pom = "10000" + screen;
    let dataObject = 
    {
        clickMode:pom
    }
    
    $.post("https://human-tech-hackaton-22.vercel.app/api/computer-click", dataObject);
 }