<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JuridicPersonModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'cnpj',
        'social_reason',
        'fantasy_name',
    ];

    public function client(){
        return $this->belongsTo(ClientsModel::class);
    }

}
