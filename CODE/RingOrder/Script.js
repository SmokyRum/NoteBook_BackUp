const quality_types = ["CZGH", "SI2GH", "SI3GH", "VS2GH", "VS2-SI1HI", "SI-I1"];

const metal_types = ["10K White", "10K Yellow", "14K Rose", "14K White", "14K Yellow", "18K White", "18K Yellow", "22K White", "22K Yellow", "9K Rose", "9K White", "9K Yellow", "Platinum"];

const choice = ["Yes", "No"];

let validRows = ['Row0'];

let global64Data;

let globalRow = 1;

let globalCurrentRow = 1;

function removeFromValidRows(element) {
    const elementidx = validRows.indexOf(element);

    if (elementidx != -1) {
        validRows.splice(elementidx, 1);
    }
    else {
        console.log("Does not exist");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var currentDate = new Date();
    var timestamp = currentDate.getTime();
    var ustrr = "Unique ID : " + timestamp.toString();
    document.getElementById('epochTime').innerHTML = ustrr;
});

function getMetalValue(row) {

    var place = row.toString();

    var idx = "Metal" + place;

    var selectValue_temp = document.getElementById(idx).value;

    return selectValue_temp;
}

function getQualityValue(row) {

    var place = row.toString();

    var idx = "Quality" + place;

    var selectValue_temp = document.getElementById(idx).value;

    return selectValue_temp;
}

function getCenterQualityValue(row) {

    var place = row.toString();

    var idx = "CenterQuality" + place;

    var selectValue_temp = document.getElementById(idx).value;

    return selectValue_temp;
}

function getCustomerCenterValue(row) {

    var place = row.toString();

    var idx = "CustomerCenter" + place;

    var selectValue_temp = document.getElementById(idx).value;

    return selectValue_temp;
}

function getCenterValue(row) {

    var place = row.toString();

    var idx = "Center" + place;

    var selectValue_temp = document.getElementById(idx).value;

    return selectValue_temp;
}

function CellLogic() {

    const table = document.getElementById('DataTable');

    const rows = table.querySelectorAll('tr');
    // const cols = rows.querySelectorAll('td')[0];

    var selectCC, selectC;

    const cols = rows[i].getElementsByTagName('td');

    for (j = 0; j < cols.length; j++) {
        console.log(cols.length);
        const select = cols[j].querySelector('select , input');

        if (j == 7 && select) {
            selectCC = select.value;
            // console.log(select);
        }

        if (j == 8 && select) {
            selectC = select.value;
        }
    }

    if (selectCC == "Yes" && selectC == "No") {
        const select_temp = cols[6].querySelector('select');

        const select_temp2 = cols[5].querySelector('input');

        if (select_temp) {
            select_temp.disabled = true;
        }

        if (select_temp2) {
            select_temp2.disabled = true;
        }

    }   
}

function handleImage() {
    const input = document.getElementById('FileInput');
    const output = document.getElementById('output');

    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const imageDataUrl = e.target.result;

            // Create an object with image data
            const imageData = {
                fileName: file.name,
                fileType: file.type,
                base64Data: imageDataUrl.split(',')[1] // Extract base64 data
            };

            // Display image data in JSON format
            // output.textContent = JSON.stringify(imageData, null, 2);

            // Assign base64Data to the global variable
            global64Data = imageData.base64Data;

            // Call other functions that use globalBase64Data
            // submitform();
            useGlobalBase64Data();
        };

        reader.readAsDataURL(file);
    }
}

// document.getElementById('FileInput').addEventListener('change', function () {
//     const differentVariable = handleImage(displayImageData);
//     // console.log('base64Data in a different variable:', differentVariable);
// });

function useGlobalBase64Data() {
    // console.log(typeof global64Data);
    var str = global64Data;
    return str;
    // You can use globalBase64Data in other parts of your code
}

