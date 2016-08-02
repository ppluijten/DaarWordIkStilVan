///<reference path="content/ts/typings/jquery.d.ts"/>

(($ => {
    $(() => {
        var pages = new Pages("pages");
        $("div[data-page]")
            .each(function () {
                pages.render($(this));
            });

        var queryString: any = {};
        $.each(document.location.search.substr(1).split("&"), (c, q) => {
            var i = q.split("=");
            queryString[i[0].toString()] = i[1].toString();
        });
        var page = queryString.page;
        if (page != null && page !== "") {
            pages.renderActivityPage(page);
        } else {
            $(".activities")
                .each(function () {
                    pages.renderActivities($(this));
                });
        }
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
                    this.renderActivity(element, data.activities[i].name, data.activities[i].title);
                }
            });
        }

        renderActivity(element: JQuery, activityname: string, activitytitle: string) {
            $.get(this.folder + `/activiteiten/descriptions/${activityname}.html`, data => {
                element.append(`<div class='row activity'>
                    <div class='activity-image' style='background-image: url(pages/activiteiten/images/${activityname}.png);'></div>
                    <div class='activity-description'>
                        <h1>${activitytitle}</h1>
                        <p>
                            ${data}
                            <a href='activiteiten.html?page=${activityname}'>lees meer</a>
                        </p>
                    </div>
                </div>`);
            });
        }

        renderActivityPage(activityname: string) {
            console.log(activityname);
        }
    }
})(jQuery));