import java.util.*;
import java.lang.Math;

final int DOTSIZE = 10;
final int MAXDOTS = 55;
final int SPEED = 2;
final int NDOTS = 7;
final String BOUNDARYMODE = "BOUNCE";    //BOUNCE or RESPAWN
final boolean COLLISION = true;
final boolean RECORD = false;

ArrayList<Dot> dots = new ArrayList();


void setup(){
  size(800, 400);
  
  for (int i = 0; i < MAXDOTS; i++){
    dots.add(new Dot(BOUNDARYMODE)); 
  }
}



void draw(){
  background(255);
  LinkedList<Dot> nearestDots;
  
  for (Dot d : dots){
    d.checkBoundaries();
    
    nearestDots = connectNNearest(dots, d);
    
    for (Dot dot : nearestDots){
      if (COLLISION){
        
      }
      
      stroke(0);
      line(d.pos.x, d.pos.y, dot.pos.x, dot.pos.y);
    }
    
    d.move();
    d.display();
  }
  
  if (RECORD){
    //if (frameCount % 3 == 0){
      saveFrame("output/gif-"+nf(frameCount, 3)+".png");
    //}
    if (frameCount == 500) {
      exit();
    }
  }
  
}



LinkedList<Dot> connectNNearest(ArrayList<Dot> dots, Dot dot){
  HashMap<Dot, Float> distMap = new HashMap();
  LinkedList<Map.Entry<Dot, Float>> sortedDots;
  LinkedList<Dot> nearestDots = new LinkedList();
  
  for (Dot d : dots){
    distMap.put(d, euclideanDist(dot, d));
  }
  
  sortedDots = new LinkedList(distMap.entrySet());
  
  sortedDots.sort(new Comparator<Map.Entry<Dot, Float>>(){
    public int compare(Map.Entry<Dot, Float> o1, Map.Entry<Dot, Float> o2){
      return o1.getValue().compareTo(o2.getValue());
    }
  });
  
  for (int i = 0; i < NDOTS; i++){
    nearestDots.add(sortedDots.get(i).getKey());
  }
  
  return nearestDots;
}



float euclideanDist(Dot o1, Dot o2){
   return sqrt(pow((o1.pos.x - o2.pos.x), 2) + pow((o1.pos.y - o2.pos.y), 2));
}



class Dot {
  PVector pos;
  PVector vel;
  String boundaryMode;
  
  
  Dot(String boundMode){
    this.init();
    this.boundaryMode = boundMode;
  }
  
  
  Dot(int x, int y, String boundMode){
    this.pos = new PVector(x, y);
    this.vel = PVector.random2D();
    this.boundaryMode = boundMode;
  }
  
  
  void init(){
    int x = (int) random(width+1);
    int y;
     
    if (x != 0 && x != width){
      y = (int) random(2);
      if (y == 0){
        y = height - DOTSIZE;
      } else {
        y = 0 + DOTSIZE;
      }
    } else {
      y = (int) random(height+1);
    }
    
    this.pos = new PVector(x+DOTSIZE, y);
    this.vel = PVector.random2D();
    vel.mult(3);
  }
  
  
  void checkBoundaries(){
    if (this.boundaryMode == "RESPAWN"){
      if (this.pos.x > width + DOTSIZE/2 || this.pos.x < 0 - DOTSIZE/2 || 
          this.pos.y > height + DOTSIZE/2 || this.pos.y < 0 - DOTSIZE/2){
            
        this.init();
      }
      
    } else if (this.boundaryMode == "BOUNCE"){
      if (this.pos.x > width - DOTSIZE || this.pos.x < 0 + DOTSIZE){
        this.vel.x *= -1;
      } 
      if (this.pos.y > height - DOTSIZE || this.pos.y < 0 + DOTSIZE){
        this.vel.y *= -1;
      }
    }
    
  }
  
  
  void move(){
     pos.add(vel);
  }
  
  
  void display(){
    noStroke();
    fill(0);
    ellipse(this.pos.x, this.pos.y, DOTSIZE, DOTSIZE);
  }

 
}
