<div id="login-page">
    <form id="login-form" data-bind="submit:login">
        <img class="logo" src="/images/logo.jpg">
        <input type="hidden" name="route" value="admin" />
        <input type="hidden" name="action" value="login" />

        <div class="field">
            <label for="login-username">Gebruikersnaam</label>
            <input type="text" name="username" id="login-username" />
        </div>

        <div class="field">
            <label for="login-password">Wachtwoord</label>
            <input type="password" name="password" id="login-password" />
        </div>

        <input type="submit" value="Inloggen" />
    </form>
</div>
