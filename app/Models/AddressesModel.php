<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddressesModel extends Model
{
    use HasFactory;

    protected $table = 'addresses';

    protected $fillable = [
        'client_id',
        'address',
        'number',
        'city',
        'postal_code',
        'district',
        'state'
    ];

    public function client(){
        return $this->belongsTo(ClientsModel::class, 'client_id');
    }

}
