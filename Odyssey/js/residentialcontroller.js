class Column {
    constructor(id, amountofFloors, amountofElevators) {
      this.id = id;
      this.status = null;
      this.elevatorsList = [];  //add to array  
      this.callButtonsList = [];  //add to array

    }

    requestElevator(requestedFloor, direction)
    {
        /*
        Select an elevator
        Make the chosen elevator move to the user
        Operate the doors
        Return the chosen elevator, to be used by the elevator requestFloor method
        */

    }
  }

class Elevator {
    constructor(id, amountofFloors) {
      this.id = id;
      this.status = "idle";
      this.direction = null;
      this.currentfloor = null;
      this.floorRequestButtonsList = [];
      this.floorRequestList = [];

    }

    requestFloor(requestedFloor) 
    {
        /*
          Make the elevator move to the user’s destination
          Operate the doors
      */
      while(requestedFloor != currentFloor)
      {
        if(requestedFloor > currentFloor)
        {
            requestedFloor--;
            console.log("Minus-- Current floor: " + currentFloor + " Request Floor: " + requestedFloor);
        }
        else
        {
            requestedFloor++;
            console.log("Minus-- Current floor: " + currentFloor + " Request Floor: " + requestedFloor);

        }
      }
      
      
    }
  }

  class CallButton{
      constructor(id, floor, direction ) {
        this.id = id;        
        this.status = null;
        this.floor = floor;
        this.direction = direction;

      }
  }

class FloorRequestButton{
    constructor(id, floor) {
        this.id = id;        
        this.status = null;
        this.floor = floor;
    }
}
class Door {
    constructor(id) {
        this.id = id;        
        this.status = null;
    }
}

let myColumn = new Column(1, 25, 2);
let myElevator1 = new Elevator(1, 25) ;
let myElevator2 = new Elevator(2, 25) ;
myColumn.elevatorsList[myElevator1, myElevator2];