<h1>Gebruikers</h1>

<form id="admin-user-form" data-bind='submit:saveUser' autocomplete="off">
    <div class="section">
        <div class="field">
            <label for="admin-user-list">Gebruiker</label>
            <div class="float-left">
                <select data-bind="change:loadUserFields" name="id" id="admin-user-list"> </select>
                <button class="delete-option" data-bind="click:deleteUser">X</button>
            </div>
        </div>
        <div class="field">
            <label for="admin-user-name">GebruikersNaam</label>
            <input type="text" name="name" id="admin-user-name" autocomplete="off" required />
        </div>
        <div class="field fLeft">
            <div class="fLeft">
                <label for="admin-user-password">Wachtwoord</label>
                <input type="password" name="password" id="admin-user-password" autocomplete="off" />
            </div>
        </div>
        <div class="change-pass-field">
            <input type="checkbox" id="admin-user-changepass" name="changepass" data-bind="change:setChangePass" />
            <label for="admin-user-changepass">Wijzig wachtwoord</label>
        </div>
        <div class="clear"></div>
        <input name="save" type="submit" value="Opslaan" />
    </div>
</form>
