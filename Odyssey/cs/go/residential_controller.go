func (b Battery) findBestColumn(requestedFloor int) (myColumn Column) {
    // b.ColumnList[0].ServedFloors[1]
    b.ColumnList = append(b.ColumnList, myColumn {
        myColumn.Id = 1
        myColumn.ServedFloors = [0,-1,-2,-3,-4,-5]
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
    //columnList.Add(new Column("A", -6, 0, 5)); 
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
}