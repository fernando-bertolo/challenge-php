<?php

namespace App\Http\Controllers;

use App\Models\AddressesModel;
use App\Models\ClientsModel;
use App\Models\JuridicPersonModel;
use App\Models\NaturalPersonModel;
use App\Models\PhonesModel;
use Illuminate\Http\Request;

class ClientsController extends Controller
{

    public function createClient(Request $request)
    {

        // dd($request->all());
        $this->validateDataClient($request);




        $client = ClientsModel::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'type' => $request->get('type'),
            'pathImage' => '',
        ]);

        if($request['type'] == 'natural_person'){
            NaturalPersonModel::create([
                'client_id' => $client->id,
                'cpf' => $request->get('cpf'),
                'rg' => $request->get('rg'),
            ]);
        }

        if($request['type'] == 'juridic_person'){
            JuridicPersonModel::create([
                'client_id' => $client->id,
                'cnpj' => $request->get('cnpj'),
                'social_reason' => $request->get('social_reason'),
                'fantasy_name' => $request->get('fantasy_name')
            ]);
        }


        $phones_array = $request->get('phones');
        // dd($phones_array);
        $phoneModel = new PhonesModel();
        foreach($phones_array as $phones){
            $phoneModel->create([
                'client_id' => $client->id,
                'phone_number' => $phones['phone_number']
            ]);
        }

        $addressesArray = $request->get('addresses');
        // dd($addressesArray);
        $addressesModel = new AddressesModel();
        foreach ($addressesArray as $address) {
            $addressesModel->create([
                'client_id' => $client->id,
                'address' => $address['address'],
                'postal_code' => $address['postal_code'],
                'state' => $address['state'],
                'district' => $address['district'],
                'city' => $address['city'],
                'number' => $address['number'],
            ]);
        }


        return response()->json([
            'message' => 'Cliente criado com sucesso',
            'client' => $client,
            'status' => true
        ], 201);
    }
    public function validateDataClient(Request $request)
    {

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email',
            'type' => 'required|in:natural_person,juridic_person',
            'pathImage' => 'nullable|string',
            'cpf' => [
                'nullable',
                'string',
                'max:14',
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->type === 'natural_person') {
                        $exists = \DB::table('natural_person')->where('cpf', $value)->exists();
                        if ($exists) {
                            $fail('Por favor, cadastre outro CPF.');
                        }
                    }
                }
            ],
            'rg' => 'nullable|string|max:12',
            'cnpj' => [
                'nullable',
                'string',
                'max:18',
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->type === 'juridic_person') {
                        $exists = \DB::table('juridic_person')->where('cnpj', $value)->exists();
                        if ($exists) {
                            $fail('Por favor, cadastre outro CNPJ.');
                        }
                    }
                }
            ],
            'social_reason' => 'nullable|string|max:255',
            'fantasy_name' => 'nullable|string|max:255',
        ], [
            'name.required' => 'O campo nome é obrigatório',
            'name.max' => 'O campo nome não pode ter mais que 255 caracteres.',

            'email.required' => 'O campo email é obrigatório.',
            'email.email' => 'Por favor, insira um email válido.',
            'email.unique' => 'Por favor, cadastre outro e-mail.',

            'type.required' => 'O tipo de cliente é obrigatório.',
            'type.in' => 'O tipo de cliente deve ser Pessoa Física ou Jurídica.',

            'cpf.max' => 'O CPF não pode ter mais de 14 caracteres.',
            'rg.max' => 'O RG não pode ter mais de 12 caracteres.',
            'cnpj.max' => 'O CNPJ não pode ter mais de 18 caracteres.',

            'social_reason.max' => 'A razão social não pode ter mais de 255 caracteres.',
            'fantasy_name.max' => 'O nome fantasia não pode ter mais de 255 caracteres.',
        ]);


        return $validatedData;
    }

    public function listClient(Request $request){
        $clientsModel = ClientsModel::with(['addresses', 'juridicPerson', 'naturalPerson', 'phones'])->get();
        return response()->json($clientsModel);
    }

}
