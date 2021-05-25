
/*document.getElementById('numOfBasements') = function strawberry() {
  console.log("This is a test");
  console.log(potato.value);
}

 
 
 var numOfActiveHours = document.getElementById('numOfCompanies').value;
*/
//document.getElementById('unitePrice').onchange = 
function selectASAP () {
  var percetage;
  var unitePrice;
   if (document.getElementById('standard-option').checked) {

     unitePrice = 7565
     percetage = 0.1

  } else if (document.getElementById('premium-option').checked) {

     unitePrice = 12345
     percetage = 0.13

  } else if(document.getElementById('excelium-option').checked) {

     unitePrice = 15400
     percetage = 0.16
    
  }

  if (form_select.value==1) {
  
    var numOfAppartements = document.getElementById('numOfAppartementsR').value;
    var numOfFloors = document.getElementById('numOfFloorsR').value;
    var numOfBasements = document.getElementById('numOfBasementsR').value;
      
      var appFloorRatio = Math.ceil(numOfAppartements/numOfFloors);
      var doorForApp = Math.ceil(appFloorRatio/6);
      var columnFloorRatio = Math.ceil(numOfFloors/20);
     

    var noe =  doorForApp * columnFloorRatio;
    var totalEleCost = noe * unitePrice;
    var instalFee = totalEleCost * percetage;
    var total = totalEleCost + instalFee;
     
    } else if (form_select.value==2){
    
    var numOfCages = document.getElementById('numOfCagesB').value;
    var numOfFloors = document.getElementById('numOfFloorsB').value;
    var numOfBasements = document.getElementById('numOfBasementsB').value;
      
  var noe =  numOfCages;
  var totalEleCost = noe * unitePrice;
  var instalFee = totalEleCost * percetage;
  var total = totalEleCost + instalFee;

    } else if (form_select.value==3){
  
    var numOfFloors = document.getElementById('numOfFloorsC').value;
    var numOfBasements = document.getElementById('numOfBasementsC').value;
    var numOfMaxOccupants = document.getElementById('numOfMaxOccupantsC').value;

    var totalFloor = numOfFloors + numOfBasements;

    //var totalFloor = (Number(numOfFloors) + Number(numOfBasements));
    var totalOccupants = numOfMaxOccupants * totalFloor;
    var numOfElevators = totalOccupants/1000;
    var columnFloorRatio = Math.ceil(totalFloor/20);
    var eleColumnRatio = Math.ceil(numOfElevators / columnFloorRatio);

  var noe = eleColumnRatio * columnFloorRatio;
  var totalEleCost = noe * unitePrice;
  var instalFee = totalEleCost * percetage;
  var total = totalEleCost + instalFee;

    } else if (form_select.value==4){
      
      var numOfFloors = document.getElementById('numOfFloorsH').value;
    var numOfBasements = document.getElementById('numOfBasementsH').value;
    var numOfMaxOccupants = document.getElementById('numOfMaxOccupantsH').value;

    var totalFloor = (Number(numOfFloors) + Number(numOfBasements));
    var totalOccupants = numOfMaxOccupants * totalFloor;
    var numOfElevators = totalOccupants/1000;
    var columnFloorRatio = Math.ceil(totalFloor/20);
    var eleColumnRatio = Math.ceil(numOfElevators / columnFloorRatio);

  var noe = eleColumnRatio * columnFloorRatio;
  var totalEleCost = noe * unitePrice;
  var instalFee = totalEleCost * percetage;
  var total = totalEleCost + instalFee;
    };


  var totalEleCost = noe * unitePrice;
  var instalFee = totalEleCost * percetage;
  var total = totalEleCost + instalFee;

  document.getElementById('unitePrice').value =  unitePrice;
  document.getElementById('numOfElevators').value = noe;
  document.getElementById('totalPriceOfElevators').value = totalEleCost;
  document.getElementById('installationFee').value = instalFee;
  document.getElementById('totalFee').value = total;

};


