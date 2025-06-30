<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\AsArrayObject;

class CompanyMissionVision extends Model
{

    public $timestamps = false;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'company_mission_vision';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'vision',
        'mission',
        'core_values'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'core_values' => 'array',

    ];

    /**
     * Get the first (and only) instance or create if not exists
     *
     * @return \App\Models\CompanyMissionVision
     */
    public static function getSingleton()
    {
        return static::firstOrCreate(['id' => 1], [
            'vision' => '',
            'mission' => '',
            'core_values' => []
        ]);
    }

    /**
     * Add a core value to the array
     *
     * @param string $value
     * @return void
     */

public function addCoreValue(string $value)
{
    $values = $this->core_values ?: [];
    $values[] = $value;
    $this->core_values = array_unique($values);
    return $this;
}
    /**
     * Remove a core value by index
     *
     * @param int $index
     * @return void
     */
    public function removeCoreValue(int $index)
    {
        $coreValues = $this->core_values;
        if (isset($coreValues[$index])) {
            array_splice($coreValues, $index, 1);
            $this->core_values = $coreValues;
        }
    }

    /**
     * Get core values as formatted HTML (optional)
     *
     * @return string
     */
    public function getCoreValuesHtmlAttribute(): string
    {
        if (empty($this->core_values)) {
            return '';
        }

        return '<ul><li>' . implode('</li><li>', array_map('e', $this->core_values)) . '</li></ul>';
    }
}
