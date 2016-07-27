((function ($) {
    $(function () {
        var pages = new Pages("pages");
        $("div[data-page]")
            .each(function () {
            pages.render($(this));
        });
        $(".activities")
            .each(function () {
            pages.renderActivities($(this));
        });
    });
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
                    _this.renderAcvitity(element, data.activities[i].name, data.activities[i].title);
                }
            });
        };
        Pages.prototype.renderAcvitity = function (element, activityname, activitytitle) {
            $.get(this.folder + ("/activiteiten/descriptions/" + activityname + ".html"), function (data) {
                element.append("<div class='row activity'>\n                    <div class='activity-image' style='background-image: url(pages/activiteiten/images/" + activityname + ".png);'></div>\n                    <div class='activity-description'>\n                        <h1>" + activitytitle + "</h1>\n                        <p>\n                            " + data + "\n                            <a href='#'>lees meer</a>\n                        </p>\n                    </div>\n                </div>");
            });
        };
        return Pages;
    }());
})(jQuery));
