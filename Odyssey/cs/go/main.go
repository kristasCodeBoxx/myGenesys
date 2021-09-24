package main // package main is needed to start all Go files to be executed

import "fmt"

type Battery struct { //object Battery [defined value type] with it's attributes below; capital first letter as standard for objects and attributes (for golang)
	Id                      int
	Status                  string
	ColumnList              []Column             //array of class Column object
	FloorRequestButtonsList []FloorRequestButton //array of class FloorRequestButton object
}

type Column struct { //object Column [defined value type] with it's attributes below; capital first letter as standard for objects and attributes (for golang)
	Id             int
	Status         string
	ServedFloors   []int        //empty array [defined value type: int]
	IsBasement     bool         //bool: true or false
	ElevatorsList  []Elevator   //array of class Elevator object
	CallButtonList []CallButton //array of class CallButton object
}

type Elevator struct { //object Elevator [defined value type] with it's attributes below; capital first letter as standard for objects and attributes (for golang)
	Id                   int
	Status               string
	CurrentFloor         int
	Direction            string
	Door                 Door //class Door object and attributes (for golang)
	FloorRequestList     []int
	CompletedRequestList []int
}

type CallButton struct { //user selecting from their floor to go back to lobby - object CallButton [defined value type] with it's attributes below; capital first letter as standard for objects and attributes (for golang)
	Id        int
	Status    string
	Floor     int
	Direction string
}

type FloorRequestButton struct { //user selecting from Lobby to go to their destination floor - object "type" FloorRequestButton [value type] with it's attributes below; capital first letter as standard for objects and attributes (for golang)
	Id        int // whole number value + allows negative values
	Status    string
	Floor     int
	Direction string
}

type Door struct { //object Door [defined value type] with it's attributes below; capital first letter as standard for objects and attributes (for golang)
	Id     int
	Status string
}

func main() { //initiates the file, combining other functions into this "main" (function order vis-a-vis other functions is of no importance in golang)
	fmt.Println(assignElevator(54, "down"))
	fmt.Println(findBestColumn(54))
	fmt.Println(requestElevator(36, "up"))
}

func (b Battery) assignElevator(requestedFloor int, direction string) (myColumn Column, myElevator Elevator) {
	//REFERENCED MODEL: func (recv receiver_type) methodName(parameter_list) (return_value_list) { …}
	//function to receive pointer b variable to object Battery [class] - function name assignElevator(dependant on user input parameters x[type],y[type]) - function to return [to save value] into new variable myColumn of the [type object Column class], ditto for myElevator [object class type referencing to object, where it has attributes of int type mentionned already]
	//purpose of this function: user on floor calling x requestedFloor, y direction to go to Lobby
	//assignElevator function purpose to compute return values to 1-myColumn, 2-myElevator then 3-move user to lobby
	//1- to obtain myColumn value, func findBestColumn
	//2- to obtain myElevator value, func define array elevatorList and sort it per column [bonus to findBestElevator - score system of what's closest]
	//3- to move user to lobby FOR loop myCurrentFloor++ until reached requestedFloor

	myColumn = b.findBestColumn(requestedFloor) //to find correct column for user input requestedFloor parameter value

	myColumn.findElevator()
	myElevator = myColumn.findElevator(requestedFloor, direction) //to find correct elevator object

	return //myColumnID, myElevatorIDlist - mentionned on first line [descriptor] of this function - do not repeat (it's either or, not to be referenced twice)
}

func (b Battery) findBestColumn(requestedFloor int) (myColumn Column) {
	//function purpose to compute which elevator is at which column according to statement/conditions of user input at their currentFloor value to go back to lobby
	//condition: if (where x is requestedFloor; y is direction) requestedFloor >= 2 {save value of (y) direction == "up"
	//if x requestedFloor > 1 && requestedFloor <= 20 {myColumn.Id := 2} ...
	//return myColumn
	//myColumn := myColumn.Id //:= is short of var something (new variable)

	if requestedFloor < 1 && requestedFloor >= -5 {
		myColumn.Id = 1
	} else if requestedFloor > 1 && requestedFloor <= 20 {
		myColumn.Id = 2
	} else if requestedFloor >= 21 && requestedFloor <= 40 {
		myColumn.Id = 3
	} else if (requestedFloor >= 31 && requestedFloor <= 60) {
		myColumn.Id = 4
	} else {
		myColumn.Id = 1
	}
	return //myColumn (attribute Id under class Column) - mentionned on first line [descriptor] of this function - do not repeat (it's either or, not to be referenced twice)
	
	// b.ColumnList[0].ServedFloors[1] 

	b.ColumnList = append(b.ColumnList, myColumn {
		myColumn.Id = 1
		myColumn.Status
		myColumn.ServedFloors = [0,-1,-2,-3,-4,-5]
		IsBasement     bool         //bool: true or false
		ElevatorsList  []Elevator   //array of class Elevator object
		CallButtonList []CallButton //array of class CallButton object
	})
	b.ColumnList = append(b.ColumnList, myColumn {
		myColumn.Id = 2
		myColumn.ServedFloors = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
	})
	b.ColumnList = append(b.ColumnList, myColumn {
		myColumn.Id = 3
		myColumn.ServedFloors = [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]
	})
	b.ColumnList = append(b.ColumnList, myColumn {
		myColumn.Id = 4
		myColumn.ServedFloors = [41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,59,60]
	})
}

func (c Column) findElevator(requestedFloor int, direction string) (myElevator int) { //to find the correct (new variable to return the new values) myElevator for myColumn
	
	return //myElevator
}

// func newBattery() *Battery {
// 	myBattery := Battery{}

// 	myBattery.ColumnList = append(myBattery.ColumnList, Column {
// 		Id : 1,
// 		Status: "online",
// 		ServedFloors: [6, 1],

// 	})

// 	myBattery.ColumnList = append(myBattery.ColumnList, Column {
// 		Id : 2,
// 		Status: "online",
// 		ServedFloors: [1, 20],
		
// 	})

// 	myBattery.ColumnList = append(myBattery.ColumnList, Column {
// 		Id : 3,
// 		Status: "online",
// 		minFloor: ,
// 		maxFloor: ,
		
// 	})

// }


func (c Column) requestElevator(requestedFloor int, direction string) (fromLobbyElevator Elevator) {

	return //fromLobbyElevator - mentionned on first line [descriptor] of this function - do not repeat (it's either or, not to be referenced twice)
}

func (e Elevator) moveElevator(requestedFloor int) (elevatorCurrentFloor int) {

	for elevatorCurrentFloor := 0; elevatorCurrentFloor <= requestedFloor; elevatorCurrentFloor++ {
		if elevatorCurrentFloor <= requestedFloor {
			elevatorCurrentFloor++ //elevatorCurrentFloor = 1 > 2 > 3 > 4 > ... until requestedFloor value is reached
		}
	}
	for elevatorCurrentFloor := 0; elevatorCurrentFloor >= requestedFloor; elevatorCurrentFloor-- {
		if elevatorCurrentFloor >= requestedFloor {
			elevatorCurrentFloor--
		}
	}
	return
}

// REFERENCED MODEL
// func add(x int, y int) (abc int) {
// 	abc := 0
// 	if x > 5 {
// 		abc = x + y
// 	} else {
// 		abc = x - y
// 	}
// 	return
// }
