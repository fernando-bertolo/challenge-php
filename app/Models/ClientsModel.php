<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientsModel extends Model
{
    use HasFactory;

    protected $table = 'clients';

    protected $fillable = [
        'name',
        'email',
        'type',
        'pathImage',

    ];


    public function naturalPerson(){
        return $this->hasOne(NaturalPersonModel::class, 'client_id');
    }

    public function juridicPerson()
    {
        return $this->hasOne(JuridicPersonModel::class, 'client_id');
    }

    public function phones() {
        return $this->hasMany(PhonesModel::class, 'client_id');
    }

    public function addresses() {
        return $this->hasMany(AddressesModel::class, 'client_id');
    }
}
