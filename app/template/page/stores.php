<div id="stores-page">
    <h1>Vestigingen</h1>
    <p>
        stores
    </p>

    <div class="container">
        <?php foreach ($this->getStores() as $store) { ?>
            <div class="store">
                <div class="title">
                    <h2><?php echo $store->name ?></h2>
                </div>
                <div class="address">
                    <ul>
                        <li><?php echo "{$store->street} {$store->street_number}" ?></li>
                        <li><?php echo "{$store->postcode} {$store->location}" ?></li>
                        <li><?php echo $store->country; ?></li>
                        <li><?php echo $store->phone; ?></li>
                        <li><?php echo $store->email; ?></li>
                    </ul>
                </div>
                <div class="days">
                    <table>
                    <?php foreach ($store->days as $day) { ?>
                        <tr>
                            <td class="bold"><?php echo $day[0]; ?></td>
                            <td><?php echo $day[1]; ?></td>
                            <td> - </td>
                            <td><?php echo $day[2]; ?></td>
                        </tr>
                    <?php } ?>
                    </table>
                </div>
            </div>
        <?php } ?>
    </div>
</div>
