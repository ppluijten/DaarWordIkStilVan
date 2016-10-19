///<reference path="typings/jquery.d.ts"/>

(($ => {
    $(() => {
        var pages = new Pages("pages");
        $("div[data-page]")
            .each(function () {
                pages.render($(this));
            });

        $("body[data-background]")
            .each(function () {
                $(this).css("background-image", `url('content/images/${$(this).data("background")}.png')`);
            });

        var queryString = getQueryString();
        var page = queryString.page;
        if (page != null && page !== "") {
            $(".activities")
                .each(function () {
                    pages.renderActivityPage($(this), page);
                });
        } else {
            $(".activities")
                .each(function () {
                    pages.renderActivities($(this));
                });
        }
    });

    function getQueryString(): any {
        var queryString: any = {};
        $.each(document.location.search.substr(1).split("&"), (c, q) => {
            var i = q.split("=");
            if (i[0] != null && i[1] != null) {
                queryString[i[0].toString()] = i[1].toString();
            }
        });

        return queryString;
    }

    class Pages {
        folder: string;

        constructor(folder: string) {
            this.folder = folder;
        }

        render(element: JQuery) {
            $.get(this.folder + "/" + element.data("page") + ".html", data => {
                element.html(data);
            });
        }

        renderActivities(element: JQuery) {
            var innerElement = $("<div class='row'></div>");
            element.html(innerElement);
            $.get(this.folder + "/activiteiten.json", data => {
                for (var i = 0; i < data.activities.length; i++) {
                    this.renderActivity(innerElement, data.activities[i].name, data.activities[i].title);
                }
            });
        }

        renderActivity(element: JQuery, activityname: string, activitytitle: string) {
            $.get(this.folder + `/activiteiten/descriptions/${activityname}.html`, data => {
                element.append(`<div class='col-xs-12 activity'>
                    <div class='activity-image' style='background-image: url(pages/activiteiten/images/${activityname}.png);'></div>
                    <div class='activity-description see-through'>
                        <h1>
                            <a href='activiteiten.html?page=${activityname}'>${activitytitle}</a>
                        </h1>
                        <p>
                            ${data}
                            <a href='activiteiten.html?page=${activityname}'>lees meer</a>
                        </p>
                    </div>
                </div>`);
            });
        }

        renderActivityPage(element: JQuery, activityname: string) {
            $.get(this.folder + `/activiteiten/pages/${activityname}.html`, data => {
                element.html(data);
                element.addClass("jumbotron");
            });
        }
    }
})(jQuery));

function sendEmail(element: any): any {
    var button = $(element);
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();

    var valid = true;
    if (name.length === 0) {
        $("#namevalid").html("Vul a.u.b. uw naam in.");
        valid = false;
    } else {
        $("#namevalid").html("");
    }

    if (email.length === 0 || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        $("#emailvalid").html("Vul a.u.b. een geldig e-mailadres in.");
        valid = false;
    } else {
        $("#emailvalid").html("");
    }

    if (message.length === 0) {
        $("#messagevalid").html("Vul a.u.b. een bericht in.");
        valid = false;
    } else {
        $("#messagevalid").html("");
    }

    if (!valid) {
        return;
    }

    button.prop("disabled", true);
    button.text("Uw bericht wordt verstuurd...");

    var request = {
        name: name,
        email: email,
        message: message
    };
    var requestData = JSON.stringify(request);
    $.post("api/email.php", requestData, responseData => {
        if (responseData) {
            $("#contactform").html("<h1>Contact</h1><p>Uw bericht is verzonden.</p>");
        } else {
            $("#contactform").html("<h1>Contact</h1><p>Uw bericht kon niet verzonden worden, probeer het later a.u.b. opnieuw.</p>");
        }
    });
}

function subscribeToNewsletter(element: any): any {
    var button = $(element);
    var name = $("#name").val();
    var email = $("#email").val();

    var valid = true;
    $("#valid").html("");

    if (name.length === 0) {
        $("#valid").append("Vul a.u.b. uw naam in.<br />");
        valid = false;
    }

    if (email.length === 0 || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        $("#valid").append("Vul a.u.b. een geldig e-mailadres in.");
        valid = false;
    }

    if (!valid) {
        return;
    }

    button.prop("disabled", true);
    button.text("U wordt aangemeld...");

    var request = {
        name: name,
        email: email
    };
    var requestData = JSON.stringify(request);
    $.post("api/newsletter.php", requestData, responseData => {
        if (responseData) {
            $("#newsletterform").html("<h1>Nieuwsbrief</h1><p>U bent ingeschreven voor de nieuwsbrief.</p>");
        } else {
            $("#newsletterform").html("<h1>Contact</h1><p>U kunt op het moment niet worden ingeschreven, probeer het later a.u.b. opnieuw.</p>");
        }
    });
}