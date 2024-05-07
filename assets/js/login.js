
$(document).ready(function () {
});

function readFormData() {
    var formData = {};
    formData["user_name"] = document.getElementById("username").value;
    formData["password"] = document.getElementById("password").value;
    console.log(formData);
    return formData;
}

function onFormSubmit() {
    $.ajax({
        url: "http://localhost:4000/doctor/authenticate",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(readFormData()),
        success: function (response) {
            // Kiểm tra xem phản hồi có dữ liệu không
            if (response && response.token) {
                // Lưu token vào local storage (để sử dụng cho các yêu cầu sau này nếu cần)
                localStorage.setItem("logged_doctor", response.user_name);
                localStorage.setItem("token", response.token);

                // Kiểm tra role của người dùng
                if (response.role === "doctor") {
                    // Chuyển hướng đến trang "doctor.html"
                    window.location.href = "index.html";
                } else if (response.role === "admin") {
                    // Xử lý trường hợp người dùng không có quyền truy cập
                    window.location.href = "./admin/index.html";
                }

            } else {
                // Xử lý trường hợp phản hồi không chứa token
                alert("Không nhận được token từ máy chủ!");
            }
        },
        error: function (error) {
            handleException(error);
        }
    });
};


function handleException(request, message, error) {
    var msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
        msg += "Message: " + request.responseJSON.Message + "\n";
    }
    alert(msg);
}

// function getAll() {
//     // Call Web API to get a list
//     $.ajax({
//         url: "http://localhost:3000/api/employee/get-all",
//         type: "GET",
//         dataType: "json",
//         success: function (products) {
//             if ($("#employeeList tbody").length != 0) {
//                 $("#employeeList").empty();
//             }
//             getAllSuccess(products);
//         },
//         error: function (request, message, error) {
//             handleException(request, message, error);
//         },
//     });
// }

// function getAllSuccess(employeeList) {
//     // Iterate over the collection of data
//     $.each(employeeList, function (index, e) {
//         // Add a row to the Product table
//         addRow(e);
//     });
// }

// function addRow(e) {
//     // Check if <e> tag exists, add one if not
//     if ($("#employeeList tbody").length == 0) {
//         $("#employeeList").append("<tbody></tbody>");
//     }
//     // Append row to <table>
//     $("#employeeList tbody").append(renderTable(e));
// }

