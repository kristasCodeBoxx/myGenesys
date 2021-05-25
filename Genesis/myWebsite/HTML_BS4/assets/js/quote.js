$(document).ready(function () {
    $("#numElev_2, #numElev_3, #elevPriceUnit, #elevTotal, #installationFee, #total_").attr('readonly', true);

    var numApp, numFloors, numBase, maxOcc, avgDoorsFloor, eleShaft;
    var prodRange = {
        type: null,
        price: null,
        installationFeePercentage: null
    };

    $('.formField').on('keyup', function () {
        doCalc();
    });


    $('#standard, #premium, #excelium').on('click', function () {
        
        getProdRange() ;
   
        document.getElementById('elevPriceUnit').value = (prodRange.price ).toFixed(2) + " $";
        doCalc();
    });

    $('#residential, #commercial, #corporate, #hybrid').on('click', function () {
        initialize();
    });


    function initialize() {
        $('.formField').val('');
        $('.productRangeBtn').prop('checked', false);
    };

    function getInfoNumApp() {
        numApp = $('#numApp').val();
    };

    function getInfoNumFloors() {
        numFloors = $('#numFloors').val();
    };

    function getInfoNumBase() {
        numBase = $('#numBase').val();
    };

    function getInfoNumElev() {
        numElev = $('#numElev').val();
    };

    function getInfoMaxOcc() {
        maxOcc = $('#maxOcc').val();
    };

    function getProdRange() {
        if ($('#standard').is(':checked')) {
            prodRange.type = "standard";
            prodRange.price = parseFloat(7565);
            prodRange.installationFeePercentage = 0.1;
            return prodRange;

        } else if ($('#premium').is(':checked')) {
            prodRange.type = "premium";
            prodRange.price = parseFloat(123456);
            prodRange.installationFeePercentage = 0.13;
            return prodRange;

        } else if ($('#excelium').is(':checked')) {
            prodRange.type = "excelium";
            prodRange.price = parseFloat(15400);
            prodRange.installationFeePercentage = 0.16;
            return prodRange;
        } else {
            prodRange.type = null,
            prodRange.price = null,
            prodRange.installationFeePercentage = null
            return prodRange;
        }
    };

    function GetInfos() {
        getInfoNumApp();
        getInfoNumFloors();
        getInfoNumBase();
        getInfoNumElev();
        getInfoMaxOcc();
        getProdRange();
    };

    function setRequiredElevatorsResult(finNumElev) {
        $("#numElev_2, #numElev_3").val(parseFloat(finNumElev));
    };

    function setPricesResults(finNumElev, roughTotal, installFee, total) {
        $("#elevTotal").val(parseFloat(roughTotal).toFixed(2) + " $");
        $("#installationFee").val(parseFloat(installFee).toFixed(2) + " $");
        $("#total_").val(parseFloat(total).toFixed(2) + " $");
    };

    function emptyElevatorsNumberAndPricesFields() {
        $('#numElev_3').val('');
        $('.priceField').val('');
    };

    function createFormData(projectType) {
        return {
            numberApp: numApp,
            numberFloors: numFloors,
            numberBase: numBase,
            maximumOcc: maxOcc,
            productRange: prodRange,
            projectType: projectType
        }
    };

    function negativeValues() {
        if ($('#numApp').val() < 0) {

            alert("Please enter a positive number!");
            $('#numApp').val('');
            return true

        } else if ($('#numBase').val() < 0) {

            alert("Please enter a positive number!");
            $('#numBase').val('');
            return true

        } else if ($('#numComp').val() < 0) {

            alert("Please enter a positive number!");
            $('#numComp').val('');
            return true

        } else if ($('#numPark').val() < 0) {

            alert("Please enter a positive number!");
            $('#numPark').val('');
            return true

        } else if ($('#numElev').val() < 0) {

            alert("Please enter a positive number!");
            $('#numElev').val('');
            return true

        } else if ($('#numCorpo').val() < 0) {

            alert("Please enter a positive number!");
            $('#numCorpo').val('');
            return true

        } else if ($('#maxOcc').val() < 0) {

            alert("Please enter a positive number!");
            $('#maxOcc').val('');
            return true
        } else if ($('#numFloors').val() < 0) {

            alert("Please enter a positive number!");
            $('#numFloors').val('');
            return true
        }
        else {
            return false
        }
    };

    function apiCall(projectType) {
        //Getting numbers from quote
        GetInfos();

        //Preparing data for Api call
      //  formData = createFormData(projectType);

        /*
                numberApp: numApp,
            numberFloors: numFloors,
            numberBase: numBase,
            maximumOcc: maxOcc,
            productRange: prodRange,
            projectType: projectType
        */
        switch(projectType)
        {
            case 'residential': 
                    //console.log("Project Type: " + projectType);

                    var newGroup = 0;

                    avgDoorsFloor = numApp / numFloors;
                    eleShaft = Math.ceil(avgDoorsFloor/ 6);
                    newGroup = numFloors / 20

                    /*console.log("Avg Doors Floor " + avgDoorsFloor);
                    console.log("Ele Shaft: " + eleShaft);                    
                    console.log("newGroup: " + newGroup);
                    */
                    /*
                        # of apartments / # of floors  = average doors per floor
                            Exclude # of basements
                        Elevator shaft for every 6 apartments
                        If apartment > 20 floors, double shafts for every new group of 20 stories
                    */

                    $('#numElev_2').val(eleShaft) ;

                    break;

            case 'commercial': 
                    //console.log(projectType);
                    /*
                        # elevator already given
                    */
                    $('#numElev_2').val(numElev) ;

                    break;

            case 'corporate':                   
            case 'hybrid':
                    //console.log(projectType);

                    /*
                        # occupants * # of floors (including # of basements) = total number of occupants
                        Number of occupants / 1000
                        # of floors (including basements) / 20 = number of columns 
                        number of elevators / number of columns = numbers of elevators per column
                        total number of elevators = # of elevators per column * number of columns
                    */

                    break;
            default:
                    //console.log("none");                                                            
                
        }
        
        var subTotal = numElev * prodRange.price;
        var installationFee = subTotal * prodRange.installationFeePercentage
        var grandTotal = subTotal + (installationFee);

        setPricesResults(numElev, subTotal, prodRange.installationFeePercentage, grandTotal);


  /*      $.ajax({
            type: "POST",
             url: 'http://localhost:3000/api/quoteCalculation/', //for local testing
            //url: 'https://rocketelevators-quote.herokuapp.com/api/quoteCalculation/',
            data: JSON.stringify(formData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                              
                setRequiredElevatorsResult(data.finalNumElev);
                    console.log("HERE");
                if (prodRange.type != null) {
                    console.log("SUBTOTAL: " + data.subTotal);
                    setPricesResults(data.finalNumElev, data.subTotal, data.installationFee, data.grandTotal);
                }
            }
        });*/
    }
    
    function doCalc() {
        if ($('#residential').hasClass('active') && !negativeValues() && $('#numApp').val() && $('#numFloors').val()) {
            apiCall('residential')
        } else if ($('#commercial').hasClass('active') && !negativeValues() && $('#numElev').val()  && $('#numPark').val()) {
            apiCall('commercial')
        } else if ($('#corporate').hasClass('active') && !negativeValues() && $('#numFloors').val() && $('#numBase').val() && $('#maxOcc').val()) {
            apiCall('corporate')
        } else {
            emptyElevatorsNumberAndPricesFields();
        };
    };
});
