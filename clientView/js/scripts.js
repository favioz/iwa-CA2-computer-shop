var gEntreeCount = 0;
var productId = 0;
										// returns a number that represents the sum of all the selected menu
										// item prices.
function calculateBill(idMenuTable) {
	var fBillTotal = 0.0;
	var i=0;
	
										// find the table tag
	var oTable = document.getElementById(idMenuTable);
	
										// go through the table and add up the prices of all
										// the selected items. The code takes advantage of the 
										// fact that each checkbox has a corresponding row in
										// the table, and the only INPUT tags are the checkboxes.
	var aCBTags = oTable.getElementsByTagName('INPUT');
	for (i=0; i < aCBTags.length; i++) {
										// is this menu item selected? it is if the checkbox is checked
		if (aCBTags[i].checked) {
										// get the checkbox' parent table row
			var oTR = getParentTag(aCBTags[i],'TR');
			
										// retrieve the price from the price column, which is the third column in the table
			var oTDPrice = oTR.getElementsByTagName('TD')[2];
										// the first child text node of the column contains the price
			fBillTotal += parseFloat(oTDPrice.firstChild.data);
		};
	};
										// return the price as a decimal number with 2 decimal places
	return Math.round(fBillTotal*100.0)/100.0;
};

										// This function either turns on or off the row highlighting for vegetarian
										// items (depending on the value of bShowVeg)
function highlightVegetarian(idTable, bShowVeg) {
										// if bShowVeg is true, then we're highlighting vegetarian
										//	meals, otherwise we're unhighlighting them.
	var i=0;
	var oTable = document.getElementById(idTable);

	var oTBODY = oTable.getElementsByTagName('TBODY')[0];
	var aTRs = oTBODY.getElementsByTagName('TR');
											// walk through each of the table rows and see if it has a 
											// "vegetarian" attribute on it.
	for (i=0; i < aTRs.length; i++) {
		if (aTRs[i].getAttribute('vegetarian') && aTRs[i].getAttribute('vegetarian') == "true") {
			if (bShowVeg){
				aTRs[i].style.backgroundColor = "lightGreen";
			} else {
				aTRs[i].style.backgroundColor = "";
			};
		};
	};
};

											// Utility function for getting the parent tag of a given tag
											// but only of a certain type (i.e. a TR, a TABLE, etc.)
function getParentTag(oNode, sParentType) {
	var oParent = oNode.parentNode;
	while (oParent) {
		if (oParent.nodeName == sParentType)
			return oParent;
		oParent = oParent.parentNode;
	};
	return oParent;
};

function enableEditFields(id, item, section, price, desc, specs){

    document.getElementById("update-form").style.display = "block";
    var updateForm = document.forms['update-form'];
    var sectionIndex = 0;
    switch(section){
        case "RAMs":
        sectionIndex = 1;
        break;
        case "GPUs":
        sectionIndex = 2;
        break;
        case "Accesories":
        sectionIndex = 3;
        break;
    }
    
    updateForm.elements["sec_n"].value = sectionIndex;
    updateForm.elements["itemName"].value = item;
    updateForm.elements["id"].value = id;
    updateForm.elements["price"].value = price;
    updateForm.elements["specs"].value = specs;
    updateForm.elements["description"].value = desc;
    productId = id;
    console.log(id + " " + item + " " + section)
}

function onCancelUpdate(){
    document.getElementById("update-form").style.display = "none";
}
