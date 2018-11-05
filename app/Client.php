<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{

    protected $fillable = [
        'name',
        'nif',
        'address',
    ];

    public function contact()
    {
        return $this->hasMany(ClientContact::class);
    }

    public function rental()
    {
        return $this->hasMany(Rental::class);
    }
}
