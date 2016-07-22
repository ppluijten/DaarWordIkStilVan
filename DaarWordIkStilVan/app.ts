///<reference path="content/ts/typings/jquery.d.ts"/>

(($ => {
    $(() => {
        // document.ready
        var pages = new Pages("pages");
        $("div[data-page]")
            .each(function () {
                pages.render($(this));
            });
    });

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
    }
})(jQuery));