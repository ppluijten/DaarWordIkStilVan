///<reference path="content/ts/typings/jquery.d.ts"/>

(($ => {
    $(() => {
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
            element.html("");
            $.get(this.folder + "/activiteiten.json", data => {
                for (var i = 0; i < data.activities.length; i++) {
                    this.renderAcvitity(element, data.activities[i].name, data.activities[i].title);
                }
            });
        }

        renderAcvitity(element: JQuery, activityname: string, activitytitle: string) {
            $.get(this.folder + `/activiteiten/descriptions/${activityname}.html`, data => {
                element.append(`<div class='row activity'>
                    <div class='activity-image' style='background-image: url(pages/activiteiten/images/${activityname}.png);'></div>
                    <div class='activity-description'>
                        <h1>${activitytitle}</h1>
                        <p>
                            ${data}
                            <a href='#'>lees meer</a>
                        </p>
                    </div>
                </div>`);
            });
        }
    }
})(jQuery));