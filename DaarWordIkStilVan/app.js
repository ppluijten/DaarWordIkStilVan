((function ($) {
    $(function () {
        var pages = new Pages("pages");
        $("div[data-page]")
            .each(function () {
            pages.render($(this));
        });
        $("body[data-background]")
            .each(function () {
            console.log($(this));
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
            console.log("activities");
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
