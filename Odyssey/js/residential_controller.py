import sys

elevatorID = 1
floorRequestButtonID = 1
callButtonID = 1

class Column:
    def __init__(self, _id, _amountOfFloors, _amountOfElevators):
        self.ID = _id
        self.status = 'online' 
        self.elevatorsList = []
        self.callButtonsList = []

        self.createElevators(_amountOfFloors, _amountOfElevators) 
        self.createCallButtons(_amountOfFloors)

    def createCallButtons(self, _amountOfFloors):
        buttonFloor = 1
        global callButtonID
        for i in range(_amountOfFloors):
            if buttonFloor < _amountOfFloors: #If it's not the last floor
                callButton = CallButton(callButtonID, buttonFloor, 'up') #id, floor, direction
                self.callButtonsList.append(callButton)
                callButtonID +=1

            if buttonFloor > 1: #If it's not the first floor
                callButton = CallButton(callButtonID, buttonFloor, 'down') #id , floor, direction
                self.callButtonsList.append(callButton)
                callButtonID +=1
            
            buttonFloor +=1

    def createElevators(self, _amountOfFloors, _amountOfElevators): 
        global elevatorID
        for i in range(_amountOfElevators):
            elevator = Elevator(elevatorID, _amountOfFloors) #id, amountOfFloors
            self.elevatorsList.append(elevator)
            elevatorID +=1

#     //Simulate when a user press a button outside the elevator
    def requestElevator(self, _floor, _direction):
        elevator = self.findElevator(_floor, _direction)
        elevator.floorRequestList.append(_floor)
        elevator.sortFloorList()
        elevator.move()
        elevator.operateDoors()
        return elevator

#     //We use a score system depending on the current elevators state. Since the bestScore and the referenceGap are 
#     //higher values than what could be possibly calculated, the first elevator will always become the default bestElevator, 
#     //before being compared with to other elevators. If two elevators get the same score, the nearest one is prioritized.
    def findElevator(self, requestedFloor, requestedDirection):
        bestElevatorInformations = {
            "bestElevator" : None, 
            "bestScore" : 5,
            "referenceGap" : 1000000000
        }

        for elevator in self.elevatorsList:
        # self.elevatorsList.forEach(elevator => {
            #The elevator is at my floor and going in the direction I want
            if requestedFloor == elevator.currentFloor and elevator.status == 'stopped' and requestedDirection == elevator.direction:
                bestElevatorInformations = self.checkIfElevatorIsBetter(1, elevator, bestElevatorInformations, requestedFloor)
            
            #The elevator is lower than me, is coming up and I want to go up
            elif requestedFloor > elevator.currentFloor and elevator.direction == 'up' and requestedDirection == elevator.direction:
                bestElevatorInformations = self.checkIfElevatorIsBetter(2, elevator, bestElevatorInformations, requestedFloor)
            
            #The elevator is higher than me, is coming down and I want to go down
            elif requestedFloor < elevator.currentFloor and elevator.direction == 'down' and requestedDirection == elevator.direction:
                bestElevatorInformations = self.checkIfElevatorIsBetter(2, elevator, bestElevatorInformations, requestedFloor)
            
            #The elevator is idle
            elif elevator.status == 'idle':
                bestElevatorInformations = self.checkIfElevatorIsBetter(3, elevator, bestElevatorInformations, requestedFloor)
            
            #The elevator is not available, but still could take the call if nothing better is found
            else: 
                bestElevatorInformations = self.checkIfElevatorIsBetter(4, elevator, bestElevatorInformations, requestedFloor)
            
        return bestElevatorInformations["bestElevator"]

    def checkIfElevatorIsBetter(self, scoreToCheck, newElevator, bestElevatorInformations, floor):
        if scoreToCheck < bestElevatorInformations["bestScore"]:
            bestElevatorInformations["bestScore"] = scoreToCheck
            bestElevatorInformations["bestElevator"] = newElevator
            bestElevatorInformations["referenceGap"] = abs(newElevator.currentFloor - floor)
        elif bestElevatorInformations["bestScore"] == scoreToCheck:
            gap = abs(newElevator.currentFloor - floor)
            if bestElevatorInformations["referenceGap"] > gap:
                bestElevatorInformations["bestScore"] = scoreToCheck
                bestElevatorInformations["bestElevator"] = newElevator
                bestElevatorInformations["referenceGap"] = gap
        
        return bestElevatorInformations
    

#//Column

class Elevator:
    def __init__(self, _id, _amountOfFloors):
        self.ID = _id
        self.status = 'idle'
        self.direction = None
        self.currentFloor = 1
        self.door = Door(_id)
        self.floorRequestButtonsList = []
        self.floorRequestList = []
        self.overweight = 1000
        self.door.obstruction = False

        self.createFloorRequestButtons(_amountOfFloors)

    def createFloorRequestButtons(self, _amountOfFloors):
        buttonFloor = 1
        global floorRequestButtonID
        for i in range(_amountOfFloors):
            floorRequestButton = FloorRequestButton(floorRequestButtonID, buttonFloor) #id, floor
            self.floorRequestButtonsList.append(floorRequestButton)
            buttonFloor +=1
            floorRequestButtonID +=1
        

#     //Simulate when a user press a button inside the elevator
    def requestFloor(self, floor):
        self.floorRequestList.append(floor)
        self.sortFloorList()
        self.move()
        self.operateDoors()

    def move(self): 
        while len(self.floorRequestList) > 0:
            destination = self.floorRequestList[0]
            self.status = 'moving'
            if self.currentFloor < destination:
                self.direction = 'up'
                while self.currentFloor < destination:
                    self.currentFloor +=1
            
            elif self.currentFloor > destination:
                self.direction = 'down'
                while self.currentFloor > destination:
                    self.currentFloor -=1
                
            self.status = 'stopped'
            self.floorRequestList.pop()
        
        self.status = 'idle'

    def sortFloorList(self):
        if self.direction == 'up':
            self.floorRequestList.sort()
        else: 
            self.floorRequestList.sort(reverse=True)

    def operateDoors(self):
        self.doorStatus = 'opened'
        # WAIT 5 seconds
        if self.overweight < 1000:
            self.doorStatus = 'closing'
            if self.door.obstruction == False:
                self.doorStatus = 'closed'
            else:
                # Wait for the person to clear the way
                self.door.obstruction == True
                self.operateDoors()
            
        else:
            while self.overweight:
                # Activate overweight alarm, and wait for someone to get out
                self.overweight = False 

            self.operateDoors()

#  //Elevator

class CallButton:
    def __init__(self, _id, _floor, _direction):
        self.ID = _id
        self.status = 'off'
        self.floor = _floor
        self.direction = _direction

class FloorRequestButton:
    def __init__(self, _id, _floor):
        self.ID = _id
        self.status = 'off'
        self.floor = _floor

class Door:
    def __init__(self, _id):
        self.ID = _id
        self.status = 'closed'

def testScenario1():
    a = Column(0, 10, 2)

    elevatorRequested = a.requestElevator(5, "down")
    elevatorRequested.requestFloor(7)

def testScenario2():
    column1 = Column(1, 10, 2)
    column1.elevatorsList[0].currentFloor = 10
    column1.elevatorsList[0].status = 'idle'
    column1.elevatorsList[1].currentFloor = 3
    column1.elevatorsList[1].status = 'idle'

    elevator = column1.requestElevator(1, 'up')
    elevator.requestFloor(6)

    elevator = column1.requestElevator(3, 'up')
    elevator.requestFloor(5)

    elevator = column1.requestElevator(9, 'down')
    elevator.requestFloor(2)
