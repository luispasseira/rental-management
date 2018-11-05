<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = [
        'model_id',
        'registration',
        'price',
        'is_rented'
    ];

    public function rental()
    {
        return $this->hasMany(Rental::class);
    }

    public function model()
    {
        return $this->belongsTo(Modell::class);
    }
}
