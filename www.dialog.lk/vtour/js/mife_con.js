/**
 * Created by SHALINDA on 6/22/2015.
 */

function MifeApi(acctkn) {
    var cusName = null, conStatus = null;
    paidMode = null;
    conStatusDesc = null;
    cusPrepaidBillExpDate = null,totalnightData=null,totalnightDataFormat=null,
        allowVASList = null, cusChargeType = null,percentage=null,percentagenight=null, loyalType = null, cusNIC = null, cusBillAddress = null,cusDatanightBal=null,cusDatanightBalFormat=null, cusBillAddress1 = null, cusDataPlan = null, cusDataUsed = null,cusDataUsedFormat=null, cusDataBal = null,cusDataBalFormat=null,cusDatanightUsed=null,cusDatanightUsedFormat=null, cusBillAddress2 = null, cusBillAddress3 = null, cusBillCity = null, cusPackageName = null, cusLastBill = 0.00, cusBillOutstand = 0.00, cusBillDate = null, cusRunningBillDate = null, cusLastBillDate = null, cusBillOutstandDate = null, cusBillDueDate = null, cusPackageRental = 0.00, cusBillAddress = null, vasList = null, resConStatus = null, resCusInfo = null,totalDataFormat=null, resAllowVASList = null, resCusPackage = null, resDataType = -null, resChargeType = null, resAccStatus = null, resDataUsage = null, resBillInfo = null
     selectedServiceID=null,selectedPackageID=null;



    this.getCusBasicInfo = function () {


        //Gets Basic Informatin of Customes
        resCusBasic = this.doAjax({"action": "get_cus_info", "acc_token": acctkn});
        if (typeof resCusBasic[0] !== 'undefined' && resCusBasic[0] == 200) {
            var CusBasic = $.parseJSON(resCusBasic[1]);
            if (CusBasic != '') {
                loyalType = CusBasic['loyality_segment'];
                cusMobileNumber = CusBasic['reference_number'];
                cusNIC = CusBasic['nic'];

                switch (loyalType) {
                    case 'NOR':
                        loyalType = 'NORMAL';
                        $('.monster').css('background-image','none');
                        break;
                    case 'CVS':
                        loyalType = 'SILVER';
                        $('.monster').css('background-image','url(images/coin.png)');
                        break;
                    case 'CVG':
                        loyalType = 'GOLD';
                        $('.monster').css('background-image', 'url(images/gold_coin.png)');
                        break;
                    case 'CVB':
                        loyalType = 'BRONZE';
                        $('.monster').css('background-image', 'url(images/bronze_coin.png)');
                        break;
                    case 'CVP':
                        loyalType = 'PLATINUM';
                        $('.monster').css('background-image', 'url(images/silver_coin.png)');
                        break;
                    default:
                        loyalType = 'NORMAL';
                        $('.monster').css('background-image','none');
                }

                this.setCusBasicInfo();

            } else {

            }


        }


    }

    this.getCusConnectionInfo = function () {
        //Gets Basic Informatin of Customes
        resCusConInfo = this.doAjax({"action": "get_cus_con_info", "acc_token": acctkn});

        if (typeof resCusConInfo != "undefined" && resCusConInfo[0]== 200) {
            var CusCon = $.parseJSON(resCusConInfo[1]);
            if (CusCon != '') {
                cusName = CusCon['customer']['name'];

                conStatusDesc = CusCon['connection_status'];
                cusBillAddress = CusCon['billing_address']['address'];
                cusPackageName = CusCon['package']['name'];
                cusPackageRental = parseFloat(CusCon['package']['rental']).toFixed(2);
                conStatus = (conStatusDesc.charAt(0)).toUpperCase();
                paidMode = CusCon['type'];
                if (paidMode == 'prepaid') {
                    cusBillBalance = parseFloat(CusCon['bill_info']['balance']).toFixed(2);
                    cusPrepaidBillExpDate = CusCon['bill_info']['active_until'];
                } else if (paidMode == 'postpaid') {
                    cusLastBill = parseFloat(CusCon['bill_info']['last_bill']).toFixed(2);
                    cusLastBillDate = CusCon['bill_info']['last_bill_date'];
                    cusBillOutstand =  parseFloat(CusCon['bill_info']['outstanding']).toFixed(2);
                    cusBillOutstandDate = CusCon['bill_info']['outstanding_date'];
                }

                this.setCusConnectionInfo();

            } else {

            }


        }


    }
    this.getDataUsage = function () {


        resDataUsage = this.doAjax({"action": "get_data_usage", "acc_token": acctkn});
	   
     this.setDataUsage(0);
        if (typeof resDataUsage != "undefined" && resDataUsage[0]== 200) {
            var dataUsage = $.parseJSON(resDataUsage[1]);


            if(dataUsage[0]['package']) {

                cusDataPlan = dataUsage[0]['package']['name'];
                cusDataUsed = dataUsage[0]['data']['usage']['amount'];
                cusDataUsedFormat =this.doformatData(cusDataUsed);
                cusDataBal = dataUsage[0]['data']['balance']['amount'];
                cusDataBalFormat = this.doformatData(cusDataBal);

                totalData = dataUsage[0]['data']['total']['amount'];
                totalDataFormat = this.doformatData(dataUsage[0]['data']['total']['amount']);
                percentage = 100 - Math.floor((cusDataUsed / totalData) * 100);
                this.setDataUsage(percentage);

            }
            if(dataUsage[1]['package']){
                cusDatanightPlan =dataUsage[1]['package']['name'];
                cusDatanightUsed = dataUsage[1]['data']['usage']['amount'];
                cusDatanightUsedFormat =this.doformatData(cusDatanightUsed);
                cusDatanightBal = dataUsage[1]['data']['balance']['amount'];
                cusDatanightBalFormat =this.doformatData(cusDatanightBal);
                totalnightData = dataUsage[1]['data']['total']['amount'];
                totalnightDataFormat =this.doformatData(dataUsage[1]['data']['total']['amount']);
                percentagenight = 100 - Math.floor((cusDatanightUsed / totalnightData) * 100);
            }




        }
    }

    var that=this;
    $("input[name=datashift]").change(function(){

        var datashift=$(this).val();
        if(datashift=='day' && percentage!=null){
            that.setDataUsage(percentage);
        }else if(datashift=='night' && percentagenight!=null){
            that.setDataUsage(percentagenight);
        }else{
            that.setDataUsage(100);
        }
    });



    this.setDataUsage = function (percentage) {


        $(function () {
            $('.chart').easyPieChart({
                easing: 'easeOutBounce',
                trackColor: '#E11757',
                barColor: '#FCB833',
                lineCap: 'butt',
                lineWidth: 12,
                size: 180,
                onStep: function (from, to, percent) {

                }
            });

            $('#cus-data-plan').html(cusDataPlan);
            $('#cus-data-used').html(cusDataUsedFormat);
            $('#cus-data-bal').html(cusDataBalFormat);
            if(percentage<0){
                percentage=0;
            }
            $('.percent').text(percentage);
            var chart = window.chart = $('.chart').data('easyPieChart');
            chart.update(percentage);

        });


    }


    this.setCusBasicInfo = function () {
        if (loyalType != '') {
            $('#login').text('logout');
            $("#loyalty-type").html(loyalType);
            $("#mobile_number").html(cusMobileNumber);
        }
    }


    this.setCusConnectionInfo = function () {
        if (cusName != '') {
            $('#customer-menu').show();
            $("#user_name,#cus-name").html(cusName);
            $('#connection-stat').html(conStatus).attr('data-original-title', conStatusDesc);
            $("#cus-nic").html(cusNIC);
            $("#cus-billaddress").html(cusBillAddress);
            $("#active-mobile-plan").html(cusPackageName);
            $('#cus-planrental').html(cusPackageRental);
            if (paidMode == 'prepaid') {
                $('#cus-bill-bal').html(cusBillBalance);
                $('#cus-bill-expdate').html(cusPrepaidBillExpDate);
                $('.postpaid-bill').hide();
                $('.prepaid-bill').show();
                $('#bill-popup').attr('data-content', '<small>Your available balance is Rs.' + cusBillBalance + ' Valid until ' + cusPrepaidBillExpDate + '</small>');
            } else if (paidMode == 'postpaid') {
                $('.postpaid-bill').show();
                $('.prepaid-bill').hide();

                $('#cus-last-bill').html(cusLastBill);
                $('#cus-bill-date').html(cusLastBillDate.substring(0, 10));
                $('#cus-bill-outstand').html(cusBillOutstand);
                $('#bill-popup').attr('data-content', '<small>Your total usage amount as at ' + cusBillOutstandDate.substring(0, 10) + '  is Rs.' + cusBillOutstand + '</small>');
            }
        }
    }



    this.getVASList=function(){
        resVASList = this.doAjax({"action": "get_vas_list", "acc_token": acctkn});
        tbody=null;
        if (typeof resVASList != "undefined" && resVASList[0]== 200) {
            $("#tbdoy-vas-list").empty();
            var vasList = $.parseJSON(resVASList[1]);
            $.each(vasList, function (index,singlevas) {
                for (i = 0; i < singlevas['packages'].length; i++) {
                    var remotePkg = singlevas['packages'][i]['package_id'];
                    var status = null;
                    var button = null;
                    var serviceID = singlevas['service_id'];
                    tbody += '<tr>';
                    tbody += '<td class="vas-name">' + singlevas['friendly_name'] +'</td>';
                    tbody += '<td class="vas-name">' +remotePkg+'</td>';
                    tbody += '<td>' + singlevas['rental'] + '</td>';





                    if (singlevas['packages'][i]['is_activated'] == true) {
                        status = 'Activated';
                        button = '<button class="vas-deactivate btn btn-warning" data-toggle="modal" data-target="#myModal" data-sid="' + serviceID + '" data-rempkg="' + remotePkg + '" >Deactivate</button>';

                    } else if (singlevas['packages'][i]['is_activated'] == false) {
                        status = 'Not Activated';
                        button = '<button class="vas-activate btn btn-success" data-toggle="modal" data-target="#myModal" data-sid="' + serviceID + '" data-rempkg="' + remotePkg + '">Activate</button>';

                    }


                    tbody += '<td>' + status + '</td>';
                    tbody += '<td>' + button + '</td>';
                    tbody += '</tr>';
                }
                });
            $("#tbdoy-vas-list").append(tbody);

            $('#btn-vaslist').css('display', 'block');
        }

    }

    $(document).on('click','.vas-deactivate',function () {
        message='Are you sure want to Deactivate this Service?';
        $('#confirm-msg').html(message);
        $('#confirm').modal('show');
        $('.cnf-btn-deactive').show();
        $('.cnf-btn-active').hide();
        selectedServiceID = $(this).data('sid');
        selectedPackageID = $(this).data('rempkg');
    });

    $('.cnf-btn-deactive').click(function(){
        that.deactivateVAS(selectedServiceID,selectedPackageID);
    });



      $(document).on('click','.vas-activate',function () {
        message='Are you sure want to Active this Service?';
        $('#confirm-msg').html(message);
        $('#confirm').modal('show');
          $('.cnf-btn-deactive').hide();
          $('.cnf-btn-active').show();
        selectedServiceID = $(this).data('sid');
        selectedPackageID = $(this).data('rempkg');
    });
    
    $('.cnf-btn-active').click(function(){
        that.activateVAS(selectedServiceID,selectedPackageID);
 	});


    this.activateVAS=function(serviceID,packageID) {
        resActivateVAS = this.doAjax({"action": "act_vas", "acc_token": acctkn, "service_id": serviceID,"package_id":packageID});

        if (resActivateVAS[0]== 200) {
            var activeVAS = $.parseJSON(resActivateVAS[1]);

            $('#myModalLabel').html('VAS Activation..');
            if(activeVAS['success']==true) {
                $('#alert-msg').html("Your service will be activated shortly.");
                $('#alert').modal('show');
                this.getVASList();
            }

        }else if(status=422){
        }

    }


    this.deactivateVAS=function(serviceID,packageID) {

        resDeactivateVAS = this.doAjax({"action": "deact_vas", "acc_token": acctkn, "service_id": serviceID, "package_id": packageID});

        if ( resDeactivateVAS[0]== 200) {
            var deactiveVAS = $.parseJSON(resDeactivateVAS[1]);

            if(deactiveVAS['success']==true) {
                $('#alert-msg').html("Your service will be deactivated shortly.");
                $('#alert').modal('show');
                this.getVASList();
            }

        }

    }
    this.doformatData=function(amount){
        return Math.round(amount/1024);
    }

    //Do Ajax Requests
    var that=this;
    this.doAjax = function (data_obj) {
        var ajaxResponse;
        jQuery.ajax({
            async: false,
            url: 'mife/mdl_con.php',
            type: 'GET',
            data: data_obj,
            tryCount: 0,
            retryLimit: 5,
            timeout:5000,
            success: function (response) {
                var res = JSON.parse(response);
                ajaxResponse = res;
            },
            error: function (xhr, status, error) {


                if (xhr.status == 500) {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        $.ajax(this);
                        return;
                    }else{
                        //Internal error or due to slow network connection
                        message='We are having technical difficulties at the moment.please,try again later';
                        $('#alert-msg').html(message);
                        $('#alert').modal('show');
                    }
                    return;
                }else{
                    var error=JSON.parse(xhr.responseText);
                    that.responseValidation(error);
                }




            }
        });


        return ajaxResponse;
    }


    this.responseValidation=function(errorResponse){
        var message="";
        var errStatus=errorResponse[0];
        var error=JSON.parse(errorResponse[1]);
        var errType=error['type'];
        var errmsg=error['message'];


        if(errStatus==422 && errmsg!="Could not locate a data connection."){
            //All the custom validations
            if(errType=="MifeAbstract\\Exception\\ValidationException"){
                message=errmsg;
            }else if(errType=='MifeAbstract\\Exception\\AuthenticatorException'){
                message=errmsg;
            }
            $('#alert-msg').html(message);
            $('#alert').modal('show');
        }



    }


    $("#vas-search-txt").keyup(function () {
        var value = $(this).val();

        if (value.length){
            $(".vas-list-tbl tr").each(function (index) {
                if (index != 0) {

                    $row = $(this);

                    $row.find(".vas-name").each(function () {

                        var cell = $(this).text();

                        if (cell.indexOf(value) < 0) {
                            $row.hide();

                        } else {
                            $row.show();
                            return false;
                        }

                    });
                }
            });
        }
        else{
            $(".vas-list-tbl tr").show();

        }
    });


}