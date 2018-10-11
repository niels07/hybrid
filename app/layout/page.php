<!DOCTYPE html>
<html>
    <head>
        <title>Hybrid</title>
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        <link rel="stylesheet" type="text/css" href="/css/page.css" />
        <noscript>
            <link rel="stylesheet" type="text/css" href="/css/page-nojs.css" />
            <link rel="stylesheet" type="text/css" href="/css/style-nojs.css" />
        </noscript>
        <link rel="stylesheet" type="text/css" href="/css/linea-basic.css" />
        <script data-main="/js/requirejs/page" src="/js/requirejs/require.js"></script>
    </head>
    <body class="nojs loading">
        <header>
            <div class="content">
                <div class="logo">
                    <a href="page/home" data-nav="page/home">
                        <img src="/images/logo.jpg" />
                    </a>
                    <div class="oneline">Lorem ipsum dolor sit amet</div>
                </div>
                <ul>
                    <li>
                        <a href="#">
                            <img src="/images/fb.png" alt="facebook" class="facebook-icon" />
                        </a>
                    <li>
                        <a href="#">xxx</a>
                    </li>
                    <li>
                        <a href="/page/stores" data-nav="page/stores">Vestigingen</a>
                    </li>
                </ul>
            </div>
        </header>
        <div id="menu">
            <nav>
                <ul id="page-nav">
                    <li>
                        <a href="/page/home" data-nav="page/home">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/page/store/categories" data-nav="page/store">
                            Producten
                            <div class="btn"></div>
                        </a>
                    </li>
                    <li>
                        <a href="/page/offers" data-nav="page/offers">
                            Aanbiedingen
                        </a>
                    </li>
                    <li>
                        <a href="/page/about" data-nav="page/about">
                            Over
                        </a>
                    </li>
                    <li>
                        <a href="/page/contact" data-nav="page/contact">
                            Contact
                        </a>
                    </li>
                    <li>
                        <a href="/page/faq" data-nav="page/faq">
                            FAQ
                        </a>
                    </li>

                </ul>
            </nav>
            <div class="clear"></div>
        </div>
        <main>
            <div class="content">
                <noscript>
                <div>
                    <?php $this->renderContent(); ?>
                </div>
                </noscript>
                <div data-view="page/home"></div>
                <div data-view="page/store" data-bind='load:loadCategories'></div>
                <div data-view="page/offers"></div>
                <div data-view="page/about"></div>
                <div data-view="page/contact"></div>
                <div data-view="page/stores"></div>
                <div data-view="page/faq"></div>
            </div>
        </main>
        <div class="ajax-loading"></div>
        <div data-view="page/footer"></div>
    </body>
</html>

