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

    public function createPhone($phones_array, $client_id){
        foreach($phones_array as $phones){
            $phones = $this->create([
                'client_id' => $client_id,
                'phone_number' => $phones['phone_number']
            ]);
        }

        return $phones;
    }

    public function updatePhone($phones_array, $client_id)
    {
        $client = $this->where('client_id', $client_id)->first();

        if (!$client) {
            return response()->json(['message' => 'Cliente não encontrado.'], 404);
        }

        $existingPhones = PhonesModel::where('client_id', $client_id)->get();

        $existingPhoneNumbers = $existingPhones->pluck('phone_number')->toArray();

        foreach ($phones_array as $phone) {
            if (in_array($phone['phone_number'], $existingPhoneNumbers)) {
            } else {

                PhonesModel::create([
                    'client_id' => $client_id,
                    'phone_number' => $phone['phone_number'],
                ]);
            }
        }

        foreach ($existingPhones as $existingPhone) {
            if (!in_array($existingPhone->phone_number, array_column($phones_array, 'phone_number'))) {
                $existingPhone->delete();
            }
        }

        return response()->json(['message' => 'Telefones atualizados com sucesso.']);
    }

}
