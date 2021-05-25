using System;

namespace elevators
{
    public int elevatorID = 1;
    public int floorRequestButtonID = 1;
    public int callButtonID = 1;

    class Columns 
    {

        public Columns(int _id, int _amountOfFloors, int _amountOfElevators)
        {
            int id        = _id;
            string status = "online";
            array elevatorsList = [];
            array callButtonsList = [];
        }

        static void createCallButtons(int _amountOfFloors) 
        {
            int buttonFloor = 1;
        
            for (int i = 0; i < _amountOfFloors; i++) {
                if(buttonFloor < _amountOfFloors) { //If it's not the last floor
                    string callButton = new CallButton(callButtonID, buttonFloor, 'up'); //id, floor, direction
                    callButtonsList.push(callButton);
                    callButtonID ++;
                }

                if(buttonFloor > 1) { //If it's not the first floor
                    string callButton = new CallButton(callButtonID,buttonFloor, 'down') ;//id, floor, direction
                    callButtonsList.push(callButton);
                    callButtonID++;
                }
                buttonFloor++;
            }
        
        }

    }
}