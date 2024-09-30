<?php

namespace App\Http\Controllers;

use App\Models\AddressesModel;
use App\Models\ClientsModel;
use App\Models\JuridicPersonModel;
use App\Models\NaturalPersonModel;
use App\Models\PhonesModel;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ClientsController extends Controller
{

    public function createClient(Request $request)
    {

        // dd($request->all());
        $this->validateDataClient($request);



        $client = (new ClientsModel)->createClient($request);
        // dd($client);



        if($request['type'] == 'natural_person'){
            $naturalPersonModel = new NaturalPersonModel();
            $naturalPersonModel->createNaturalPerson($request, $client->id);
        }

        if($request['type'] == 'juridic_person'){
            $juridicPersonModel = new JuridicPersonModel();
            $juridicPersonModel->createJuridicPerson($request, $client->id);
        }


        $phones_array = $request->get('phones');
        $phonesModel = new PhonesModel();
        $phonesModel->createPhone($phones_array, $client->id);

        $addressesArray = $request->get('addresses');
        $addressesModel = new AddressesModel();
        $addressesModel->createAddresses($addressesArray, $client->id);


        return response()->json([
            'message' => 'Cliente criado com sucesso',
            'client' => $client,
            'status' => true
        ], 201);
    }
    public function validateDataClient(Request $request, $clientId = null)
    {

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('clients', 'email')->ignore($clientId), // Ignorar o e-mail do cliente atual na validação
            ],
            'type' => 'required|in:natural_person,juridic_person',
            'pathImage' => 'nullable|string',
            'cpf' => [
                'nullable',
                'string',
                'max:14',
                function ($attribute, $value, $fail) use ($request, $clientId) {
                    if ($request->type === 'natural_person') {
                        $exists = \DB::table('natural_person')
                            ->where('cpf', $value)
                            ->where('client_id', '!=', $clientId) // Ignorar o CPF do cliente atual
                            ->exists();
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
                function ($attribute, $value, $fail) use ($request, $clientId) {
                    if ($request->type === 'juridic_person') {
                        $exists = \DB::table('juridic_person')
                            ->where('cnpj', $value)
                            ->where('client_id', '!=', $clientId) // Ignorar o CNPJ do cliente atual
                            ->exists();
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
        $clientsModel = new ClientsModel();
        $dataClients = $clientsModel->getClients();
        return response()->json($dataClients);
    }

    public function deleteClient(Request $request, $id){
        $clientsModel = new ClientsModel();
        $result = $clientsModel->deleteClient($id);

        if ($result) {
            return response()->json(['message' => 'Cliente excluído com sucesso!'], 200);
        }

        return response()->json(['message' => 'Cliente não encontrado!'], 404);
    }


    public function updateClient(Request $request, $id){
        $this->validateDataClient($request, $id);

        $clientModel = new ClientsModel();
        $client = $clientModel->updateCliente($request, $id);


        if($request['type'] == 'natural_person'){
            $naturalPersonModel = new NaturalPersonModel();
            $naturalPersonModel->updateNaturalPerson($request, $client->id);
        }

        if($request['type'] == 'juridic_person'){
            $juridicPersonModel = new JuridicPersonModel();
            $juridicPersonModel->updateJuridicPerson($request, $client->id);
        }




        $phones_array = $request->get('phones');
        $phonesModel = new PhonesModel();
        $phonesModel->updatePhone($phones_array, $client->id);

        $addressesArray = $request->get('addresses');
        $addressesModel = new AddressesModel();
        $addressesModel->updateAddresses($addressesArray, $client->id);



        return response()->json([
            'message' => 'Cliente alterado com sucesso!!',
            'status' => true
        ], 201);

    }

    public function listClientsById(Request $request, $id){
        $clientModel = new ClientsModel();
        $dataClient = $clientModel->getClientById($id);

        return response()->json(($dataClient));
    }


}
