///<reference path="content/ts/typings/jquery.d.ts"/>
((function ($) {
    $(function () {
        var pages = new Pages("pages");
        $("div[data-page]")
            .each(function () {
            pages.render($(this));
        });
        $("body[data-background]")
            .each(function () {
            $(this).css("background-image", "url('content/images/" + $(this).data("background") + ".png')");
        });
        var queryString = getQueryString();
        var page = queryString.page;
        if (page != null && page !== "") {
            $(".activities")
                .each(function () {
                pages.renderActivityPage($(this), page);
            });
        }
        else {
            $(".activities")
                .each(function () {
                pages.renderActivities($(this));
            });
        }
    });
    function getQueryString() {
        var queryString = {};
        $.each(document.location.search.substr(1).split("&"), function (c, q) {
            var i = q.split("=");
            if (i[0] != null && i[1] != null) {
                queryString[i[0].toString()] = i[1].toString();
            }
        });
        return queryString;
    }
    var Pages = (function () {
        function Pages(folder) {
            this.folder = folder;
        }
        Pages.prototype.render = function (element) {
            $.get(this.folder + "/" + element.data("page") + ".html", function (data) {
                element.html(data);
            });
        };
        Pages.prototype.renderActivities = function (element) {
            var _this = this;
            element.html("");
            $.get(this.folder + "/activiteiten.json", function (data) {
                for (var i = 0; i < data.activities.length; i++) {
                    _this.renderActivity(element, data.activities[i].name, data.activities[i].title);
                }
            });
        };
        Pages.prototype.renderActivity = function (element, activityname, activitytitle) {
            $.get(this.folder + ("/activiteiten/descriptions/" + activityname + ".html"), function (data) {
                element.append("<div class='row activity'>\n                        <div class='activity-image' style='background-image: url(pages/activiteiten/images/" + activityname + ".png);'></div>\n                        <div class='activity-description'>\n                            <h1>\n                                <a href='activiteiten.html?page=" + activityname + "'>" + activitytitle + "</a>\n                            </h1>\n                            <p>\n                                " + data + "\n                                <a href='activiteiten.html?page=" + activityname + "'>lees meer</a>\n                            </p>\n                        </div>\n                </div>");
                //TODO: col-xs-12?
            });
        };
        Pages.prototype.renderActivityPage = function (element, activityname) {
            $.get(this.folder + ("/activiteiten/pages/" + activityname + ".html"), function (data) {
                element.html(data);
                element.addClass("jumbotron");
            });
        };
        return Pages;
    }());
})(jQuery));
function sendEmail(element) {
    var button = $(element);
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    var valid = true;
    if (name.length === 0) {
        $("#namevalid").html("Vul a.u.b. uw naam in.");
        valid = false;
    }
    else {
        $("#namevalid").html("");
    }
    if (email.length === 0 || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        $("#emailvalid").html("Vul a.u.b. een geldig e-mailadres in.");
        valid = false;
    }
    else {
        $("#emailvalid").html("");
    }
    if (message.length === 0) {
        $("#messagevalid").html("Vul a.u.b. een bericht in.");
        valid = false;
    }
    else {
        $("#messagevalid").html("");
    }
    if (!valid) {
        return;
    }
    button.prop("disabled", true);
    button.text("Versturen...");
    var request = {
        name: name,
        email: email,
        message: message
    };
    var requestData = JSON.stringify(request);
    $.post("api/email.php", requestData, function (responseData) {
        if (responseData) {
            $("#contactform").html("<h1>Contact</h1><p>Uw bericht is verzonden.</p>");
        }
        else {
            $("#contactform").html("<h1>Contact</h1><p>Uw bericht kon niet verzonden worden, probeer het later a.u.b. opnieuw.</p>");
        }
    });
}
function subscribeToNewsletter(element) {
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
    button.text("Aanmelden...");
    var request = {
        name: name,
        email: email
    };
    var requestData = JSON.stringify(request);
    $.post("api/newsletter.php", requestData, function (responseData) {
        if (responseData) {
            $("#newsletterform").html("<h1>Nieuwsbrief</h1><p>U bent ingeschreven voor de nieuwsbrief.</p>");
        }
        else {
            $("#newsletterform").html("<h1>Contact</h1><p>U kunt op het moment niet worden ingeschreven, probeer het later a.u.b. opnieuw.</p>");
        }
    });
}
//# sourceMappingURL=app.js.map