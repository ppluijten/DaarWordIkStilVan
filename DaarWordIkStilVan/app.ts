///<reference path="content/ts/typings/jquery.d.ts"/>

(($ => {
    $(() => {
        var pages = new Pages("pages");
        $("div[data-page]")
            .each(function () {
                pages.render($(this));
            });

        $("body[data-background]")
            .each(function () {
                console.log($(this));
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
            console.log("activities");
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
                            <h1>
                                <a href='activiteiten.html?page=${activityname}'>${activitytitle}</a>
                            </h1>
                            <p>
                                ${data}
                                <a href='activiteiten.html?page=${activityname}'>lees meer</a>
                            </p>
                        </div>
                </div>`);
                //TODO: col-xs-12?
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