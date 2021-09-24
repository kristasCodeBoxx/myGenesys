using System;

namespace elevators
{
    class Columns 
    {
        public int elevatorID = 1;
        public int floorRequestButtonID = 1;
        public int callButtonID = 1;

        public Columns(int _id, int _amountOfFloors, int _amountOfElevators)
        {
            int id        = _id;
            string status = "online";
            string[] elevatorsList = new string[_amountOfElevators];
          /*  string[] elevatorsList = new string[_amountOfElevators];*/
        }

        public void createCallButtons(int _amountOfFloors) 
        {
            int buttonFloor = 1;
        
            for (int i = 0; i < _amountOfFloors; i++) {
                if(buttonFloor < _amountOfFloors) { //If it's not the last floor
                 //   string callButton = new CallButton(callButtonID, buttonFloor, 'up'); //id, floor, direction
                  //  callButtonsList.push(callButton);
                    callButtonID = callButtonID + 1;
                }

                if(buttonFloor > 1) { //If it's not the first floor
               //     string callButton = new CallButton(callButtonID,buttonFloor, 'down') ;//id, floor, direction
                //    callButtonsList.push(callButton);
                  //  callButtonID = callButtonID + 1;
                }
                buttonFloor++;
            }
        }
        public void createElevators(int _amountOfFloors, int _amountOfElevators) 
        { 
            for(let i = 0; i < _amountOfElevators; i++) {
                //Elevator elevator = new Elevator(elevatorID, _amountOfFloors) //id, amountOfFloors
                //this.elevatorsList.push(elevator)
                elevatorID++;
            }
        }        
        
        public void requestElevator(int _floor, string _direction) {
            /*let elevator = this.findElevator(_floor, _direction);
            elevator.floorRequestList.push(_floor);
            elevator.sortFloorList();
            elevator.move();
            elevator.operateDoors();
            return elevator*/
        };
        
        public object findElevator(int _requestedFloor, string _requestedDirection) 
        {
            var bestElevatorInformations = {
                bestElevator: null, 
                bestScore: 5,
                referenceGap: 1000000000
            }

            /*this.elevatorsList.forEach(elevator => {
                //The elevator is at my floor and going in the direction I want
                if(requestedFloor == elevator.currentFloor && elevator.status == 'stopped' && requestedDirection == elevator.direction) {
                    bestElevatorInformations = this.checkIfElevatorIsBetter(1, elevator, bestElevatorInformations, requestedFloor)
                }
                //The elevator is lower than me, is coming up and I want to go up
                else if(requestedFloor > elevator.currentFloor && elevator.direction == 'up' && requestedDirection == elevator.direction) {
                    bestElevatorInformations = this.checkIfElevatorIsBetter(2, elevator, bestElevatorInformations, requestedFloor)
                }
                //The elevator is higher than me, is coming down and I want to go down
                else if(requestedFloor < elevator.currentFloor && elevator.direction == 'down' && requestedDirection == elevator.direction) {
                    bestElevatorInformations = this.checkIfElevatorIsBetter(2, elevator, bestElevatorInformations, requestedFloor)
                }
                //The elevator is idle
                else if (elevator.status == 'idle') {
                    bestElevatorInformations = this.checkIfElevatorIsBetter(3, elevator, bestElevatorInformations, requestedFloor)
                }
                //The elevator is not available, but still could take the call if nothing better is found
                else { 
                    bestElevatorInformations = this.checkIfElevatorIsBetter(4, elevator, bestElevatorInformations, requestedFloor)
                }
            });*/
            return bestElevatorInformations.bestElevator
        }
/*
    checkIfElevatorIsBetter(scoreToCheck, newElevator, bestElevatorInformations, floor) {
        if (scoreToCheck < bestElevatorInformations.bestScore) {
            bestElevatorInformations.bestScore = scoreToCheck
            bestElevatorInformations.bestElevator = newElevator
            bestElevatorInformations.referenceGap = Math.abs(newElevator.currentFloor - floor)
        } else if (bestElevatorInformations.bestScore == scoreToCheck) {
            let gap = Math.abs(newElevator.currentFloor - floor)
            if(bestElevatorInformations.referenceGap > gap) {
                bestElevatorInformations.bestScore = scoreToCheck
                bestElevatorInformations.bestElevator = newElevator
                bestElevatorInformations.referenceGap = gap
            }
        }
        return bestElevatorInformations
    }*/

       /* public static void Main(string[] args)
        {
            
            // Creating object
            Columns obj = new Columns(1, 5, 25);
            
            // calling the function
            //obj.StudentAge();
        }*/
    }
}