/**
 * This file is using for javaScript validations of the Lesi- pay pre-eligibility check. 
 * 
 * @author Sahani Matara Arachchige
 * @since 13-06-2016
 * @last update 22-06-2016 changed income and payCapacity validation.
 *       Jira Sub Task Number :ATGONLINE-1783
 * 
 */


$(document).ready(function() {
	
	var nicErrorVal				= $("#nicError").text();


	$("#productDetails").hide();
	
  
     
     
    
     $("#nic").focusout(function(){
    	 var nic	= $("#nic").val();
    	 var messageNICEmptyError 					= $('#nicEmptyErrorMessage').val();
    	 var messageNICInvalidError 					= $('#nicInvalidErrorMessage').val();
    	 
			if (nic.trim().length == 0) {
				$("#incomeError").html("");
				$("#payCapacityError").html("");
				$("#ProductError").html("");
				$("#firstNameError").html("");
				$("#lastNameError").html("");
				$("#addressError").html("");
				$("#nicError").html(messageNICEmptyError);
				$("#occupationError").html("");
				$("#employementError").html("");
				$("#recidenceError").html("");
				$("#contactNumberError").html("");
				$("#captchaError").html("");
				$("#emailError").html("");
				$("#contactNoTwoError").html("");
				$("#emailError").html("");
				$("#contactNoTwoError").html("");
				$("#ConditionError").html("");
				isValid = "false";
				return false;
				
			} 
			
			else if (nic.trim().length > 0) {
   	 $.ajax({

				type : "POST",
				url : "/dlg/browse/gadgets/lesiPay/nicResponse.jsp",
				data : {
				nic : nic
				
				},
				
				success : function(response) {
					$("#nicError").html(response);
					$("#payCapacityError").html("");
					$("#ProductError").html("");
					$("#firstNameError").html("");
					$("#lastNameError").html("");
					$("#addressError").html("");
					$("#occupationError").html("");
					$("#employementError").html("");
					$("#incomeError").html("");
					$("#recidenceError").html("");
					$("#contactNumberError").html("");
					$("#captchaError").html("");
					$("#emailError").html("");
					$("#contactNoTwoError").html("");
					$("#emailError").html("");
					$("#contactNoTwoError").html("");
					$("#ConditionError").html("");

					
				},
				beforeSend : function() {
					$("#nicError").html("");
					$("#incomeError").html("");
					$("#payCapacityError").html("");
					$("#ProductError").html("");
					$("#firstNameError").html("");
					$("#lastNameError").html("");
					$("#addressError").html("");											
					$("#occupationError").html("");
					$("#employementError").html("");
					$("#recidenceError").html("");
					$("#contactNumberError").html("");
					$("#captchaError").html("");
					$("#emailError").html("");
					$("#emailError").html("");
					$("#contactNoTwoError").html("");
					$("#ConditionError").html("");
					
				}

			});
			}
    	});

	// ------------------------------Product Dropdown List------------------------------
	$('#formGrouptest').on('change','#productList',function() {
		
		
		var productList 						= $("#productList").val();
		
		if(productList !='-Select-'){
			$("#productDetails").show();
		}
		
		var phoneId = $("#productList option:selected").val();
			$.ajax({

				type : "POST",
				url : "/dlg/browse/gadgets/lesiPay/productDetails.jsp",
				data : {
				phoneId : phoneId
				
				},
				
				success : function(response) {
					$("#productDetails").html(response);
				},
				
				beforeSend : function() {
				// setting a timeout
					$("#productDetails").html("");
				}

			});
	});

	// ------------------------------income field focusout-------------------------------
	$("#income").focusout(function() {
						
		
						$("#productDetails").hide();
						

						var income 								= $("#income").val();
						var productList 						= $("#productList").val();
						var messageIncomeIsLessError 			= $('#incomeIsLessErrorMessage').val();
						var messageIncomeEmptyError 			= $('#incomeEmptyErrorMessage').val();
						var messagePayCapacityIsGreaterError 	= $('#payCapacityIsGreaterErrorMessage').val();
						var messageIncomeIsLessError 			= $('#incomeIsLessErrorMessage').val();
						var nicErrorVal							= $("#nicError").text();
						
						if (income.trim().length == 0) {
							if(nicErrorVal.trim().length <1){
								
							
							$("#incomeError").html(messageIncomeEmptyError);
							$("#firstNameError").html("");
							$("#lastNameError").html("");
							$("#nicError").html("");
							$("#occupationError").html("");
							$("#contactNumberError").html("");
							$("#addressError").html("");
							$("#payCapacityError").html("");
							$("#employementError").html("");
							$("#recidenceError").html("");
							$("#ProductError").html("");
							$("#captchaError").html("");
							$("#emailError").html("");
							$("#contactNoTwoError").html("");
							$("#ConditionError").html("");
							$('#productList').prop("disabled",true);
							$("#productDetails").hide();
							isValid = "false";
							return false;
							}
						}
						
						
						
						else {
								$('#productList').prop("disabled",false);
								$("#incomeError").html("");
								
							}
						
						
						
						if (income < 10000) {
							if(nicErrorVal.trim().length <1){
								$("#incomeError").html(messageIncomeIsLessError);
								$("#firstNameError").html("");
								$("#lastNameError").html("");
								$("#nicError").html("");
								$("#occupationError").html("");
								$("#contactNumberError").html("");
								$("#addressError").html("");
								$("#payCapacityError").html("");
								$("#employementError").html("");
								$("#recidenceError").html("");
								$("#ProductError").html("");
								$("#captchaError").html("");
								$("#emailError").html("");
								$("#contactNoTwoError").html("");
								$("#ConditionError").html("");
								$('#productList').prop("disabled",true);
								$("#productDetails").hide();
								isValid = "false";
								return false;
							}
							
							
							
						}
						
						
						else {
							$('#productList').prop("disabled",false);
							$("#incomeError").html("");
							
							
						}
					
						
						
						var income = parseFloat(income.trim());
						var incomeCal = $("#income").val();
						
						var upperLimit = (incomeCal*0.15*12*0.85);
					
						//------------------------------product According To Monthly Income----------------------------
						
						$.ajax({

							type : "POST",
							url : "/dlg/browse/gadgets/lesiPay/producAccordingToMonthlyCapacity.jsp",
							data : {
										upperLimit : upperLimit,
										
									},
									
									success : function(response) {
										$("#phoneName").html(response);
									},
									beforeSend : function() {
										
									}

						});

	});
	
	// ------------------------------Hide device details when user has not select a product -------------------------------
/*	$("#productList").focusin(function() {
		
		var productList 			= $("#productList").val();

		if(productList =='-Select-'){
			
			$("#productDetails").hide();
		}
		
	});*/

	
					
					//----------------- prevent jumps to the top of the page-----------------------------------------
					
					(function($) {
						
						$('a[href="#"]').click(function(e) {
							e.preventDefault();
						});
					})(jQuery);

					$('#busyimage').hide();

					
					
					//----------------------------Field validation when submiting the form --------------------------
					
					$("#SubmitButton").click(function() {

										var income 					= $("#income").val();
										var payCapacity 			= $("#payCapacity").val();
										var productList 			= $("#productList").val();
										var firstName 				= $("#firstName").val();
										var lastName 				= $("#lastName").val();
										var nic 					= $("#nic").val();
										var cusaddress 				= $("#cusaddress").val();
										var occupation 				= $("#occupation").val();
										var employmentType 			= $("#employmentType").val();
										var residenceType 			= $("#residenceType").val();
										var contactNo 				= $("#contactNo").val();
										var captchaText 			= $('#captchaText').val();
										var connectionType 			= "LesiPay";
										var isGuranterRequired 		= $('input[name=guarantor]').val();
										var product				 	= $( "#productList" ).val();
										var email 					= $("#email").val();
										var contactNoTwo 			= $("#contactNoTwo").val();
										var nicErrorVal				= $("#nicError").text();
										
										var nic = nic.toUpperCase();
										if( contactNo.charAt( 0 ) === '0' ){
											var contactNo = contactNo.slice(1);
										}
										
										
										if( contactNoTwo.charAt( 0 ) === '0' ){
											var contactNoTwo = contactNoTwo.slice(1);
										}
										
										
										var messageIncomeEmptyError 				= $('#incomeEmptyErrorMessage').val();
										var messageIncomeIsLessError 				= $('#incomeIsLessErrorMessage').val();
										var messageIncomeNegativeError 				= $('#incomeNegativeMessage').val();
										var messagePayCapacityEmptyError 			= $('#payCapacityEmptyErrorMessage').val();
										var messagePayCapacityNegativError 			= $('#payCapacityNegativErrorMessage').val();

										var messageProductNotSelectedError 			= $('#productNotSelectedErrorMessage').val();

										var messageFirstNameEmptyError 				= $('#firstNameEmptyErrorMessage').val();
										var messageLastNameEmptyError 				= $('#lastNameEmptyErrorMessage').val();
										

										var messageAddressEmptyError 				= $('#addressEmptyErrorMessage').val();
										var messageAddressInvalidError 				= $('#addressInvalidErrorMessage').val();

										var messageNICEmptyError 					= $('#nicEmptyErrorMessage').val();
										var messageNICInvalidError 					= $('#nicInvalidErrorMessage').val();

										var messageOccupationEmptyError 			= $('#occupationEmptyErrorMessage').val();
										var messageOccupationInvalidError 			= $('#occupationInvalidErrorMessage').val();

										var messageEmploymentTypeEmptyError 		= $('#employmentTypeEmptyErrorMessage').val();
										var messageResidenceTypeEmptyError 			= $('#residenceTypeEmptyErrorMessage').val();

										var messageContactNoEmptyError 				= $('#contactNoEmptyErrorMessage').val();
										var messageContactNoInvalidError 			= $('#contactNoInvalidErrorMessage').val();
										var messageContactNoTwoInvalidError 		= $('#contactNoTwoInvalidErrorMessage').val();
										
										var captchaEmptyMessage 					=	$('#captchaEmptyMessage').val();
										var captchaInvalidMessage 					=	$('#captchaInvalidMessage').val();

										var messageGuarantorEmptyError 				= $('#guarantorEmptyErrorMessage').val();
										
										var webServiceFailureMessage				=   $('#commonWebServiceFailureMessage').val();
										
										var messagecommonError 						=	$('#commonErrorMessage').val();
										
										var messageEmailEmptyError 					=	$('#emailEmptyErrorMessage').val();
										var messageEmailInvalidError 				=	$('#emailInvalidErrorMessage').val();
										
										var messageConditionError					= 	$('#ConditionErrorMessage').val();
										
										
										
										
										//--------------------------------Income Validation -----------------------------------
										if (income.length == 0) {
											if(nicErrorVal.trim().length <1){
												$("#incomeError").html(messageIncomeEmptyError);
												$("#payCapacityError").html("");
												$("#firstNameError").html("");
												$("#lastNameError").html("");
												$("#addressError").html("");
												$("#occupationError").html("");
												$("#contactNumberError").html("");
												$("#nicError").html("");
												$("#employementError").html("");
												$("#recidenceError").html("");
												$("#ProductError").html("");
												$("#captchaError").html("");
												$("#emailError").html("");
												$("#contactNoTwoError").html("");
												$("#ConditionError").html("");
												isValid = "false";
												return false;
											}
										}
										
										var income = parseFloat(income.trim());
										

										if (income < 0) {
											if(nicErrorVal.trim().length <1){
												$("#incomeError").html(messageIncomeNegativeError);
												$("#firstNameError").html("");
												$("#lastNameError").html("");
												$("#nicError").html("");
												$("#occupationError").html("");
												$("#contactNumberError").html("");
												$("#addressError").html("");
												$("#payCapacityError").html("");
												$("#employementError").html("");
												$("#recidenceError").html("");
												$("#ProductError").html("");
												$("#captchaError").html("");
												$("#emailError").html("");
												$("#contactNoTwoError").html("");
												$("#ConditionError").html("");
												isValid = "false";
												return false;
											}
										}
										
										if (income < 10000) {
											if(nicErrorVal.trim().length <1){
												$("#incomeError").html(messageIncomeIsLessError);
												$("#firstNameError").html("");
												$("#lastNameError").html("");
												$("#nicError").html("");
												$("#occupationError").html("");
												$("#contactNumberError").html("");
												$("#addressError").html("");
												$("#payCapacityError").html("");
												$("#employementError").html("");
												$("#recidenceError").html("");
												$("#ProductError").html("");
												$("#captchaError").html("");
												$("#emailError").html("");
												$("#contactNoTwoError").html("");
												$("#ConditionError").html("");
												isValid = "false";
												return false;
											}
										}
										
										
										
										//-------------------------------------poduct dropdown validation-------------------------------------------
										
										if(productList =='-Select-'){
											if(nicErrorVal.trim().length <1){
												$("#ProductError").html(messageProductNotSelectedError);
												$("#firstNameError").html("");
												$("#lastNameError").html("");
												$("#addressError").html("");
												$("#nicError").html("");
												$("#occupationError").html("");
												$("#contactNumberError").html("");
												$("#incomeError").html("");
												$("#contactNumberError").html("");
												$("#payCapacityError").html("");
												$("#employementError").html("");
												$("#recidenceError").html("");
												$("#captchaError").html("");
												$("#emailError").html("");
												$("#contactNoTwoError").html("");
												$("#ConditionError").html("");
												$("#productDetails").hide();
												isValid = "false";
												return false;
											}
										}
										
										//--------------------------------Pay Capacity Validation -----------------------------------

										if (payCapacity.length == 0) {
											if(nicErrorVal.trim().length <1){
												
											
												$("#payCapacityError").html(messagePayCapacityEmptyError);
												$("#firstNameError").html("");
												$("#lastNameError").html("");
												$("#addressError").html("");
												$("#occupationError").html("");
												$("#contactNumberError").html("");
												$("#nicError").html("");
												$("#incomeError").html("");
												$("#employementError").html("");
												$("#recidenceError").html("");
												$("#ProductError").html("");
												$("#captchaError").html("");
												$("#emailError").html("");
												$("#contactNoTwoError").html("");
												$("#ConditionError").html("");
												isValid = "false";
												return false;
												
											}
										}

										var payCapacity = parseFloat(payCapacity.trim());
										


										if (payCapacity < 0) {
											if(nicErrorVal.trim().length <1){
												$("#payCapacityError").html(messagePayCapacityNegativError);
												$("#firstNameError").html("");
												$("#lastNameError").html("");
												$("#nicError").html("");
												$("#occupationError").html("");
												$("#contactNumberError").html("");
												$("#addressError").html("");
												$("#incomeError").html("");
												$("#employementError").html("");
												$("#recidenceError").html("");
												$("#ProductError").html("");
												$("#captchaError").html("");
												$("#emailError").html("");
												$("#contactNoTwoError").html("");
												$("#ConditionError").html("");
												isValid = "false";
												return false;
											}
										}
										
										
										// ------------------Type of Employement Validation-------------------------------------
										
										if(employmentType =='-Select-'){
											if(nicErrorVal.trim().length <1){
												
											
											$("#employementError").html(messageEmploymentTypeEmptyError);
											$("#firstNameError").html("");
											$("#lastNameError").html("");
											$("#addressError").html("");
											$("#nicError").html("");
											$("#occupationError").html("");
											$("#contactNumberError").html("");
											$("#incomeError").html("");
											$("#payCapacityError").html("");
											$("#recidenceError").html("");
											$("#ProductError").html("");
											$("#captchaError").html("");
											$("#emailError").html("");
											$("#contactNoTwoError").html("");
											$("#ConditionError").html("");
											isValid="false";
											return false;
											}
										}
										
										// ------------------Occupation Validation-------------------------------------
										if (occupation.trim().length == 0) {
											if(nicErrorVal.trim().length <1){
												$("#occupationError").html(messageOccupationEmptyError);
												$("#firstNameError").html("");
												$("#lastNameError").html("");
												$("#nicError").html("");
												$("#addressError").html("");
												$("#contactNumberError").html("");
												$("#incomeError").html("");
												$("#payCapacityError").html("");
												$("#employementError").html("");
												$("#recidenceError").html("");
												$("#ProductError").html("");
												$("#captchaError").html("");
												$("#emailError").html("");
												$("#contactNoTwoError").html("");
												$("#ConditionError").html("");
												isValid = "false";
												return false;
											}
										}


										// -------------------------------------Name Validation ----------------------------------------------------
										if (firstName.trim().length == 0) {
											if(nicErrorVal.trim().length <1){
												
												$("#firstNameError").html(messageFirstNameEmptyError);
												$("#lastNameError").html("");
												$("#addressError").html("");
												$("#nicError").html("");
												$("#occupationError").html("");
												$("#contactNumberError").html("");
												$("#incomeError").html("");
												$("#payCapacityError").html("");
												$("#employementError").html("");
												$("#recidenceError").html("");
												$("#ProductError").html("");
												$("#captchaError").html("");
												$("#emailError").html("");
												$("#contactNoTwoError").html("");
												$("#ConditionError").html("");
												isValid = "false";
												return false;
											}
										}

										else if (lastName.trim().length == 0) {
											if(nicErrorVal.trim().length <1){
												
											
												$("#lastNameError").html(messageLastNameEmptyError);
												$("#firstNameError").html("");
												$("#addressError").html("");
												$("#nicError").html("");
												$("#occupationError").html("");
												$("#contactNumberError").html("");
												$("#incomeError").html("");
												$("#payCapacityError").html("");
												$("#employementError").html("");
												$("#recidenceError").html("");
												$("#ProductError").html("");
												$("#captchaError").html("");
												$("#emailError").html("");
												$("#contactNoTwoError").html("");
												$("#ConditionError").html("");
												isValid = "false";
												return false;
											}
										}
								
										// ----------------------------------------NIC Validation----------------------------------------
									if (nic.trim().length == 0) {
											$("#incomeError").html("");
											$("#payCapacityError").html("");
											$("#ProductError").html("");
											$("#firstNameError").html("");
											$("#lastNameError").html("");
											$("#addressError").html("");
											$("#nicError").html(messageNICEmptyError);
											$("#occupationError").html("");
											$("#employementError").html("");
											$("#recidenceError").html("");
											$("#contactNumberError").html("");
											$("#captchaError").html("");
											$("#emailError").html("");
											$("#contactNoTwoError").html("");
											$("#emailError").html("");
											$("#contactNoTwoError").html("");
											$("#ConditionError").html("");
											isValid = "false";
											return false;
											
										}
										
									
										
									//	-----------------------------
										
						
									
										// ------------------Email Validation -------------------------------------
										
										if(email.trim().length>0){
									 		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
									 		var address = email;
									 		if(reg.test(address) == false) {
									 			if(nicErrorVal.trim().length <1){
										 			$("#emailError").html(messageEmailInvalidError);
										 			$("#firstNameError").html("");
													$("#lastNameError").html("");
													$("#addressError").html("");
													$("#nicError").html("");
													$("#occupationError").html("");
													$("#contactNumberError").html("");
													$("#incomeError").html("");
													$("#payCapacityError").html("");
													$("#employementError").html("");
													$("#recidenceError").html("");
													$("#ProductError").html("");
													$("#captchaError").html("");
													$("#contactNoTwoError").html("");
													$("#ConditionError").html("");
													isValid 	= "false";
										    		return false;
									 			}
									   		}
									 		
										}
										
										

										// ------------------Contact Number Validation -------------------------------------
										if (contactNo.trim().length == 0) {
											if(nicErrorVal.trim().length <1){
												$("#contactNumberError").html(messageContactNoEmptyError);
												$("#firstNameError").html("");
												$("#lastNameError").html("");
												$("#nicError").html("");
												$("#addressError").html("");
												$("#occupationError").html("");
												$("#incomeError").html("");
												$("#payCapacityError").html("");
												$("#employementError").html("");
												$("#recidenceError").html("");
												$("#ProductError").html("");
												$("#captchaError").html("");
												$("#emailError").html("");
												$("#contactNoTwoError").html("");
												$("#ConditionError").html("");
												isValid = "false";
												return false;
											}
										}

										else if (contactNo.length == 10) {
											if (contactNo.substring(0, 1) == 0) {
													$("#contactNumberError").html("");
												} 
											else {
												$("#contactNumberError").html(messageContactNoInvalidError);
												return false;
											}

										}

										else if (contactNo.trim().length == 9) {
											if (contactNo.substring(0, 1) == 0) {
												if(nicErrorVal.trim().length <1){
													
													$("#contactNumberError").html(messageContactNoInvalidError);
													$("#firstNameError").html("");
													$("#lastNameError").html("");
													$("#nicError").html("");
													$("#addressError").html("");
													$("#occupationError").html("");
													$("#incomeError").html("");
													$("#payCapacityError").html("");
													$("#employementError").html("");
													$("#recidenceError").html("");
													$("#ProductError").html("");
													$("#captchaError").html("");
													$("#emailError").html("");
													$("#contactNoTwoError").html("");
													$("#ConditionError").html("");
													isValid = "false";
													return false;
												}
											}
										}

										else if (contactNo.length < 9 || contactNo.length > 9) {
											if(nicErrorVal.trim().length <1){
												$("#contactNumberError").html(messageContactNoInvalidError);
												$("#firstNameError").html("");
												$("#lastNameError").html("");
												$("#nicError").html("");
												$("#addressError").html("");
												$("#occupationError").html("");
												$("#incomeError").html("");
												$("#payCapacityError").html("");
												$("#employementError").html("");
												$("#recidenceError").html("");
												$("#ProductError").html("");
												$("#captchaError").html("");
												$("#emailError").html("");
												$("#contactNoTwoError").html("");
												$("#ConditionError").html("");
												isValid = "false";
												return false;
											}
										}
										
										
										// ------------------Contact Number two Validation ------------------------------------- 
										
										if (contactNoTwo.trim().length != 0) {
											if (contactNoTwo.trim().length == 10) {
												if (contactNoTwo.trim().substring(0, 1) == 0) {
													$("#contactNoTwoError").html("");
													} 
												else {
													$("#contactNoTwoError").html(messageContactNoTwoInvalidError);
												}

											}

											else if (contactNoTwo.trim().length == 9) {
												if (contactNoTwo.substring(0, 1) == 0) {
													
													if(nicErrorVal.trim().length <1){
														
														$("#contactNoTwoError").html(messageContactNoTwoInvalidError);
														$("#firstNameError").html("");
														$("#lastNameError").html("");
														$("#nicError").html("");
														$("#addressError").html("");
														$("#occupationError").html("");
														$("#incomeError").html("");
														$("#payCapacityError").html("");
														$("#employementError").html("");
														$("#recidenceError").html("");
														$("#ProductError").html("");
														$("#captchaError").html("");
														$("#emailError").html("");
														("#contactNumberError").html("");
														$("#ConditionError").html("");
														isValid = "false";
														return false;
														
													}
												}
											}

											else if (contactNoTwo.length < 9 || contactNo.length > 9) {
												if(nicErrorVal.trim().length <1){
													$("#contactNoTwoError").html(messageContactNoTwoInvalidError);
													$("#firstNameError").html("");
													$("#lastNameError").html("");
													$("#nicError").html("");
													$("#addressError").html("");
													$("#occupationError").html("");
													$("#incomeError").html("");
													$("#payCapacityError").html("");
													$("#employementError").html("");
													$("#recidenceError").html("");
													$("#ProductError").html("");
													$("#captchaError").html("");
													$("#emailError").html("");
													("#contactNumberError").html("");
													$("#ConditionError").html("");
													isValid = "false";
													return false;
												}
											}
											
										}

										

										
										//----------------------------------------Address Validation -------------------------------------
										if (cusaddress.trim().length == 0) {
											if(nicErrorVal.trim().length <1){
												$("#addressError").html(messageAddressEmptyError);
												$("#firstNameError").html("");
												$("#lastNameError").html("");
												$("#nicError").html("");
												$("#occupationError").html("");
												$("#contactNumberError").html("");
												$("#incomeError").html("");
												$("#payCapacityError").html("");
												$("#employementError").html("");
												$("#recidenceError").html("");
												$("#ProductError").html("");
												$("#captchaError").html("");
												$("#emailError").html("");
												$("#contactNoTwoError").html("");
												$("#ConditionError").html("");
												isValid = "false";
												return false;
											}
										}

										else if (cusaddress.trim().length < 10) {
											if(nicErrorVal.trim().length <1){
											$("#addressError").html(messageAddressInvalidError);
											$("#firstNameError").html("");
											$("#lastNameError").html("");
											$("#nicError").html("");
											$("#occupationError").html("");
											$("#contactNumberError").html("");
											$("#incomeError").html("");
											$("#payCapacityError").html("");
											$("#employementError").html("");
											$("#recidenceError").html("");
											$("#ProductError").html("");
											$("#captchaError").html("");
											$("#emailError").html("");
											$("#contactNoTwoError").html("");
											$("#ConditionError").html("");
											isValid = "false";
											return false;
											}
										}
										
										
										
										

									
										
										
										// ------------------Type of Residence Validation-------------------------------------
										
										if(residenceType =='-Select-'){
											if(nicErrorVal.trim().length <1){
											$("#recidenceError").html(messageResidenceTypeEmptyError);
											$("#firstNameError").html("");
											$("#lastNameError").html("");
											$("#addressError").html("");
											$("#nicError").html("");
											$("#occupationError").html("");
											$("#contactNumberError").html("");
											$("#incomeError").html("");
											$("#payCapacityError").html("");
											$("#employementError").html("");
											$("#ProductError").html("");
											$("#captchaError").html("");
											$("#emailError").html("");
											$("#contactNoTwoError").html("");
											$("#ConditionError").html("");
											return false;
											}
										}

										
										// ------------------Terms and Condition Validation -------------------------------------
										
										
										        var error = 0;
										        if (!($('#agree').is(':checked'))) {
										            error = 1
										            if(nicErrorVal.trim().length <1){
										            $("#ConditionError").html(messageConditionError);
													$("#recidenceError").html("");
													$("#firstNameError").html("");
													$("#lastNameError").html("");
													$("#addressError").html("");
													$("#nicError").html("");
													$("#occupationError").html("");
													$("#contactNumberError").html("");
													$("#incomeError").html("");
													$("#payCapacityError").html("");
													$("#employementError").html("");
													$("#ProductError").html("");
													$("#captchaError").html("");
													$("#emailError").html("");
													$("#contactNoTwoError").html("");
										            }
										        }

										       if (error) {
										            return false;
										        } else {
										        	$("#ConditionError").html("");
										        }

										   
										
										
										// ------------------------------------captcha Validation -----------------------------------

										if(captchaText.length == 0 ){  
											
											if(nicErrorVal.trim().length <1){
											
											$("#captchaError").html(captchaEmptyMessage);
											$("#occupationError").html("");
											$("#firstNameError").html("");
											$("#lastNameError").html("");
											$("#nicError").html("");
											$("#addressError").html("");
											$("#contactNumberError").html("");
											$("#incomeError").html("");
											$("#payCapacityError").html("");
											$("#employementError").html("");
											$("#recidenceError").html("");
											$("#ProductError").html("");
											$("#emailError").html("");
											$("#contactNoTwoError").html("");
											$("#ConditionError").html("");
											isValid 	= "false";
											return false;
											
											}
										}
										
											if(captchaText.length != 5 ){  
											
											if(nicErrorVal.trim().length <1){
											
											$("#captchaError").html(captchaInvalidMessage);
											$("#occupationError").html("");
											$("#firstNameError").html("");
											$("#lastNameError").html("");
											$("#nicError").html("");
											$("#addressError").html("");
											$("#contactNumberError").html("");
											$("#incomeError").html("");
											$("#payCapacityError").html("");
											$("#employementError").html("");
											$("#recidenceError").html("");
											$("#ProductError").html("");
											$("#emailError").html("");
											$("#contactNoTwoError").html("");
											$("#ConditionError").html("");
											isValid 	= "false";
											return false;
											}
										}
										
											if(nicErrorVal.trim().length >1){
												return false;
											}
											
										$.ajax({
													type : "POST",
													url : "/dlg/browse/gadgets/lesiPay/lesiPayResponse.jsp",
													data : {
														income : income,
														firstName : firstName,
														lastName : lastName,
														payCapacity : payCapacity,
														product : product,
														nic : nic,
														email:email,
														cusaddress : cusaddress,
														occupation:occupation,
														employmentType : employmentType,
														residenceType : residenceType,
														contactNo : contactNo,
														contactNoTwo:contactNoTwo,
														captchaText : captchaText,
														connectionType : connectionType,
														category : "LesiPay",
														isGuranterRequired : isGuranterRequired
													},
													
													success : function(result) {
															
													//if(result.contains("wrongCaptcha")){
														if (result.indexOf("wrongCaptcha") >= 0) {
															$("#captchaError").html(captchaInvalidMessage);
															$("#occupationError").html("");
															$("#firstNameError").html("");
															$("#lastNameError").html("");
															$("#nicError").html("");
															$("#addressError").html("");
															$("#contactNumberError").html("");
															$("#incomeError").html("");
															$("#payCapacityError").html("");
															$("#employementError").html("");
															$("#recidenceError").html("");
															$("#ProductError").html("");
															$('#busyimage').hide();
															$("#emailError").html("");
															$("#contactNoTwoError").html("");
															$("#ConditionError").html("");
															$('#SubmitButton').attr("disabled", false);
															/*$('#responseMsg').html(result);*/
															
														} 
														
														else {
																if (result.indexOf("failed") >= 0) {
																$('#responseMsg').html(webServiceFailureMessage);
															} else {
																$('#responseMsg').html(result);
															}
															$('#busyimage').hide();
														}
														
													
													

													},
													
													
													
													
													error : function(result) {
														$('#responseMsg').html(messagecommonError);
														$('#busyimage').hide();
														$("#incomeError").html("");
														$("#payCapacityError").html("");
														$("#ProductError").html("");
														$("#firstNameError").html("");
														$("#lastNameError").html("");
														$("#addressError").html("");
														$("#nicError").html("");
														$("#occupationError").html("");
														$("#employementError").html("");
														$("#recidenceError").html("");
														$("#contactNumberError").html("");
														$("#captchaError").html("");
														$("#emailError").html("");
														$("#contactNoTwoError").html("");
														$("#ConditionError").html("");
													},
													
													beforeSend : function(msg) {
														$('#busyimage').removeAttr('class');
														$('#busyimage').show();
														$("#contactNumberError").html("");
														$("#firstNameError").html("");
														$("#lastNameError").html("");
														$("#addressError").html("");
														//$("#nicError").html("");
														$("#occupationError").html("");
														$("#incomeError").html("");
														$("#payCapacityError").html("");
														$("#employementError").html("");
														$("#recidenceError").html("");
														$("#ProductError").html("");
														$("#captchaError").html("");
														$("#emailError").html("");
														$("#contactNoTwoError").html("");
														$("#ConditionError").html("");
														$('#SubmitButton').attr("disabled", true);

													}
												
											});
									});
					// --------------------------------- End Submit button Validation----------------------------------------------

					// ----------------------------contact number should not contain letters----------------------------------------
					
								$("#contactNo").keydown(function(event) {
											var currentVal = $("#contactNo").val();
											if (event.keyCode == 46 || event.keyCode == 8
													|| event.keyCode == 9) {
											} else if (event.keyCode == 37
													|| event.keyCode == 39) {
											} else if (event.keyCode == 190
													|| event.keyCode == 110) {
												if (currentVal.indexOf(".") != -1) {
													event.preventDefault();
												}
											} else {
												if (event.keyCode < 95) {
													if (event.keyCode < 48
															|| event.keyCode > 57) {
														event.preventDefault();
													}
												} else {
													if (event.keyCode < 96
															|| event.keyCode > 105) {
														event.preventDefault();
													}
												}
											}
								});
								
								
								// ----------------------------contact number should not contain letters----------------------------------------
								
								$("#contactNoTwo").keydown(function(event) {
											var currentVal = $("#contactNoTwo").val();
											if (event.keyCode == 46 || event.keyCode == 8
													|| event.keyCode == 9) {
											} else if (event.keyCode == 37
													|| event.keyCode == 39) {
											} else if (event.keyCode == 190
													|| event.keyCode == 110) {
												if (currentVal.indexOf(".") != -1) {
													event.preventDefault();
												}
											} else {
												if (event.keyCode < 95) {
													if (event.keyCode < 48
															|| event.keyCode > 57) {
														event.preventDefault();
													}
												} else {
													if (event.keyCode < 96
															|| event.keyCode > 105) {
														event.preventDefault();
													}
												}
											}
								});

				}); // ---------------------end of the first resdy function

				

				$(document).ready(function() {
					
					//---------------------------------Income Field only can contain Numbers ---------------------------------
					
					$(function() {
						$('#responseMsg').on('keydown','#income',function(e) {
							-1 !== $.inArray(e.keyCode, [ 46,
							8, 9, 27, 13, 110, 190 ])
							|| /65|67|86|88/.test(e.keyCode)
							&& (!0 === e.ctrlKey || !0 === e.metaKey)
							|| 35 <= e.keyCode
							&& 40 >= e.keyCode
							|| (e.shiftKey
							|| 48 > e.keyCode || 57 < e.keyCode)
							&& (96 > e.keyCode || 105 < e.keyCode)
							&& e.preventDefault()
						});
					});
					
					
					//---------------------------------PayCapacity Field only can contain Numbers ---------------------------------

					$(function() {
						$('#responseMsg').on('keydown','#payCapacity',function(e) {
							-1 !== $.inArray(e.keyCode, [ 46,
							8, 9, 27, 13, 110, 190 ])
							|| /65|67|86|88/
							.test(e.keyCode)
							&& (!0 === e.ctrlKey || !0 === e.metaKey)
							|| 35 <= e.keyCode
							&& 40 >= e.keyCode
							|| (e.shiftKey
							|| 48 > e.keyCode || 57 < e.keyCode)
							&& (96 > e.keyCode || 105 < e.keyCode)
							&& e.preventDefault()
						});
					});
					
					//--------------------- First Name can not containg numbers--------------------------------
					
					$("#firstName").keyup(
							function(event) {

								var cusName = $("#firstName").val();
								var invalidChars = /[^A-Z,\s]/gi
									if (invalidChars.test(cusName)) {
										document.getElementById("firstName").value = cusName.replace(invalidChars, "");
									}
								
							});
					
					//--------------------- Last Name can not containg numbers--------------------------------
					
					$("#lastName").keyup(
							function(event) {
								
								var cusName = $("#lastName").val();
								var invalidChars = /[^A-Z,\s]/gi
									if (invalidChars.test(cusName)) {
										document.getElementById("lastName").value = cusName.replace(invalidChars, "");
									}
							});

					
					
					
					
				});//--------------end second ready function




					
