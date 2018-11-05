<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RentingStatus extends Model
{
    protected $fillable = [
        'status'
    ];

    public function rentals()
    {
        return $this->hasMany(Rental::class);
    }
}
