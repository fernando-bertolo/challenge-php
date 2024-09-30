<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class NaturalPersonModel extends Model
{
    use HasFactory;

    protected $table = 'natural_person';


    protected $fillable = [
        'client_id',
        'cpf',
        'rg',
    ];


    public function client(){
        return $this->belongsTo(ClientsModel::class, 'client_id');
    }


    public function createNaturalPerson(Request $request, $client_id){
        $naturalPerson = $this->create([
            'client_id' => $client_id,
            'cpf' => $request->get('cpf'),
            'rg' => $request->get('rg'),
        ]);

        return $naturalPerson;
    }

    public function updateNaturalPerson(Request $request, $client_id){

        $client = $this->where('client_id', $client_id)->first();

        if (!$client) {
            return response()->json(['error' => 'Cliente não encontrado.'], 404);
        }

        $naturalPerson = $client->update([
            'cpf' => $request->get('cpf'),
            'rg' => $request->get('rg'),
        ]);

        return $naturalPerson;
    }

}
