$(document).ready(function () {
    init();
    getAll();
});

function init() {
    if (localStorage.getItem("logged_doctor") == null) {
        var item = `
        <li class="nav-item" id="header-login-template">
						<a class="nav-link header-login" href="login.html">login / hoang </a>
					</li>
        `
        $("#header-login-template").append(item);
    } else {
        var item = `
        <li class="nav-item">
        <p>${localStorage.getItem("logged_doctor")}</p>
						<a class="nav-link header-login" href="login.html" onClick="logout()"> Logout </a>
					</li>
        `
        $("#header-login-template").append(item);
    }
}

function logout() {
    localStorage.removeItem("logged_doctor")
    localStorage.removeItem("token")
    localStorage.removeItem("currentDoctor")
}

var selectedRow = null;

function getAll() {
    // Call Web API to get a list
    $.ajax({
        url: "http://localhost:4000/doctor",
        type: "GET",
        dataType: "json",
        success: function (doctors) {
            if ($("#doctorlist tbody").length != 0) {
                $("#doctorlist").empty();
            }
            getAllSuccess(doctors);
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        },
    });
}

function getAllSuccess(employeeList) {
    // Iterate over the collection of data
    // $.each(employeeList, function (index, e) {
    //     // Add a row to the Product table
    //     $("#doctorlist").append(render(e));
    // });
    for (let i = 0; i < 10; i++) {
        $("#doctorlist").append(render(e));
    }
}

// function getSpecializationIconFromCode(specialization_code) {
//     if (specialization_code == null) {
//         return ``;
//     }

//     let imgIcon = "";
//     let imgAlt = "";
//     if (specialization_code.includes("CK") != -1) {
//         imgIcon = "assets/img/specialities/specialities-05.png"
//     } else {
//         imgIcon = "assets/img/specialities/specialities-01.png"
//     }
//     return `<h5 class="doc-department"><img src=${imgIcon} class="img-fluid" alt=${imgAlt}> `;
// }

function render(e) {
    return `ret`
};

function viewProfile(event, e) {
    console.log(">>>>>>>>>>>>")
    localStorage.setItem("currentDoctor", e?.id)
    // window.location.href = "doctor-profile.html";
    event.stopPropagation();
};

function handleException(request, message, error) {
    var msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
        msg += "Message" + request.responseJSON.Message + "\n";
    }
    alert(msg);
};