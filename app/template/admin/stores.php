<h1>Filialen</h1>

<form id="admin-store-form" data-bind="submit:saveStore" class="fLeft">
    <div class="fLeft">
        <div class="section">
            <h2>Filiaal</h2>
            <div class="field">
                <label for="admin-store-list">Filiaal</label>
                <div>
                    <select name="id" id="admin-store-list" class="fLeft" data-bind="change:loadStoreFields">
                        <option value="0">Nieuwe Winkel</option>
                    </select>
                    <button class="delete-option fLeft" data-bind="click:deleteStore">X</button>
                    <div class="clear"></div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="fieldset">
                <h2>Adres</h2>
                <div class="field">
                    <label for="admin-store-name">Naam</label>
                    <input type="text" name="name" id="admin-store-name">
                </div>
                <div class="field">
                    <label for="admin-store-street">Straat</label>
                    <input type="text" name="street" id="admin-store-street"></div>
                <div class="field">
                    <label for="admin-store-street_number">Straat Nummer</label>
                    <input type="text" name="street_number" id="admin-store-street_number">
                </div>
                <div class="field">
                    <label for="admin-store-city">Plaats</label>
                    <input type="text" name="city" id="admin-store-city">
                </div>
                <div class="field">
                    <label for="admin-store-zipcode">Postcode</label>
                    <input type="text" name="zipcode" id="admin-store-zipcode">
                </div>
                <div class="field">
                    <label for="admin-store-country">Land</label>
                    <input type="text" name="country" id="admin-store-country">
                </div>
                <div class="field">
                    <label for="admin-store-phone">Telefoon</label>
                    <input type="text" name="phone" id="admin-store-phone">
                </div>
                <div class="field">
                    <label for="admin-store-email">E-Mail</label>
                    <input type="text" name="email" id="admin-store-email">
                </div>
            </div>
        </div>
    </div>
    <div class="fLeft">
        <div class="section">
            <h2>Openingsuren</h2>
            <div class="fieldset">
                <?php
                $days = [
                    'maandag' ,
                    'dinsdag',
                    'woensdag',
                    'donderdag',
                    'vrijdag',
                    'zaterdag',
                    'zondag'
                ];
                foreach ($days as $day) { ?>
                    <div class="field store-day">
                        <label for="admin-store-day-<?php echo $day; ?>?>">
                            <?php echo ucfirst($day); ?>
                        </label>
                        <div id="admin-store-day-<?php echo $day; ?>">
                            <input type="hidden" class="day-name" value="<?php echo $day; ?>"/>
                            <div class="fLeft">
                                <input type="time" id="admin-store-day-<?php echo $day; ?>-open" class="day-open" />-
                            </div>
                            <div class="fLeft">
                                <input type="time" id="admin-store-day-<?php echo $day; ?>-closed" class="day-closed" />
                            </div>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </div>
        <input type="submit" value="Opslaan" />
    </div>
    <input type="hidden" id="admin-store-days" name="days" value="[]" />
</form>
<div class="clear"></div>

