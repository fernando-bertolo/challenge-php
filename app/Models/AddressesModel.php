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

    public function createAddresses($addressesArray, $client_id){
        foreach ($addressesArray as $address) {
            $address = $this->create([
                'client_id' => $client_id,
                'address' => $address['address'],
                'postal_code' => $address['postal_code'],
                'state' => $address['state'],
                'district' => $address['district'],
                'city' => $address['city'],
                'number' => $address['number'],
            ]);
        }

        return $address;
    }

    public function updateAddresses($addressesArray, $client_id)
    {
        // Busca todos os endereços existentes para o cliente
        $existingAddresses = $this->where('client_id', $client_id)->get();

        // Cria um array de IDs de endereços existentes para fácil acesso
        $existingAddressIds = $existingAddresses->pluck('id')->toArray();

        // Atualiza ou adiciona endereços
        foreach ($addressesArray as $address) {
            // Aqui você pode usar algum identificador único, por exemplo, 'id' ou 'address' se você o tiver
            // Para este exemplo, vamos assumir que o array tem uma chave 'id' para identificar endereços existentes
            if (isset($address['id']) && in_array($address['id'], $existingAddressIds)) {
                // Se o endereço já existe, atualiza os dados
                $existingAddress =$this->find($address['id']);
                $existingAddress->update([
                    'address' => $address['address'],
                    'postal_code' => $address['postal_code'],
                    'state' => $address['state'],
                    'district' => $address['district'],
                    'city' => $address['city'],
                    'number' => $address['number'],
                ]);
            } else {
                // Se o endereço não existe, cria um novo
                $this->create([
                    'client_id' => $client_id,
                    'address' => $address['address'],
                    'postal_code' => $address['postal_code'],
                    'state' => $address['state'],
                    'district' => $address['district'],
                    'city' => $address['city'],
                    'number' => $address['number'],
                ]);
            }
        }

        // Opcional: Remover endereços que não estão mais na lista
        foreach ($existingAddresses as $existingAddress) {
            if (!in_array($existingAddress->id, array_column($addressesArray, 'id'))) {
                $existingAddress->delete();
            }
        }

        return response()->json(['message' => 'Endereços atualizados com sucesso.']);
    }


}