function addRow() {
    // var table = document.querySelector(".table tbody");

    var currRow = globalRow.toString();

    var table = document.getElementById("DataTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    newRow.id = 'Row' + currRow.toString();

    for (var i = 0; i < 9; i++) {
        if (i == 4 || i == 6) {
            var cell = newRow.insertCell(i);
            // cell.textContent = "Data";

            // Create a select element
            var select = document.createElement("select");
            select.className = "form-control";
            if (i == 4) {
                var idx = "Quality" + currRow;
                select.id = idx;
            }

            else {
                var idx = "CenterQuality" + currRow;
                select.id = idx;
            }

            var j = 0;

            // // Add options to the select element
            // var option = document.createElement("option");

            if (j == 0) {
                var option = document.createElement("option");
                option.disabled = true;
                option.selected = true;
                option.text = "Select an Option";
                select.appendChild(option);
            }
            j = j + 1;
            for (j = 1; j <= 6; j++) {
                var option = document.createElement("option");
                option.text = quality_types[j - 1];
                select.appendChild(option);
            }

            // Append the select element to the cell
            cell.appendChild(select);
            continue;
        }
        else if (i == 2) {
            var cell = newRow.insertCell(i);
            // cell.textContent = "Data";

            // Create a select element
            var select = document.createElement("select");
            select.className = "form-control";

            var idx = "Metal" + currRow;
            select.id = idx;

            var j = 0;

            // // Add options to the select element
            // var option = document.createElement("option");

            if (j == 0) {
                var option = document.createElement("option");
                option.disabled = true;
                option.selected = true;
                option.text = "Select an Option";
                select.appendChild(option);
            }
            j = j + 1;
            for (j = 1; j <= 13; j++) {
                var option = document.createElement("option");
                option.text = metal_types[j - 1];
                select.appendChild(option);
            }

            // Append the select element to the cell
            cell.appendChild(select);
            continue;
        }
        else if (i == 7 || i == 8) {
            var cell = newRow.insertCell(i);
            // cell.textContent = "Data";

            // Create a select element
            var select = document.createElement("select");
            select.className = "form-control";

            if (i == 7) {
                var idx = "CustomerCenter" + currRow;
                select.id = idx;
            }
            else {
                var idx = "Center" + currRow;
                select.id = idx;
                // select.onchange = CellLogic(globalRow);
            }

            var j = 0;

            // // Add options to the select element
            // var option = document.createElement("option");

            if (j == 0) {
                var option = document.createElement("option");
                option.disabled = true;
                option.selected = true;
                option.text = "Select an Option";
                select.appendChild(option);
            }
            j = j + 1;
            for (j = 1; j <= 2; j++) {
                var option = document.createElement("option");
                option.text = choice[j - 1];
                select.appendChild(option);
            }

            select.onchange = function () {
                handleInputThis(this);
            };

            // Append the select element to the cell
            cell.appendChild(select);

            //Add an EventListner 
            // const element = document.getElementById('idx');
            // element.addEventListener('change', CellLogic());

            continue;
        }
        var cell = newRow.insertCell(i);
        var input = document.createElement("input");
        input.type = "text" + currRow;
        input.className = "form-control";
        cell.appendChild(input);

    }

    var cell = newRow.insertCell(9);
    var input = document.createElement("input");
    input.type = "file";
    input.id = "FileInput";
    // input.name = "image";
    cell.appendChild(input);

    var cell = newRow.insertCell(10);
    var input = document.createElement("input");
    input.type = "text";
    input.className = "form-control";
    input.id = "Note" + currRow;
    cell.appendChild(input);

    var actionCell = newRow.insertCell(11);
    // actionCell.innerHTML = '<button class="btn btn-danger" style="background-color: #273B42; border-width:0px" onclick="deleteRow(' + (table.rows.length - 1) + ')">Delete <i class="bi bi-dash-circle-fill"></i></button> '
    actionCell.innerHTML = '<button class="btn btn-danger button" type="button" style="background-color: #273B42; border-width:0px" onclick="deleteRow(this)">Delete <i class="bi bi-dash-circle-fill"></i></button> '

    validRows.push(newRow.id);

    globalRow = globalRow + 1;

    // globalCurrentRow = globalRow - 1;

    // console.log(globalCurrentRow);
}

function deleteRow(button) {
    var row = button.closest('tr');

    console.log(row.id);

    if (row) {
        //Remove the <tr> from validRow array
        removeFromValidRows(row.id);

        // Remove the <tr> element
        row.parentNode.removeChild(row);
    } else {
        console.log("Error: <tr> element not found");
    }

    globalRow = globalRow - 1;
}

function submitform() {

    var combined_data1 = {};

    var formData = {
        ShippingAccount: Fetch_ShipAcc(),
        Name : Fetch_Name(),
        CustomerPO: Fetch_CustomerPO(),
        // DeliveryDate: ,
        Email: Fetch_Email(),
        Phone: Fetch_Phone(),
        Address1: Fetch_Addr1(),
        Address2: Fetch_Addr2(),
        // City: Fetch_City,
        // State: document.getElementById("state1").value,
        // Zip_Code: document.getElementById("Zip").value
    };


    combined_data1 = { ...combined_data1, ...formData };

    // console.log(combined_data1);

    // console.log(formData);

    // document.getElementById("jsonOutput").textContent = jsonData;

    var table = document.getElementById("DataTable");
    var tbody = table.getElementsByTagName("tbody")[0];
    var rows = tbody.getElementsByTagName("tr");

    for (var i = 0; i < globalRow; i++) {
        if (validRows.indexOf(rows[i].id) != -1) {

            // console.log("YES");

            // console.log(rows[i]);

            // console.log(i);

            var place = rows[i].id.charAt(rows[i].id.length - 1);

            // console.log(place);

            var cells = rows[i].getElementsByTagName("td");

            var combined_data = {};

            for (var j = 0; j < cells.length; j++) {
                if (j == 2) {
                    var selectValue = getMetalValue(place);
                    // console.log(selectValue);

                    json_metal = {
                        Row: i + 1,
                        // Key: "Metal",
                        Metal: selectValue,
                    }

                    // console.log(json_metal);

                    combined_data = { ...combined_data, ...json_metal };
                }
                else if (j == 4) {
                    var selectValue = getQualityValue(place);
                    // console.log(selectValue);

                    json_quality = {
                        Row: i + 1,
                        // Key: "Quality",
                        Quality: selectValue,
                    }

                    // console.log(json_metal);

                    combined_data = { ...combined_data, ...json_quality };
                }
                else if (j == 6) {
                    var selectValue = getCenterQualityValue(place);
                    // console.log(selectValue);

                    json_CenterQuality = {
                        Row: i + 1,
                        // Key: "CenterQuality",
                        CenterQuality: selectValue,
                    }

                    // console.log(json_metal);

                    combined_data = { ...combined_data, ...json_CenterQuality };
                }
                else if (j == 7) {
                    var selectValue = getCustomerCenterValue(place);
                    // console.log(selectValue);

                    json_CustomerCenter = {
                        Row: i + 1,
                        // Key: "CustomerCenter",
                        CustomerCenter: selectValue,
                    }

                    // console.log(json_metal);

                    combined_data = { ...combined_data, ...json_CustomerCenter };
                }
                else if (j == 8) {
                    var selectValue = getCenterValue(place);
                    // console.log(selectValue);

                    json_Center = {
                        Row: i + 1,
                        // Key: "Center",
                        Center: selectValue,
                    }

                    // console.log(json_metal);

                    combined_data = { ...combined_data, ...json_Center };
                }

                else if (j == 9) {
                    // var selectValue = handleImage();
                    // console.log(selectValue);
                    // console.log(global64Data);

                    var str = useGlobalBase64Data();

                    json_image = {
                        Row: i + 1,
                        // Key: "Image",
                        Image: str,
                    }

                    // console.log(json_image);

                    combined_data = { ...combined_data, ...json_image };
                }

                else {

                    var inputElement = cells[j].querySelector("input");

                    if (inputElement) {
                        var inputValue = inputElement.value;
                        // console.log("Row " + (i + 1) + ", Cell " + (j) + " input value: " + inputValue);
                        // console.log(JSON.stringify(inputValue));
                        // console.log(inputValue);

                        if (j == 0) {
                            json_data = {
                                Row: i + 1,
                                // Key: "Style",
                                Style: inputValue,
                            }

                            // console.log(json_data);

                            combined_data = { ...combined_data, ...json_data };
                        }

                        if (j == 1) {
                            json_data = {
                                Row: i + 1,
                                // Key: "Version",
                                Version: inputValue,
                            }

                            // console.log(json_data);
                            combined_data = { ...combined_data, ...json_data };
                        }

                        if (j == 3) {
                            json_data = {
                                Row: i + 1,
                                // Key: "RingSize",
                                RingSize: inputValue,
                            }

                            // console.log(json_data);
                            combined_data = { ...combined_data, ...json_data };
                        }

                        if (j == 5) {
                            json_data = {
                                Row: i + 1,
                                // Key: "CenterSize",
                                CenterSize: inputValue,
                            }

                            // console.log(json_data);
                            combined_data = { ...combined_data, ...json_data };
                        }

                        if (j == 10) {
                            json_data = {
                                Row: i + 1,
                                // Key: "Note",
                                Note: inputValue,
                            }

                            // console.log(json_data);
                            combined_data = { ...combined_data, ...json_data };
                        }
                    }
                }
            }

            combined_data1 = {...combined_data1, ...combined_data};
        }
        
        console.log(combined_data1);
    }
    // This helps in unwanted iterations of a certain task or button or function.
    event.stopPropagation();
}

//Logic for Cells :
function CellLogic(rowId) {

    const table = document.getElementById('DataTable');

    const rows = table.querySelectorAll(`tr#${rowId}`);

    var selectCC, selectCT;
    // const cols = rows.querySelectorAll('td')[0];
    // for(const row in rows) {

    const cols = rows[0].querySelectorAll('td');

    for (j = 0; j < cols.length; j++) {
        const select = cols[j].querySelectorAll('select');

        if (j == 7 && select[0].value == 'Yes') {
            // console.log(select[0].value);
            // select[0].disabled = true;
            selectCC = 1;
        }

        if (j == 8 && select[0].value == 'No') {
            // console.log(select[0].value);
            // select[0].disabled = true;
            selectCT = 1;
        }
        // console.log(j);
        // console.log(select);
    }

    console.log(selectCC + " " + selectCT);

    for (j = 0; j < cols.length; j++) {
        const select = cols[j].querySelectorAll('select , input');

        if (j == 5 && selectCC == 1 && selectCT == 1) {
            select[0].disabled = true;
        }

        if (j == 6 && selectCC == 1 && selectCT == 1) {
            select[0].disabled = true;
        }
    }
    // }

    // console.log(rows[0]);

    // const dataset = this.dataset.tag
}

function handleInputThis(inputElement) {
    const current = inputElement.closest('tr');

    const rowID = current.id;

    // console.log(`tr id : ${rowID}`);
    console.log('Row ID : ' + rowID);

    CellLogic(rowID);
}

function Fetch_Name() {
    var item = document.getElementById('item1');

    // console.log(item);

    var value = item.value;

    const para = document.createElement('p');

    // para.textContent = 'Name' + ' : ' + value;
    para.textContent = value;

    const target = document.getElementById('Insert_Here_1');

    // target.parentNode.(para, target);
    target.textContent = para.textContent;

    return para.textContent;
}

function Fetch_Phone() {
    var item = document.getElementById('item2');

    // console.log(item);

    var value = item.value;

    const para = document.createElement('p');

    // para.textContent = 'Phone' + ' : ' + value;
    para.textContent = value;

    const target = document.getElementById('Insert_Here_1_A');

    // target.parentNode.insertBefore(para, target);
    target.textContent = para.textContent;

    return para.textContent;
}

function Fetch_ShipAcc() {
    var item = document.getElementById('item3');

    // console.log(item);

    var value = item.value;

    const para = document.createElement('p');

    // para.textContent = 'Ship Account' + ' : ' + value;
    para.textContent = value;

    const target = document.getElementById('Insert_Here_1_B');

    // target.parentNode.insertBefore(para, target);
    target.textContent = para.textContent;

    return para.textContent;
}

function Fetch_DeliveryName() {
    var item = document.getElementById('item4');

    // console.log(item);

    var value = item.value;

    const para = document.createElement('p');

    // para.textContent = 'Delivery Name' + ' : ' + value;
    para.textContent = value;

    const target = document.getElementById('Insert_Here_2');

    // target.parentNode.insertBefore(para, target);
    target.textContent = para.textContent;

    return para.textContent;
}

function Fetch_Addr1() {
    var item = document.getElementById('item5');

    // console.log(item);

    var value = item.value;

    const para = document.createElement('p');

    // para.textContent = 'Address 1' + ' : ' + value;
    para.textContent = value;

    const target = document.getElementById('Insert_Here_2_A');

    // target.parentNode.insertBefore(para, target);
    target.textContent = para.textContent;

    return para.textContent;
}

function Fetch_Addr2() {
    var item = document.getElementById('item6');

    // console.log(item);

    var value = item.value;

    const para = document.createElement('p');

    // para.textContent = 'Address 2' + ' : ' + value;
    para.textContent = value;

    const target = document.getElementById('Insert_Here_2_B');

    // target.parentNode.insertBefore(para, target);
    target.textContent = para.textContent;

    return para.textContent;
}

function Fetch_CustomerPO() {
    var item = document.getElementById('item7');

    // console.log(item);

    var value = item.value;

    const para = document.createElement('p');

    // para.textContent = 'Customer PO' + ' : ' + value;
    para.textContent = value;

    const target = document.getElementById('Insert_Here_3');

    // target.parentNode.insertBefore(para, target);
    target.textContent = para.textContent;

    return para.textContent;
}

function Fetch_ConfirmOrder() {
    var item = document.getElementById("flexCheckDefault");

    // console.log(item);

    var value;

    if (item.checked) {
        value = "Confirmed";
    }

    // else {
    //     value = "No";
    // }

    const para = document.createElement('p');

    para.textContent = value;

    const target = document.getElementById("Insert_Here_3_A");

    target.textContent = para.textContent;

    return para.textContent;
}

function Fetch_UrgentOrder() {
    var item = document.getElementById("flexCheckDefault_1");

    // console.log(item);

    var value;

    if (item.checked) {
        value = "Urgent";
    }

    // else {
    //     value = "No";
    // }

    const para = document.createElement('p');

    para.textContent = value;

    const target = document.getElementById("Insert_Here_3_B");

    target.textContent = para.textContent;

    return para.textContent;
}

function Fetch_Email() {
    var item = document.getElementById("item3_A");

    // console.log(item);

    var value = item.value;

    const para = document.createElement('p');

    para.textContent = value;

    const target = document.getElementById("Insert_Here_1_C");

    target.textContent = para.textContent;

    return para.textContent;
}

// console.log(globalRow);

// console.log(validRows);