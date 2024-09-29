<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NaturalPersonModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'cpf',
        'rg',
    ];


    public function client(){
        return $this->belongsTo(ClientsModel::class);
    }

}
