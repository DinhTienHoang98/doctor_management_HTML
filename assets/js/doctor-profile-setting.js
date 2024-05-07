$(document).ready(function () {

});

var selectedRow = null;

function onDelete(id) {
    console.log(id);
    // Call Web API to get a list
    $.ajax({
        url: `http://localhost:3000/api/employee/${id}`,
        type: "DELETE",
        success: function () {
            getAll()
        },

        error: function (request, message, error) {
            handleException(request, message, error);
        },
    });
}

function onEdit(td) {
    console.log(td);
    selectedRow = td.parentElement.parentElement;
    console.log(selectedRow);
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("fullName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
    document.getElementById("salary").value = selectedRow.cells[3].innerHTML;
    document.getElementById("city").value = selectedRow.cells[4].innerHTML;
}

function readFormData() {
    var formData = {};
    if (selectedRow != null) {
        formData["id"] = document.getElementById("id").value;
    }
    formData["email"] = document.getElementById("email").value;
    formData["fullName"] = document.getElementById("fullName").value;
    formData["phoneNumber"] = document.getElementById("phoneNumber").value;
    formData["dayOfBirth"] = document.getElementById("dayOfBirth").value;
    formData["biography"] = document.getElementById("biography").value;
    console.log(formData);
    return formData;
}


function onFormSubmit() {
    var formData = readFormData();
    if (selectedRow == null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";
    selectedRow = null;
    getAll();
}

function insertNewRecord() {
    $.ajax({
        url: "http://localhost:3000/api/employee/post",
        type: "POST",
        data: JSON.stringify(readFormData()),
        contentType: "application/json; charset=utf-8",
        success: function () {
            getAll()
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        },
    });
}

function updateRecord() {
    $.ajax({
        url: "http://localhost:3000/api/employee/update",
        type: "PUT",
        data: JSON.stringify(readFormData()),
        contentType: "application/json; charset=utf-8",
        success: function () {
            getAll()
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        },
    });
}


function getAll() {
    // Call Web API to get a list
    $.ajax({
        url: "http://localhost:3000/api/employee/get-all",
        type: "GET",
        dataType: "json",
        success: function (products) {
            if ($("#employeeList tbody").length != 0) {
                $("#employeeList").empty();
            }
            getAllSuccess(products);
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        },
    });
}

function getAllSuccess(employeeList) {
    // Iterate over the collection of data
    $.each(employeeList, function (index, e) {
        // Add a row to the Product table
        addRow(e);
    });
}

function addRow(e) {
    // Check if <e> tag exists, add one if not
    if ($("#employeeList tbody").length == 0) {
        $("#employeeList").append("<tbody></tbody>");
    }
    // Append row to <table>
    $("#employeeList tbody").append(renderTable(e));
}



function renderTable(e) {
    var ret = `<tr>
        <td>${e.id}</td>
        <td>${e.fullName}</td>
        <td>${e.emailId}</td>
        <td>${e.salary}</td>
        <td>${e.city}</td>
        <td>
          <a onClick="onEdit(this)">Edit</a>
          <a onClick="onDelete(${e.id})">Delete</a>
        </td>
      </tr>`;
    return ret;
}

function handleException(request, message, error) {
    var msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
        msg += "Message" + request.responseJSON.Message + "\n";
    }
    alert(msg);
}