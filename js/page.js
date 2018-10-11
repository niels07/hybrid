require(['requirejs/domReady'], function (domReady) {
    domReady(function () {
        require(['app/page/main'], function(p) {
            "use strict";
            var page = new p.Page();
            page.load();
        });
    });
});
