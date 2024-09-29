<?php

namespace App\Http\Controllers;

use App\Models\ClientsModel;
use Illuminate\Http\Request;

class ClientsController extends Controller
{
    public function createClient(Request $request){

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email',
            'type' => 'required|in:natural_person,juridic_person',
            'pathImage' => 'nullable|string',
            'cpf' => 'nullable|string|max:14',
            'rg' => 'nullable|string|max:12',
            'cnpj' => 'nullable|string|max:18',
            'social_reason' => 'nullable|string|max:255',
            'fantasy_name' => 'nullable|string|max:255',
        ]);


        // $findClientByEmail = ClientsModel::where('')


        $client = ClientsModel::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'type' => $validatedData['type'],
            'pathImage' => $validatedData['pathImage'],
        ]);

        return response()->json(['message' => 'Client created successfully!', 'client' => $client], 201);

    }
}
