<?php

namespace App;

use App\Http\Controllers\ClientContactController;
use Illuminate\Database\Eloquent\Model;

class ContactType extends Model
{
    protected $fillable = [
        'type'
    ];

    public function contact()
    {
        return $this->hasMany(ClientContact::class);
    }
}
