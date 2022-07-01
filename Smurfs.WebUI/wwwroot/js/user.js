﻿
var allData = null;
var id = null;
var username = null;
var surname = null;
var active = null;
var mail = null;
var dateOfStart = null;
var usergroup = null; 
var team = null; 
var password = null;

function reloadPage() {
    document.getElementById('newuser').style.display = 'none';
    window.location.reload()
}

$.ajax({
    'url': "https://smuhammetulas.com/api/User/GetUser",
    'method': "GET",
    'contentType': 'application/json'
}).done(function (data) {
    allData = data;

    for (var x of data) {
        x.dateOfStart = x.dateOfStart.replace("T00:00:00", "");

        x.active = x.active.replace("0", "No");
        x.active = x.active.replace("1", "Yes");
    };

    $('#userDatatable').dataTable({
        "paging": true,
        "aaData": data,
        "columns": [
            { "data": "id" },
            { "data": "name" },
            { "data": "surname" },
            { "data": "active" },
            { "data": "mail" },
            { "data": "dateOfStart" },
            { "data": "usergroup" },
            { "data": "team" },

            {
                "render": function (data, x, row) {
                    return "<button class='btn btn-danger Delete' data-id='" + row.id + "' >Delete</button>";
                }
            },
            {
                "render": function (data, x, row) {
                    return "<button class='btn btn-info Update' data-id='" + row.id + "' >Update</button>";
                }

            },

        ]
    })
})

$.ajax({
    'url': "https://smuhammetulas.com/api/Usergroup",
    'method': "GET",
    'contentType': 'application/json'
}).done(function (data) {
    data.forEach(x => {
        $('#Usergroup').append(`<option value="${x.groupName}">${x.groupName}</option>`)
    });
})

$.ajax({
    'url': "https://smuhammetulas.com/api/Team",
    'method': "GET",
    'contentType': 'application/json'
}).done(function (data) {
    data.forEach(x => {
        $('#Team').append(`<option value="${x.teamName}">${x.teamName}</option>`)
    });
})

$(document).on('click', '.Delete', function (e) {
    if (allData && e.target && e.target.dataset && e.target.dataset.id) {
        var id = e.target.dataset.id;

        var Confirm = confirm("Are you sure, do you want to delete it?");
        if (Confirm) {

            $.ajax({
                url: "https://smuhammetulas.com/api/User/" + id,
                type: "DELETE",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function () {

                    //Yenile
                    alert("silindi");
                    window.location.reload()


                },
                error: function (e) {
                    alert("Error please try again" + JSON.stringify(e));
                    window.location.reload()
                }

            })

        }
    }
});


$(document).on('click', '.Save', function () {

    username = $('#UserName').val();
    surname = $('#Surname').val();

    active = $('#Active').val();
    active = active.replace("No", "0");
    active = active.replace("Yes", "1");

    mail = $('#Mail').val();
    dateOfStart = $('#DateOfStart').val();
    usergroup = $('#Usergroup option:selected').text();
    team = $('#Team option:selected').text();

    if (id == null) {
        if (username == "" || surname == "" || active == "Bir Değer Seçiniz" || mail == ""
            || dateOfStart == "" || usergroup == "Bir Değer Seçiniz" || team == "Bir Değer Seçiniz") {

            document.getElementById("hata").innerHTML = "*Boş Alanları Doldurunuz!";
            return false;
        }

        var Confirm = confirm("Kayıt yapılsın mı?");
        if (Confirm) {

            password = Math.random().toString(36).slice(2, 10);

            $.ajax({
                url: "https://smuhammetulas.com/api/User",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({

                    "name": username,
                    "surname": surname,
                    "mail": mail,
                    "password": password,
                    "active": active,
                    "dateOfStart": dateOfStart,
                    "usergroup": usergroup,
                    "team": team

                }),
                success: function () {

                    sendEmail();

                    alert("Kayıt Başarılı");
                    window.location.reload()

                },
                error: function () {
                    alert("Error please try again");
                    window.location.reload()
                }

            })

        }
        else {
            return false;
        }
    }
    else {
        var Confirm = confirm("Are you sure, do you want to update it?");
        if (Confirm) {

            password = allData.find(x => x.id == parseInt(id)).password;

            $.ajax({
                url: "https://smuhammetulas.com/api/User",
                type: "PUT",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    "id": id,
                    "name": username,
                    "surname": surname,
                    "mail": mail,
                    "password" : password,
                    "active": active,
                    "dateOfStart": dateOfStart,
                    "usergroup": usergroup,
                    "team": team
                }),
                success: function () {

                    //Yenile
                    alert("The record is updated");
                    window.location.reload()


                },
                error: function (e) {
                    alert("Error please try again" + JSON.stringify(e));
                    window.location.reload()
                }

            })

        }
    }

});



$(document).on('click', '.Update', function (e) {
    if (allData && e.target && e.target.dataset && e.target.dataset.id) {
        id = e.target.dataset.id;

        username = allData.find(x => x.id == parseInt(id)).name;
        surname = allData.find(x => x.id == parseInt(id)).surname;
        mail = allData.find(x => x.id == parseInt(id)).mail;
        active = allData.find(x => x.id == parseInt(id)).active;
        dateOfStart = allData.find(x => x.id == parseInt(id)).dateOfStart;
        usergroup = allData.find(x => x.id == parseInt(id)).usergroup;
        team = allData.find(x => x.id == parseInt(id)).team;

        document.getElementById('newuser').style.display = 'block';

        $('#UserName').val(username).html();
        $('#Surname').val(surname).html();
        $('#Mail').val(mail).html();
        $('#Active').val(active).html();
        $('#DateOfStart').val(dateOfStart).html();
        $('#Usergroup').val(usergroup).html();
        $('#Team').val(team).html();

    }
});

function sendEmail() {
    Email.send({
        Host: "smtp-mail.outlook.com",
        Username: "<dzdsmurfs@outlook.com>",
        Password: "<Dzd123456>",
        To: '<hakan.agan@dzdtech.com>',
        From: "<dzdsmurfs@outlook.com>",
        Subject: "<email subject>",
        Body: "<email body>",
    }).then(
        message => alert("mail sent successfully")
    );
}