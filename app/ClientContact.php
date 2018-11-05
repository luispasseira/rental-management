<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClientContact extends Model
{

    protected $fillable = [
        'client_id',
        'contact',
        'contact_type_id',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function type()
    {
        return $this->belongsTo(ContactType::class);
    }
}
