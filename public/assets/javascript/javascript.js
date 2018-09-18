$(function () {
    $(".eat").on('click', function (e) {
        var id = $(this).data("id");

        var eaten = {
            devoured: true
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: eaten
        }).then(function () {
            location.reload();
        });
    });

    $(".submit").on('click', function (e) {
        let newBurger = {
            name: $("#burgerText").val()
        };

        $.ajax("api/burgers/", {
            type: "POST",
            data: newBurger
        });

    });