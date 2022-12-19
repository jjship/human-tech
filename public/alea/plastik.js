class Plastik // cząsteczki plastiku
{
    constructor(x, y, r, color_r)
    {
        this.x = x; // x cząsteczki
        this.y = y; // y cząsteczki
        this.r = r; // promień cząsteczki
        this.color = color_r;
        this.xspeed = 0.25; //prędkość poruszania się x 
        this.yspeed = 0.25; //prędkość poruszania się y
        this.xspeed = random(-1,1)*this.xspeed;
        this.start = 0;
    }

    show()
    {
       // stroke(255); 
        //strokeWeight(4);
        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.r*2);
    }

    move()
    {
        if(this.x%11 == 0 || this.y%11 == 0)
        {
            this.xspeed = this.xspeed*(-1);
        }
        
        if(this.x + this.r > width || this.x < 0 + this.r)
        {
            this.xspeed = this.xspeed*(-1);
        }

        if(this.y + this.r > height || this.y  < 0 + this.r)
        {
            this.yspeed = this.yspeed*(-1);
        }

        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed;
        let xy = [];
        xy[0] = this.x;
        xy[1] = this.y;

        return(xy);
        
    }




// bombel()
// {
//   angleMode(DEGREES);
//   noiseDetail(2,1);
//   noStroke();
//   translate(this.x, this.y);

//   let step = 0.1;
//   circle(0, 0, this.r);
//   for(let i = 0; i < 360; i += step)
//   {
//     let xoffset = map(cos(i), -1, 1, 0, 3);
//     let yoffset = map(sin(i), -1, 1, 0, 3);

//     let n = noise(xoffset + this.start, yoffset + this.start);
//     var h = map(n, 0, 1, -50, 50);

//     rotate(step);
//     fill(255);
//     rect(this.r/2, 0, h, 1);
//   }

//   this.start + 0.01;
// } 


}


