//this function will make the update form visible with corresponding fields filled 

function enableEditFields(id, item, section, price, desc, specs){

    document.getElementById("update-form").style.display = "block";
    var updateForm = document.forms['update-form'];
    var sectionIndex = 0;
    console.log("section in scripts: " + section)
    switch(section){
        case "RAMs":
        sectionIndex = 1;
        break;
        case "GPUs":
        sectionIndex = 2;
        break;
        case "Accessories":
        sectionIndex = 3;
        break;
    }

        console.log("scripts indx after switch" + sectionIndex)
    
    updateForm.elements["sec_n"].value = sectionIndex;
    updateForm.elements["itemName"].value = item;
    updateForm.elements["id"].value = id;
    updateForm.elements["price"].value = price;
    updateForm.elements["specs"].value = specs;
    updateForm.elements["description"].value = desc;
}


//on cancel click click the update form will be hidden again
function onCancelUpdate(){
    document.getElementById("update-form").style.display = "none";
}
