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
            var innerElement = $("<div class='row'></div>");
            $.get(this.folder + "/activiteiten.json", function (data) {
                for (var i = 0; i < data.activities.length; i++) {
                    _this.renderActivity(innerElement, data.activities[i].name, data.activities[i].title);
                }
            });
            element.empty().append(innerElement);
        };
        Pages.prototype.renderActivity = function (element, activityname, activitytitle) {
            $.get(this.folder + ("/activiteiten/descriptions/" + activityname + ".html"), function (data) {
                element.append("<div class='col-xs-12 activity'>\n                    <div class='activity-image' style='background-image: url(pages/activiteiten/images/" + activityname + ".png);'></div>\n                    <div class='activity-description see-through'>\n                        <h1>\n                            <a href='activiteiten.html?page=" + activityname + "'>" + activitytitle + "</a>\n                        </h1>\n                        <p>\n                            " + data + "\n                            <a href='activiteiten.html?page=" + activityname + "'>lees meer</a>\n                        </p>\n                    </div>\n                </div>");
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
    button.text("Uw bericht wordt verstuurd...");
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
    button.text("U wordt aangemeld...");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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T0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxXQUFXLEVBQUUsVUFBQSxZQUFZO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDZixDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMscUVBQXFFLENBQUMsQ0FBQztRQUNyRyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMseUdBQXlHLENBQUMsQ0FBQztRQUN6SSxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIiwiZmlsZSI6ImNvbnRlbnQvanMvc2l0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD1cInR5cGluZ3MvanF1ZXJ5LmQudHNcIi8+XHJcblxyXG4oKCQgPT4ge1xyXG4gICAgJCgoKSA9PiB7XHJcbiAgICAgICAgdmFyIHBhZ2VzID0gbmV3IFBhZ2VzKFwicGFnZXNcIik7XHJcbiAgICAgICAgJChcImRpdltkYXRhLXBhZ2VdXCIpXHJcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2VzLnJlbmRlcigkKHRoaXMpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCJib2R5W2RhdGEtYmFja2dyb3VuZF1cIilcclxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIsIGB1cmwoJ2NvbnRlbnQvaW1hZ2VzLyR7JCh0aGlzKS5kYXRhKFwiYmFja2dyb3VuZFwiKX0ucG5nJylgKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBxdWVyeVN0cmluZyA9IGdldFF1ZXJ5U3RyaW5nKCk7XHJcbiAgICAgICAgdmFyIHBhZ2UgPSBxdWVyeVN0cmluZy5wYWdlO1xyXG4gICAgICAgIGlmIChwYWdlICE9IG51bGwgJiYgcGFnZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAkKFwiLmFjdGl2aXRpZXNcIilcclxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlcy5yZW5kZXJBY3Rpdml0eVBhZ2UoJCh0aGlzKSwgcGFnZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiLmFjdGl2aXRpZXNcIilcclxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlcy5yZW5kZXJBY3Rpdml0aWVzKCQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UXVlcnlTdHJpbmcoKTogYW55IHtcclxuICAgICAgICB2YXIgcXVlcnlTdHJpbmc6IGFueSA9IHt9O1xyXG4gICAgICAgICQuZWFjaChkb2N1bWVudC5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLnNwbGl0KFwiJlwiKSwgKGMsIHEpID0+IHtcclxuICAgICAgICAgICAgdmFyIGkgPSBxLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgaWYgKGlbMF0gIT0gbnVsbCAmJiBpWzFdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5U3RyaW5nW2lbMF0udG9TdHJpbmcoKV0gPSBpWzFdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHF1ZXJ5U3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VzIHtcclxuICAgICAgICBmb2xkZXI6IHN0cmluZztcclxuICAgICAgICBcclxuICAgICAgICBjb25zdHJ1Y3Rvcihmb2xkZXI6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmZvbGRlciA9IGZvbGRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbmRlcihlbGVtZW50OiBKUXVlcnkpIHtcclxuICAgICAgICAgICAgJC5nZXQodGhpcy5mb2xkZXIgKyBcIi9cIiArIGVsZW1lbnQuZGF0YShcInBhZ2VcIikgKyBcIi5odG1sXCIsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbmRlckFjdGl2aXRpZXMoZWxlbWVudDogSlF1ZXJ5KSB7XHJcbiAgICAgICAgICAgIHZhciBpbm5lckVsZW1lbnQgPSAkKFwiPGRpdiBjbGFzcz0ncm93Jz48L2Rpdj5cIik7XHJcbiAgICAgICAgICAgICQuZ2V0KHRoaXMuZm9sZGVyICsgXCIvYWN0aXZpdGVpdGVuLmpzb25cIiwgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEuYWN0aXZpdGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQWN0aXZpdHkoaW5uZXJFbGVtZW50LCBkYXRhLmFjdGl2aXRpZXNbaV0ubmFtZSwgZGF0YS5hY3Rpdml0aWVzW2ldLnRpdGxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuZW1wdHkoKS5hcHBlbmQoaW5uZXJFbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbmRlckFjdGl2aXR5KGVsZW1lbnQ6IEpRdWVyeSwgYWN0aXZpdHluYW1lOiBzdHJpbmcsIGFjdGl2aXR5dGl0bGU6IHN0cmluZykge1xyXG4gICAgICAgICAgICAkLmdldCh0aGlzLmZvbGRlciArIGAvYWN0aXZpdGVpdGVuL2Rlc2NyaXB0aW9ucy8ke2FjdGl2aXR5bmFtZX0uaHRtbGAsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQoYDxkaXYgY2xhc3M9J2NvbC14cy0xMiBhY3Rpdml0eSc+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nYWN0aXZpdHktaW1hZ2UnIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwocGFnZXMvYWN0aXZpdGVpdGVuL2ltYWdlcy8ke2FjdGl2aXR5bmFtZX0ucG5nKTsnPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2FjdGl2aXR5LWRlc2NyaXB0aW9uIHNlZS10aHJvdWdoJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj0nYWN0aXZpdGVpdGVuLmh0bWw/cGFnZT0ke2FjdGl2aXR5bmFtZX0nPiR7YWN0aXZpdHl0aXRsZX08L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtkYXRhfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj0nYWN0aXZpdGVpdGVuLmh0bWw/cGFnZT0ke2FjdGl2aXR5bmFtZX0nPmxlZXMgbWVlcjwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+YCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZW5kZXJBY3Rpdml0eVBhZ2UoZWxlbWVudDogSlF1ZXJ5LCBhY3Rpdml0eW5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICAkLmdldCh0aGlzLmZvbGRlciArIGAvYWN0aXZpdGVpdGVuL3BhZ2VzLyR7YWN0aXZpdHluYW1lfS5odG1sYCwgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKFwianVtYm90cm9uXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKGpRdWVyeSkpO1xyXG5cclxuZnVuY3Rpb24gc2VuZEVtYWlsKGVsZW1lbnQ6IGFueSk6IGFueSB7XHJcbiAgICB2YXIgYnV0dG9uID0gJChlbGVtZW50KTtcclxuICAgIHZhciBuYW1lID0gJChcIiNuYW1lXCIpLnZhbCgpO1xyXG4gICAgdmFyIGVtYWlsID0gJChcIiNlbWFpbFwiKS52YWwoKTtcclxuICAgIHZhciBtZXNzYWdlID0gJChcIiNtZXNzYWdlXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciB2YWxpZCA9IHRydWU7XHJcbiAgICBpZiAobmFtZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAkKFwiI25hbWV2YWxpZFwiKS5odG1sKFwiVnVsIGEudS5iLiB1dyBuYWFtIGluLlwiKTtcclxuICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKFwiI25hbWV2YWxpZFwiKS5odG1sKFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbWFpbC5sZW5ndGggPT09IDAgfHwgZW1haWwuaW5kZXhPZihcIkBcIikgPT09IC0xIHx8IGVtYWlsLmluZGV4T2YoXCIuXCIpID09PSAtMSkge1xyXG4gICAgICAgICQoXCIjZW1haWx2YWxpZFwiKS5odG1sKFwiVnVsIGEudS5iLiBlZW4gZ2VsZGlnIGUtbWFpbGFkcmVzIGluLlwiKTtcclxuICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKFwiI2VtYWlsdmFsaWRcIikuaHRtbChcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWVzc2FnZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAkKFwiI21lc3NhZ2V2YWxpZFwiKS5odG1sKFwiVnVsIGEudS5iLiBlZW4gYmVyaWNodCBpbi5cIik7XHJcbiAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChcIiNtZXNzYWdldmFsaWRcIikuaHRtbChcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXZhbGlkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1dHRvbi5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICBidXR0b24udGV4dChcIlV3IGJlcmljaHQgd29yZHQgdmVyc3R1dXJkLi4uXCIpO1xyXG5cclxuICAgIHZhciByZXF1ZXN0ID0ge1xyXG4gICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgZW1haWw6IGVtYWlsLFxyXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcclxuICAgIH07XHJcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0KTtcclxuICAgICQucG9zdChcImFwaS9lbWFpbC5waHBcIiwgcmVxdWVzdERhdGEsIHJlc3BvbnNlRGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlRGF0YSkge1xyXG4gICAgICAgICAgICAkKFwiI2NvbnRhY3Rmb3JtXCIpLmh0bWwoXCI8aDE+Q29udGFjdDwvaDE+PHA+VXcgYmVyaWNodCBpcyB2ZXJ6b25kZW4uPC9wPlwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiI2NvbnRhY3Rmb3JtXCIpLmh0bWwoXCI8aDE+Q29udGFjdDwvaDE+PHA+VXcgYmVyaWNodCBrb24gbmlldCB2ZXJ6b25kZW4gd29yZGVuLCBwcm9iZWVyIGhldCBsYXRlciBhLnUuYi4gb3BuaWV1dy48L3A+XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdWJzY3JpYmVUb05ld3NsZXR0ZXIoZWxlbWVudDogYW55KTogYW55IHtcclxuICAgIHZhciBidXR0b24gPSAkKGVsZW1lbnQpO1xyXG4gICAgdmFyIG5hbWUgPSAkKFwiI25hbWVcIikudmFsKCk7XHJcbiAgICB2YXIgZW1haWwgPSAkKFwiI2VtYWlsXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciB2YWxpZCA9IHRydWU7XHJcbiAgICAkKFwiI3ZhbGlkXCIpLmh0bWwoXCJcIik7XHJcblxyXG4gICAgaWYgKG5hbWUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgJChcIiN2YWxpZFwiKS5hcHBlbmQoXCJWdWwgYS51LmIuIHV3IG5hYW0gaW4uPGJyIC8+XCIpO1xyXG4gICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVtYWlsLmxlbmd0aCA9PT0gMCB8fCBlbWFpbC5pbmRleE9mKFwiQFwiKSA9PT0gLTEgfHwgZW1haWwuaW5kZXhPZihcIi5cIikgPT09IC0xKSB7XHJcbiAgICAgICAgJChcIiN2YWxpZFwiKS5hcHBlbmQoXCJWdWwgYS51LmIuIGVlbiBnZWxkaWcgZS1tYWlsYWRyZXMgaW4uXCIpO1xyXG4gICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF2YWxpZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBidXR0b24ucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgYnV0dG9uLnRleHQoXCJVIHdvcmR0IGFhbmdlbWVsZC4uLlwiKTtcclxuXHJcbiAgICB2YXIgcmVxdWVzdCA9IHtcclxuICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgIGVtYWlsOiBlbWFpbFxyXG4gICAgfTtcclxuICAgIHZhciByZXF1ZXN0RGF0YSA9IEpTT04uc3RyaW5naWZ5KHJlcXVlc3QpO1xyXG4gICAgJC5wb3N0KFwiYXBpL25ld3NsZXR0ZXIucGhwXCIsIHJlcXVlc3REYXRhLCByZXNwb25zZURhdGEgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZURhdGEpIHtcclxuICAgICAgICAgICAgJChcIiNuZXdzbGV0dGVyZm9ybVwiKS5odG1sKFwiPGgxPk5pZXV3c2JyaWVmPC9oMT48cD5VIGJlbnQgaW5nZXNjaHJldmVuIHZvb3IgZGUgbmlldXdzYnJpZWYuPC9wPlwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiI25ld3NsZXR0ZXJmb3JtXCIpLmh0bWwoXCI8aDE+Q29udGFjdDwvaDE+PHA+VSBrdW50IG9wIGhldCBtb21lbnQgbmlldCB3b3JkZW4gaW5nZXNjaHJldmVuLCBwcm9iZWVyIGhldCBsYXRlciBhLnUuYi4gb3BuaWV1dy48L3A+XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59Il19
