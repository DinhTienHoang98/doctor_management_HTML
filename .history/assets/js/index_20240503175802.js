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
    var ret =
        `
    <div class="profile-widget">
								<div class="doc-img">
									<a href="doctor-profile.html">
										<img class="img-fluid" alt="User Image" src="assets/img/doctors/doctor-01.jpg">
									</a>
									<a href="javascript:void(0)" class="fav-btn">
										<i class="far fa-bookmark"></i>
									</a>
								</div>
								<div class="pro-content">
									<h3 class="title">
										<a href="doctor-profile.html">${e.fullname}</a>
										<i class="fas fa-check-circle verified"></i>
									</h3>
									<p class="speciality">${e.workplace}</p>
									<div class="rating">
										<i class="fas fa-star filled"></i>
										<i class="fas fa-star filled"></i>
										<i class="fas fa-star filled"></i>
										<i class="fas fa-star filled"></i>
										<i class="fas fa-star filled"></i>
										<span class="d-inline-block average-rating">(17)</span>
									</div>
									<ul class="available-info">
										<li>
											<i class="fas fa-map-marker-alt"></i> Florida, USA
										</li>
										<li>
											<i class="far fa-clock"></i> Available on Fri, 22 Mar
										</li>
										<li>
											<i class="far fa-money-bill-alt"></i> $300 - $1000
											<i class="fas fa-info-circle" data-toggle="tooltip" title="Lorem Ipsum"></i>
										</li>
									</ul>
									<div class="row row-sm">
										<div class="col-6">
											<a href="doctor-profile.html" class="btn view-btn">View Profile</a>
										</div>
										<div class="col-6">
											<a href="booking.html" class="btn book-btn">Book Now</a>
										</div>
									</div>
								</div>
                            </div>;

    `
    return ret
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