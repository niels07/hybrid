<?php

namespace Hybrid\Lib\IO\CSV;

use Hybrid\Lib\DI\ServiceProviderInterface;

class CSVFileFactory {
    private $serviceProvider;

    public function __construct(ServiceProviderInterface $serviceProvider) {
        $this->serviceProvider = $serviceProvider;
    }

    public function __invoke($path, $delimiter = ',', $enclosure = '"') {
        return $this->serviceProvider->createInstance(
            'Hybrid\Lib\IO\CSV\CSVFile',
            $path,
            $delimiter,
            $enclosure
        );
    }
}
