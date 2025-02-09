<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pricelist extends Model
{
    protected $fillable = ['data', 'valid_until', 'pricelist_id'];

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'pricelist_id', 'pricelist_id');
    }
}
