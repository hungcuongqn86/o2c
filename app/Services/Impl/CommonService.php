<?php
/**
 * Created by YoyakuSystem.
 */
namespace App\Services\Impl;

use App\Services\Intf\ICommonService;
use Illuminate\Database\Eloquent\Model;

abstract class CommonService implements ICommonService
{
    private $currentConnection = '';

    public function setCurrentConnection($currentConnection)
    {
        $this->currentConnection = $currentConnection;
    }

    /**
     * Get default Model class name
     *
     * @return string table name
     */
    protected abstract function getDefaultModel();

    /**
     * @return string class name
     */
    protected abstract function getDefaultClass();

    /**
     * Convert entity data (array|stdClass|Eloquent) to array
     *
     * @param array|stdClass|Eloquent $data
     *
     * @return array
     */
    public function entityToArray($data)
    {
        if (is_subclass_of($data, Model::class)) {
            $data = $data->toArray();
        } else if (!is_array($data)) {
            $data = (array)$data;
        }
        return $data;
    }

    /**
     * @param $type
     *
     * @return array of Object setting by type
     */
    public function getSettingCommon($type)
    {
        $types = (array)config('appsettings.' . $type);
        $typeObjects = [];
        foreach ($types as $type) {
            $typeObjects[] = (object)$type;
        }
        return $typeObjects;
    }

    /**
     * @return array of all Object by class
     */
    public function getAll()
    {
        return call_user_func(array($this->getDefaultClass(), 'all'));
    }
    

}