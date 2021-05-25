let elevatorID = 1
let floorRequestButtonID = 1
let callButtonID = 1

class Column {
    constructor(_id, _amountOfFloors, _amountOfElevators) {
        this.ID = _id
        this.status = 'online' 
        this.elevatorsList = []
        this.callButtonsList = []

        this.createElevators(_amountOfFloors, _amountOfElevators) 
        this.createCallButtons(_amountOfFloors)
    }
    createCallButtons(_amountOfFloors) {
        let buttonFloor = 1
        
        for (let i = 0; i < _amountOfFloors; i++) {
            if(buttonFloor < _amountOfFloors) { //If it's not the last floor
                let callButton = new CallButton(callButtonID, buttonFloor, 'up') //id, floor, direction
                this.callButtonsList.push(callButton)
                callButtonID ++
            }

            if(buttonFloor > 1) { //If it's not the first floor
                let callButton = new CallButton(callButtonID,buttonFloor, 'down') //id, floor, direction
                this.callButtonsList.push(callButton)
                callButtonID++
            }
            buttonFloor++
        }
    }

    createElevators(_amountOfFloors, _amountOfElevators) { 
        for(let i = 0; i < _amountOfElevators; i++) {
            let elevator = new Elevator(elevatorID, _amountOfFloors) //id, amountOfFloors
            this.elevatorsList.push(elevator)
            elevatorID++
        }
    }

    //Simulate when a user press a button outside the elevator
    requestElevator(_floor, _direction) {
        let elevator = this.findElevator(_floor, _direction);
        elevator.floorRequestList.push(_floor);
        elevator.sortFloorList();
        elevator.move();
        elevator.operateDoors();
        return elevator
    };

    //We use a score system depending on the current elevators state. Since the bestScore and the referenceGap are 
    //higher values than what could be possibly calculated, the first elevator will always become the default bestElevator, 
    //before being compared with to other elevators. If two elevators get the same score, the nearest one is prioritized.
    findElevator(requestedFloor, requestedDirection) {
        let bestElevatorInformations = {
            bestElevator: null, 
            bestScore: 5,
            referenceGap: 1000000000
        }

        this.elevatorsList.forEach(elevator => {
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
        });
        return bestElevatorInformations.bestElevator
    }

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
    }

} //Column

class Elevator {
    constructor(_id, _amountOfFloors) {
        this.ID = _id
        this.status = "idle"
        this.amountOfFloors = _amountOfFloors
        this.direction = null
        this.currentFloor = 1
        this.door = new Door(_id)
        this.floorRequestButtonsList = []
        this.floorRequestList = []

        this.createFloorRequestButtons(_amountOfFloors)
    }

    createFloorRequestButtons(_amountOfFloors) {
        let buttonFloor = 1
        for( let i = 0; i < _amountOfFloors; i++) {
            let floorRequestButton = new FloorRequestButton(floorRequestButtonID, buttonFloor) //id, floor
            this.floorRequestButtonsList.push(floorRequestButton)
            buttonFloor++
            floorRequestButtonID++
        }
    }
        

    //Simulate when a user press a button inside the elevator
    requestFloor(floor) {
        this.floorRequestList.push(floor)
        this.sortFloorList()
        this.move()
        this.operateDoors()
    }

    move() { 
        while ( this.floorRequestList.length != 0) {
            let destination = this.floorRequestList[0]
            this.status = 'moving'
            if( this.currentFloor < destination) {
                this.direction = 'up'
                while (this.currentFloor < destination) {
                    console.log("Elevator #" + this.ID + " is now at floor " + this.currentFloor)
                    this.currentFloor++
                }
            } else if (this.currentFloor > destination) {
                this.direction = 'down'
                while (this.currentFloor > destination) {
                    this.currentFloor--
                }
            }
            this.status = 'stopped'
            this.floorRequestList.shift()
        }
        this.status = 'idle'
    }

    sortFloorList() {
        if (this.direction == 'up') {
            this.floorRequestList.sort(function(a, b){return a-b});
        } else {
            this.floorRequestList.sort(function(a, b){return b-a});

        }
    }

    operateDoors() {
        this.doorStatus = 'opened'
        // WAIT 5 seconds
        if (!this.overweight) {
            this.door.status = 'closing'
            if (!this.door.obstruction) {
                this.door.status = 'closed'
            } else {
                //Wait for the person to clear the way
                this.door.obstruction = false
                this.operateDoors()
            }
        } else {
            while (this.overweight) {
                // Activate overweight alarm, and wait for someone to get out
                this.overweight = false 
            }
            this.operateDoors()
        }
    }

} //Elevator

class CallButton {
    constructor(_id, _floor, _direction) {
        this.ID = _id
        this.status = 'off'
        this.floor = _floor
        this.direction = _direction
    }
}

class FloorRequestButton {
    constructor(_id, _floor) {
        this.ID = _id
        this.status = 'off'
        this.floor = _floor
    }
}

class Door {
    constructor(_id) {
        this.ID = _id
        this.status = 'closed'
    }
}

let column = new Column(1,2,3)


module.exports = {Column, Elevator, CallButton, FloorRequestButton, Door} 