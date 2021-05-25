/********** SCENARIO 1 **********
 * Elevator A is Idle at floor 2 
 * Elevator B is Idle at floor 6
 * Elevator C is Idle at floor 2 
 * Elevator D is Idle at floor 6
 * Elevator E is Idle at floor 2 
 * Someone is on floor 3 and wants to go to the 7th floor. 
 * Elevator A is expected to be sent.
 */

var column = {
    ID: 0,
    status: null,
    elevatorsList: { elevator: ["A","idle", null, 2],
                        elevator: ["B","idle", null, 6],
                        elevator: ["C","idle", null, 2],
                        elevator: ["D","idle", null, 6],
                        elevator: ["E","idle", null, 2]
                    },   
    callButtonsList: {  CallButton: [1, 1, "UP"],
                        CallButton: [2, 1, "DOWN"],
                        CallButton: [3, 2, "UP"],
                        CallButton: [4, 2, "DOWN"],
                        CallButton: [5, 3, "UP"],
                        CallButton: [6, 3, "DOWN"],
                        CallButton: [7, 4, "UP"],
                        CallButton: [8, 4, "DOWN"],
                        CallButton: [9, 5, "UP"],
                        CallButton: [10, 5, "DOWN"],
                        CallButton: [11, 6, "UP"],
                        CallButton: [12, 6, "DOWN"],
                        CallButton: [12, 7, "UP"],
                        CallButton: [13, 7, "DOWN"]
                        },   /* list of callbutton objects */

    requestElevator(requestedFloor, direction)

  };

  
var elevator = {
    ID: 0,
    status: null,
    direction: null,    
    currentfloor: null,   
    door: null,     /* door object */
    floorRequestButtonsList: null,   /* list of floorrequestbutton objects */ 
    floorRequestList: null,      

    requestElevator(requestedFloor)

};  


var CallButton = {
    ID: 0,
    status: null,
    floor: null,
    direction: null
};
 
var FloorRequestButton = {
    ID: 0,
    status: null,
    floor: null
};




/****  DOOR OBJECT ****/
var Door = {
    ID: 1,
    status: "open"
};

var Door = {
    ID: 2,
    status: "closed"
};




function requestElevator(requestedFloor, direction)
{
    /*
    A person presses a call button to request an elevator, 
    the controller selects an available cage and it is routed to that person 
    based on two parameters provided by pressing the button:
    The floor where the person is
    the direction in which he wants to go (Up or Down)
    */



    /* Find available elevator */
    /* Find closest elevator */
    /* Move elevator to requested floor. */
    /* Move elevator direction */

    elevator.currentFloor = requestedFloor;
}

function requestElevator(requestedFloor)
{
    /*
    A person enters an elevator, 
    selects a floor of the control panel 
    and it moves to the floor requested. 
    The parameter provided is the requested floor.
    */
    
}