<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class JuridicPersonModel extends Model
{
    use HasFactory;
    protected $table = 'juridic_person';


    protected $fillable = [
        'client_id',
        'cnpj',
        'social_reason',
        'fantasy_name',
    ];

    public function client(){
        return $this->belongsTo(ClientsModel::class, 'client_id');
    }


    public function createJuridicPerson(Request $request, $client_id){
        $juridicPerson = $this->create([
            'client_id' => $client_id,
            'cnpj' => $request->get('cnpj'),
            'social_reason' => $request->get('social_reason'),
            'fantasy_name' => $request->get('fantasy_name')
        ]);

        return $juridicPerson;
    }

    public function updateJuridicPerson(Request $request, $client_id){

        $client = $this->where('client_id', $client_id)->first();


        if (!$client) {
            return response()->json(['error' => 'Cliente não encontrado.'], 404);
        }

        $juridicPerson = $client->update([
            'cnpj' => $request->get('cnpj'),
            'social_reason' => $request->get('social_reason'),
            'fantasy_name' => $request->get('fantasy_name')
        ]);

        return $juridicPerson;
    }


}
