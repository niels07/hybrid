<?php

namespace Hybrid\Lib\DI;

class Container implements ContainerInterface {

    private $config;
    private $namespaces = [];
    private $services;

    public function __construct($config = null) {
        if ($config) {
            $this->config = $this->loadConfig($config);
        }
        $this->services = [];
    }

    private function validateConfig(array $config): void {
        foreach ($config as $key => $service) {
            if ($service instanceof ServiceInterface) {
                $class = $service->getClass();
                if (!$class) {
                    $service->setClass($key);
                    $class = $key;
                }
            }
            elseif(!($service instanceof FactoryInterface)) {
                continue;
            }

            //if (!class_exists($class)) {
            //    throw new Exception\InvalidConfigException("class '$class' not found");
            //}
        }
    }

    public function loadConfig($path) {
        $config = require $path;
        $this->validateConfig($config);
        return $config;
    }

    private function getConfiguredArguments(Service $service) {
        $args = [];
        foreach ($service->getParams() as $key => $param) {
            $resolve = $param['resolve'];
            $data = $param['data'];
            $args[$key] =$resolve ? $this->resolve($data) : $data;
        }
        return $args;
    }

    private function tryResolveParam(\ReflectionParameter $param) {
        $type = $param->getType();
        $service = $type ? $this->tryResolve((string)$type) : $service = null;
        if ($service) {
            return $service;
        }
        return $param->isDefaultValueAvailable() ? $param->getDefaultValue() : null;
    }

    private function tryResolveParams($service, \ReflectionClass $class, array $args): array {
        $ctor = $class->getConstructor();
        if (!$ctor) {
            return [];
        }
        $params = $ctor->getParameters();
        $result = [];
        foreach ($params as $param) {
            $name = $param->getName();
            if (array_key_exists($name, $args)) {
                $result[$name] = $args[$name];
            } else {
                $result[$name] = $this->tryResolveParam($param);
            }
        }
        return $result;
    }

    private function addValueArgs(array &$ctorArgs, array $args): void {
        $argsIdx = 0;
        foreach ($ctorArgs as $key => $arg) {
            if (count($args) == $argsIdx) {
                break;
            }
            $argValue = $ctorArgs[$key] ;
            if ($argValue === null)  {
                $ctorArgs[$key] = $args[$argsIdx++];
            }
        }
    }

    private function createServiceInstance(Service $service, array $args) {
        $className = $service->getClass();

        if (is_string($className) && !(class_exists($className))) {
            throw new ResolveException("class not found: $className");
        }

        $class = new \ReflectionClass($className);
        $ctorArgs = $this->getConfiguredArguments($service);
        $ctorArgs = $this->tryResolveParams($service, $class, $ctorArgs);
        $this->addValueArgs($ctorArgs, $args);
        return $class->newInstanceArgs(array_values($ctorArgs));
    }

    private function resolveService($service, array $args) {
        if ($service instanceof FactoryService) {
            $service = new Factory($service->getCallback());
        } elseif ($service instanceof Service) {
            $service = $this->createServiceInstance($service, $args);
        }
        return $service;
    }

    public function tryResolve(string $name, array $args = []) {
        if (!array_key_exists($name, $this->config)) {
            return null;
        }
        if (!array_key_exists($name, $this->services)) {
            $service = $this->config[$name];
            $this->services[$name] = $this->resolveService($service, $args);
        }
        return $this->services[$name];
    }

    public function newInstance(string $name, array $args = []) {
        if (!array_key_exists($name, $this->config)) {
            return null;
        } 
        $service = $this->config[$name];
        return $this->resolveService($service, $args);
    }

    public function resolve(string $name, array $args = []) {
        $service = $this->tryResolve($name, $args);

        if (!$service) {
            $name = $args[0];
            throw new ResolveException("could not to resolve service: $name not found in service configuration");
        }
        return $service;
    }

    private function service(?string $class = null): ServiceInterface {
        return new Service($class);
    }

    private function factory($data): ServiceInterface {
        $callback = $data instanceof \Closure
            ? $data 
            : function() use($data) {
                $args = func_get_args();
                return $this->newInstance($data, $args);
            };
        $service = new FactoryService($callback);
        return $service;
    }
}

