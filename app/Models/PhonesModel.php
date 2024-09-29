<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhonesModel extends Model
{
    use HasFactory;

    protected $table = 'phones';

    protected $fillable = [
        'client_id',
        'phone_number'
    ];


    public function client(){
        return $this->belongsTo(ClientsModel::class, 'client_id');
    }

}
