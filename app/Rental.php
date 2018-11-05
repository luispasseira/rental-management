<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rental extends Model
{
    protected $fillable = [
        'vehicle_id',
        'start_date',
        'end_date',
        'return_date',
        'status_id',
        'client_id'
    ];

    public function status()
    {
        return $this->belongsTo(RentingStatus::class);
    }
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
