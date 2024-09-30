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


    // Relations between tables
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



    // Operations in database

    public function createClient($request){
        $client = $this->create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'type' => $request->get('type'),
            'pathImage' => '',
        ]);

        return $client;
    }

    public function updateCliente($request, $id)
    {

        $client = $this->find($id);


        if (!$client) {
            return response()->json(['error' => 'Cliente não encontrado.'], 404);
        }


        $client->update([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'type' => $request->get('type'),
            'pathImage' => $request->get('pathImage') ?? '',
        ]);


        return $client;
    }

    public function getClients(){
        $clients = $this->with(['addresses', 'juridicPerson', 'naturalPerson', 'phones'])->get();
        if($clients){
            return $clients;
        }

        return null;
    }

    public function getClientById($id){
        $client = $this->with(['addresses', 'juridicPerson', 'naturalPerson', 'phones'])->where('id', $id)->first();
        return $client;
    }


    public function deleteClient($id){
        $client = $this->find($id);

        if ($client) {
            return $client->delete();
        }

        return null;
    }

}
