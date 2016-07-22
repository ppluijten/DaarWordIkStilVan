((function ($) {
    $(function () {
        var pages = new Pages("pages");
        $("div[data-page]")
            .each(function () {
            pages.render($(this));
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
        return Pages;
    }());
})(jQuery));
