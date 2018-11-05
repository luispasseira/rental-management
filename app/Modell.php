<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Modell extends Model
{
    protected $table = 'models';

    protected $fillable = [
        'brand_id',
        'name'
    ];

    public function vehicle()
    {
        return $this->hasMany(Vehicle::class);
    }
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

}
