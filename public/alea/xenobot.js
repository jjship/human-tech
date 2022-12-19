class Xenobot
{
    constructor(x, y, r)
    {
        this.x = x; // x cząsteczki xenobota
        this.y = y; // y cząsteczki xenobota
        this.r = r; // promień cząsteczki xenobota
        this.xspeed = random(2, 3); //random(random(-5,-3),random(3,5)); //prędkość poruszania się x 
        this.yspeed = random(2, 3); //random(random(-5,-2),random(2,5)); //prędkość poruszania się y
       this.xspeed =  this.xspeed*random(-1, 1);
        this.yspeed*random(-5, 1);
    }
    show()
    {
        stroke(255); 
        strokeWeight(4);
        fill(255);
        noStroke();
        ellipse(this.x, this.y, this.r*2);
    }

    move(x_kulkitemp, y_kulkitemp)
    {
        this.x_kulki = x_kulkitemp;
        this.y_kulki = y_kulkitemp;


        if(dist(this.x, this.y, this.x_kulki, this.y_kulki) < 300)
        {
                if(this.x > this.x_kulki && this.y > this.y_kulki)
                {
                    this.x = this.x - 3;
                    this.y = this.y - 3;
                }
                if(this.x == this.x_kulki && this.y > this.y_kulki)
                {
                    this.y = this.y - 3;
                }
                if(this.x > this.x_kulki && this.y == this.y_kulki)
                {
                    this.y = this.y - 3;
                }
                
                if(this.x > this.x_kulki && this.y < this.y_kulki)
                {
                    this.x = this.x - 3;
                    this.y = this.y + 3;
                }
                if(this.x == this.x_kulki && this.y < this.y_kulki)
                {
                    this.y = this.y + 3;
                }
                if(this.x > this.x_kulki && this.y == this.y_kulki)
                {
                    this.x = this.x - 3;
                }
                
                if(this.x < this.x_kulki && this.y >= this.y_kulki)
                {
                    this.x = this.x + 3;
                    this.y = this.y - 3;
                }
                if(this.x == this.x_kulki && this.y >= this.y_kulki)
                {
                    this.y = this.y - 3;
                }
                if(this.x < this.x_kulki && this.y == this.y_kulki)
                {
                    this.x = this.x + 3;
                }

                if(this.x < this.x_kulki && this.y < this.y_kulki)
                {
                    this.x = this.x + 3;
                    this.y = this.y + 3;
                }
                if(this.x == this.x_kulki && this.y < this.y_kulki)
                {
                    this.y = this.y + 3;
                }
                if(this.x < this.x_kulki && this.y == this.y_kulki)
                {
                    this.x = this.x + 3;
                }
        }
        else{

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
            }

            let xy = [];
            xy[0] = this.x;
            xy[1] = this.y;
            return(xy);
    }



}