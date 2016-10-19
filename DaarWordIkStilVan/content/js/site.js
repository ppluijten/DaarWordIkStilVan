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
            element.html(innerElement);
            $.get(this.folder + "/activiteiten.json", function (data) {
                for (var i = 0; i < data.activities.length; i++) {
                    _this.renderActivity(innerElement, data.activities[i].name, data.activities[i].title);
                }
            });
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

//# sourceMappingURL=data:application/json;base64,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LENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLFdBQVcsRUFBRSxVQUFBLFlBQVk7UUFDbEQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNmLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxxRUFBcUUsQ0FBQyxDQUFDO1FBQ3JHLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyx5R0FBeUcsQ0FBQyxDQUFDO1FBQ3pJLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMiLCJmaWxlIjoiY29udGVudC9qcy9zaXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwidHlwaW5ncy9qcXVlcnkuZC50c1wiLz5cclxuXHJcbigoJCA9PiB7XHJcbiAgICAkKCgpID0+IHtcclxuICAgICAgICB2YXIgcGFnZXMgPSBuZXcgUGFnZXMoXCJwYWdlc1wiKTtcclxuICAgICAgICAkKFwiZGl2W2RhdGEtcGFnZV1cIilcclxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcGFnZXMucmVuZGVyKCQodGhpcykpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcImJvZHlbZGF0YS1iYWNrZ3JvdW5kXVwiKVxyXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIiwgYHVybCgnY29udGVudC9pbWFnZXMvJHskKHRoaXMpLmRhdGEoXCJiYWNrZ3JvdW5kXCIpfS5wbmcnKWApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIHF1ZXJ5U3RyaW5nID0gZ2V0UXVlcnlTdHJpbmcoKTtcclxuICAgICAgICB2YXIgcGFnZSA9IHF1ZXJ5U3RyaW5nLnBhZ2U7XHJcbiAgICAgICAgaWYgKHBhZ2UgIT0gbnVsbCAmJiBwYWdlICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICQoXCIuYWN0aXZpdGllc1wiKVxyXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzLnJlbmRlckFjdGl2aXR5UGFnZSgkKHRoaXMpLCBwYWdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoXCIuYWN0aXZpdGllc1wiKVxyXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzLnJlbmRlckFjdGl2aXRpZXMoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRRdWVyeVN0cmluZygpOiBhbnkge1xyXG4gICAgICAgIHZhciBxdWVyeVN0cmluZzogYW55ID0ge307XHJcbiAgICAgICAgJC5lYWNoKGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkuc3BsaXQoXCImXCIpLCAoYywgcSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgaSA9IHEuc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgICAgICBpZiAoaVswXSAhPSBudWxsICYmIGlbMV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcXVlcnlTdHJpbmdbaVswXS50b1N0cmluZygpXSA9IGlbMV0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcXVlcnlTdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZXMge1xyXG4gICAgICAgIGZvbGRlcjogc3RyaW5nO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihmb2xkZXI6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmZvbGRlciA9IGZvbGRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbmRlcihlbGVtZW50OiBKUXVlcnkpIHtcclxuICAgICAgICAgICAgJC5nZXQodGhpcy5mb2xkZXIgKyBcIi9cIiArIGVsZW1lbnQuZGF0YShcInBhZ2VcIikgKyBcIi5odG1sXCIsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbmRlckFjdGl2aXRpZXMoZWxlbWVudDogSlF1ZXJ5KSB7XHJcbiAgICAgICAgICAgIHZhciBpbm5lckVsZW1lbnQgPSAkKFwiPGRpdiBjbGFzcz0ncm93Jz48L2Rpdj5cIik7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaHRtbChpbm5lckVsZW1lbnQpO1xyXG4gICAgICAgICAgICAkLmdldCh0aGlzLmZvbGRlciArIFwiL2FjdGl2aXRlaXRlbi5qc29uXCIsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmFjdGl2aXRpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckFjdGl2aXR5KGlubmVyRWxlbWVudCwgZGF0YS5hY3Rpdml0aWVzW2ldLm5hbWUsIGRhdGEuYWN0aXZpdGllc1tpXS50aXRsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVuZGVyQWN0aXZpdHkoZWxlbWVudDogSlF1ZXJ5LCBhY3Rpdml0eW5hbWU6IHN0cmluZywgYWN0aXZpdHl0aXRsZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICQuZ2V0KHRoaXMuZm9sZGVyICsgYC9hY3Rpdml0ZWl0ZW4vZGVzY3JpcHRpb25zLyR7YWN0aXZpdHluYW1lfS5odG1sYCwgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZChgPGRpdiBjbGFzcz0nY29sLXhzLTEyIGFjdGl2aXR5Jz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdhY3Rpdml0eS1pbWFnZScgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChwYWdlcy9hY3Rpdml0ZWl0ZW4vaW1hZ2VzLyR7YWN0aXZpdHluYW1lfS5wbmcpOyc+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nYWN0aXZpdHktZGVzY3JpcHRpb24gc2VlLXRocm91Z2gnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPSdhY3Rpdml0ZWl0ZW4uaHRtbD9wYWdlPSR7YWN0aXZpdHluYW1lfSc+JHthY3Rpdml0eXRpdGxlfTwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2RhdGF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPSdhY3Rpdml0ZWl0ZW4uaHRtbD9wYWdlPSR7YWN0aXZpdHluYW1lfSc+bGVlcyBtZWVyPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5gKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZW5kZXJBY3Rpdml0eVBhZ2UoZWxlbWVudDogSlF1ZXJ5LCBhY3Rpdml0eW5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICAkLmdldCh0aGlzLmZvbGRlciArIGAvYWN0aXZpdGVpdGVuL3BhZ2VzLyR7YWN0aXZpdHluYW1lfS5odG1sYCwgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKFwianVtYm90cm9uXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKGpRdWVyeSkpO1xyXG5cclxuZnVuY3Rpb24gc2VuZEVtYWlsKGVsZW1lbnQ6IGFueSk6IGFueSB7XHJcbiAgICB2YXIgYnV0dG9uID0gJChlbGVtZW50KTtcclxuICAgIHZhciBuYW1lID0gJChcIiNuYW1lXCIpLnZhbCgpO1xyXG4gICAgdmFyIGVtYWlsID0gJChcIiNlbWFpbFwiKS52YWwoKTtcclxuICAgIHZhciBtZXNzYWdlID0gJChcIiNtZXNzYWdlXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciB2YWxpZCA9IHRydWU7XHJcbiAgICBpZiAobmFtZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAkKFwiI25hbWV2YWxpZFwiKS5odG1sKFwiVnVsIGEudS5iLiB1dyBuYWFtIGluLlwiKTtcclxuICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKFwiI25hbWV2YWxpZFwiKS5odG1sKFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbWFpbC5sZW5ndGggPT09IDAgfHwgZW1haWwuaW5kZXhPZihcIkBcIikgPT09IC0xIHx8IGVtYWlsLmluZGV4T2YoXCIuXCIpID09PSAtMSkge1xyXG4gICAgICAgICQoXCIjZW1haWx2YWxpZFwiKS5odG1sKFwiVnVsIGEudS5iLiBlZW4gZ2VsZGlnIGUtbWFpbGFkcmVzIGluLlwiKTtcclxuICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKFwiI2VtYWlsdmFsaWRcIikuaHRtbChcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWVzc2FnZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAkKFwiI21lc3NhZ2V2YWxpZFwiKS5odG1sKFwiVnVsIGEudS5iLiBlZW4gYmVyaWNodCBpbi5cIik7XHJcbiAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChcIiNtZXNzYWdldmFsaWRcIikuaHRtbChcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXZhbGlkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1dHRvbi5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICBidXR0b24udGV4dChcIlV3IGJlcmljaHQgd29yZHQgdmVyc3R1dXJkLi4uXCIpO1xyXG5cclxuICAgIHZhciByZXF1ZXN0ID0ge1xyXG4gICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgZW1haWw6IGVtYWlsLFxyXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcclxuICAgIH07XHJcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0KTtcclxuICAgICQucG9zdChcImFwaS9lbWFpbC5waHBcIiwgcmVxdWVzdERhdGEsIHJlc3BvbnNlRGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlRGF0YSkge1xyXG4gICAgICAgICAgICAkKFwiI2NvbnRhY3Rmb3JtXCIpLmh0bWwoXCI8aDE+Q29udGFjdDwvaDE+PHA+VXcgYmVyaWNodCBpcyB2ZXJ6b25kZW4uPC9wPlwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiI2NvbnRhY3Rmb3JtXCIpLmh0bWwoXCI8aDE+Q29udGFjdDwvaDE+PHA+VXcgYmVyaWNodCBrb24gbmlldCB2ZXJ6b25kZW4gd29yZGVuLCBwcm9iZWVyIGhldCBsYXRlciBhLnUuYi4gb3BuaWV1dy48L3A+XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdWJzY3JpYmVUb05ld3NsZXR0ZXIoZWxlbWVudDogYW55KTogYW55IHtcclxuICAgIHZhciBidXR0b24gPSAkKGVsZW1lbnQpO1xyXG4gICAgdmFyIG5hbWUgPSAkKFwiI25hbWVcIikudmFsKCk7XHJcbiAgICB2YXIgZW1haWwgPSAkKFwiI2VtYWlsXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciB2YWxpZCA9IHRydWU7XHJcbiAgICAkKFwiI3ZhbGlkXCIpLmh0bWwoXCJcIik7XHJcblxyXG4gICAgaWYgKG5hbWUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgJChcIiN2YWxpZFwiKS5hcHBlbmQoXCJWdWwgYS51LmIuIHV3IG5hYW0gaW4uPGJyIC8+XCIpO1xyXG4gICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVtYWlsLmxlbmd0aCA9PT0gMCB8fCBlbWFpbC5pbmRleE9mKFwiQFwiKSA9PT0gLTEgfHwgZW1haWwuaW5kZXhPZihcIi5cIikgPT09IC0xKSB7XHJcbiAgICAgICAgJChcIiN2YWxpZFwiKS5hcHBlbmQoXCJWdWwgYS51LmIuIGVlbiBnZWxkaWcgZS1tYWlsYWRyZXMgaW4uXCIpO1xyXG4gICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF2YWxpZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBidXR0b24ucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgYnV0dG9uLnRleHQoXCJVIHdvcmR0IGFhbmdlbWVsZC4uLlwiKTtcclxuXHJcbiAgICB2YXIgcmVxdWVzdCA9IHtcclxuICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgIGVtYWlsOiBlbWFpbFxyXG4gICAgfTtcclxuICAgIHZhciByZXF1ZXN0RGF0YSA9IEpTT04uc3RyaW5naWZ5KHJlcXVlc3QpO1xyXG4gICAgJC5wb3N0KFwiYXBpL25ld3NsZXR0ZXIucGhwXCIsIHJlcXVlc3REYXRhLCByZXNwb25zZURhdGEgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZURhdGEpIHtcclxuICAgICAgICAgICAgJChcIiNuZXdzbGV0dGVyZm9ybVwiKS5odG1sKFwiPGgxPk5pZXV3c2JyaWVmPC9oMT48cD5VIGJlbnQgaW5nZXNjaHJldmVuIHZvb3IgZGUgbmlldXdzYnJpZWYuPC9wPlwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiI25ld3NsZXR0ZXJmb3JtXCIpLmh0bWwoXCI8aDE+Q29udGFjdDwvaDE+PHA+VSBrdW50IG9wIGhldCBtb21lbnQgbmlldCB3b3JkZW4gaW5nZXNjaHJldmVuLCBwcm9iZWVyIGhldCBsYXRlciBhLnUuYi4gb3BuaWV1dy48L3A+XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
