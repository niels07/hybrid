<!DOCTYPE html>
<html>
    <head>
        <title>Hybrid - Admin</title>
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        <link rel="stylesheet" type="text/css" href="/css/admin.css" />
        <script data-main="/js/requirejs/admin" src="/js/requirejs/require.js"></script>
    </head>
    <body class="loading">
        <div id="menu">
            <nav>
                <ul id="page-nav" data-nav-default="home">
                    <li><a href="/admin/products" data-nav="admin/products">Producten</a></li>
                    <li><a href="/admin/categories" data-nav="admin/categories">Categori&#235;n</a></li>
                    <li><a href="/admin/users" data-nav="admin/users">Gebruikers</a></li>
                    <li><a href="/admin/stores" data-nav="admin/stores">Filialen</a></li>
                    <li><a href="/admin/templates" data-nav="admin/templates">Templates</a></li>
                    <li><a href="/admin/logout" id="logout-button">Logout</a></li>
                </ul>
            </nav>
            <div class="clear"></div>
        </div>
        <main>
            <div class="content">
                <div id="admin">
                     <div id="admin-products"
                        data-view="admin/products"
                        class="admin-page">
                    </div>

                    <div id="admin-categories"
                        data-view="admin/categories"
                        class="admin-page">
                    </div>

                    <div id="admin-stores"
                        data-view="admin/stores"
                        data-bind="load:loadStoresForm"
                        class="admin-page">
                    </div>

                    <div
                        id="admin-users"
                        data-view="admin/users"
                        class="admin-page">
                    </div>

                    <div
                        id="admin-templates"
                        data-view="admin/templates"
                        class="admin-page">
                    </div>

                </div>
            </div>
        </main>
        <div id="login" data-view="admin/login"></div>
        <div class="ajax-loading"></div>
    </body>
</html>

