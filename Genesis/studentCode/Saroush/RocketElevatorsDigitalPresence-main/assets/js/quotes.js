
//js for the selection show/hide

function showDiv(form_select) {
    if(form_select.value==1) {
     document.getElementById('1').style.display = "block";
     document.getElementById('2').style.display = "none";
     document.getElementById('3').style.display = "none";
     document.getElementById('4').style.display = "none";
    } else if (form_select.value==2) {
     document.getElementById('1').style.display = "none";
     document.getElementById('2').style.display = "block";
     document.getElementById('3').style.display = "none";
     document.getElementById('4').style.display = "none";
     } else if (form_select.value==3) {
     document.getElementById('1').style.display = "none";
     document.getElementById('2').style.display = "none";
     document.getElementById('3').style.display = "block";
     document.getElementById('4').style.display = "none";
     } else if (form_select.value==4) {
     document.getElementById('1').style.display = "none";
     document.getElementById('2').style.display = "none";
     document.getElementById('3').style.display = "none";
     document.getElementById('4').style.display = "block";
     } else if (form_select.value==0){
    document.getElementById('1').style.display = "none";
    document.getElementById('2').style.display = "none";
    document.getElementById('3').style.display = "none";
    document.getElementById('4').style.display = "none";
    }
 };
  

 
