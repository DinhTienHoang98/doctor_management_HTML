$(document).ready(function () {
    getAll();
});

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
    $.each(employeeList, function (index, e) {
        // Add a row to the Product table
        $("#doctorlist").append(renderTable(e));
    });
}

function getSpecializationIconFromCode(specialization_code) {
    if (specialization_code == null) {
        return ``;
    }

    let imgIcon = "";
    let imgAlt = "";
    if (specialization_code.includes("CK") != -1) {
        imgIcon = "assets/img/specialities/specialities-05.png"
    } else {
        imgIcon = "assets/img/specialities/specialities-01.png"
    }
    return `<h5 class="doc-department"><img src=${imgIcon} class="img-fluid" alt=${imgAlt}> `;
}

function renderTable(e) {
    var ret =
        `
         <div class="card">
         <div class="card-body">
             <div class="doctor-widget">
                 <div class="doc-info-left">
                     <div class="doctor-img">
                         <a href="doctor-profile.html">
                             <img src="assets/img/doctors/doctor-thumb-01.jpg" class="img-fluid" alt="User Image">
                         </a>
                     </div>
                     <div class="doc-info-cont">
                         <h4 class="doc-name"><a href="doctor-profile.html">${e.fullname}</a></h4>
                         <p class="doc-speciality">${e.workplace}</p>
                         ${getSpecializationIconFromCode(e.specialization_description)}${e.specialization_description != null ? e.specialization_description : `<i><-- Chưa cập nhập thông tin --></i>`}</h5>
                         <div class="rating">
                             <i class="fas fa-star filled"></i>
                             <i class="fas fa-star filled"></i>
                             <i class="fas fa-star filled"></i>
                             <i class="fas fa-star filled"></i>
                             <i class="fas fa-star"></i>
                             <span class="d-inline-block average-rating">(17)</span>
                         </div>
                         <div class="clinic-details">
                             <p class="doc-location"><i class="fas fa-map-marker-alt"></i> Florida, USA</p>
                             <ul class="clinic-gallery">
                                 <li>
                                     <a href="assets/img/features/feature-01.jpg" data-fancybox="gallery">
                                         <img src="assets/img/features/feature-01.jpg" alt="Feature">
                                     </a>
                                 </li>
                                 <li>
                                     <a href="assets/img/features/feature-02.jpg" data-fancybox="gallery">
                                         <img  src="assets/img/features/feature-02.jpg" alt="Feature">
                                     </a>
                                 </li>
                                 <li>
                                     <a href="assets/img/features/feature-03.jpg" data-fancybox="gallery">
                                         <img src="assets/img/features/feature-03.jpg" alt="Feature">
                                     </a>
                                 </li>
                                 <li>
                                     <a href="assets/img/features/feature-04.jpg" data-fancybox="gallery">
                                         <img src="assets/img/features/feature-04.jpg" alt="Feature">
                                     </a>
                                 </li>
                             </ul>
                         </div>
                         <div class="clinic-services">
                             <span>Dental Fillings</span>
                             <span> Whitneing</span>
                         </div>
                     </div>
                 </div>
                 <div class="doc-info-right">
                     <div class="clini-infos">
                         <ul>
                             <li><i class="far fa-thumbs-up"></i> 98%</li>
                             <li><i class="far fa-comment"></i> 17 Feedback</li>
                             <li><i class="fas fa-map-marker-alt"></i> Florida, USA</li>
                             <li><i class="far fa-money-bill-alt"></i> $300 - $1000 <i class="fas fa-info-circle" data-toggle="tooltip" title="Lorem Ipsum"></i> </li>
                         </ul>
                     </div>
                     <div class="clinic-booking">
                         <a class="view-pro-btn" href="/doctor-profile.html" onClick =" ${viewProfile(event, e)}">View Profile</a>
                         <a class="apt-btn" href="booking.html">Book Appointment</a>
                     </div>
                 </div>
             </div>
         </div>
     </div>
          `;
    return ret;
}

function viewProfile(event, e) {
    console.log(">>>>>>>>>>>>")
    localStorage.setItem("currentDoctor", e?.id)
    // window.location.href = "doctor-profile.html";
    event.stopPropagation();
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