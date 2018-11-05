<?php

namespace App\Http\Controllers;

use App\Client;
use App\ClientContact;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clients = Client::where('is_active', 1)->get();
        return view('clients.index')->with(compact("clients"));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $client = new Client;
        return view('clients.create')->with(compact('client'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $client = new Client();
        $client->name = $request->name;
        $client->nif = $request->nif;
        $client->address = $request->address;
        $client->save();

        $contact = new ClientContact();
        $contact->contact = $request->contact;
        $contact->client_id = $client->id;
        switch ($request->type) {
            case 'Telemóvel':
                $contact->contact_type_id = 1;
                break;
            case 'Telefone':
                $contact->contact_type_id = 2;
                break;
            case 'Email':
                $contact->contact_type_id = 3;
                break;
            default:
                break;
        }
        $contact->save();

        //$client = Client::create($request->all());
        return redirect('/clients');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Client $client
     * @return \Illuminate\Http\Response
     */
    public function show(Client $client)
    {
        return view('clients.show')->with(compact("client"));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Client $client
     * @return \Illuminate\Http\Response
     */
    public function edit(Client $client)
    {
        return view('clients.edit')->with(compact('client'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Client $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Client $client)
    {
        try {
            $client = new Client();
            $client->name = $request->name;
            $client->nif = $request->nif;
            $client->address = $request->address;
            $client->contact->contact = $request->contact;
            switch ($request->type) {
                case 'Telemóvel':
                    $client->contact->contact_type_id = 1;
                    break;
                case 'Telefone':
                    $client->contact->contact_type_id = 2;
                    break;
                case 'Email':
                    $client->contact->contact_type_id = 3;
                    break;
                default:
                    break;
            }
            $client->save();
            return redirect('/clients/' . $client->id);
        } catch (\Exception $ex) {
            return redirect('/clients')->with('alert', 'Não foi possível editar!');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Client $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        try {
            $client->is_active = false;
            $client->save();
        } catch (QueryException $ex) {
            return redirect('/clients')->with('alert', 'Impossível apagar!');
        }

        return redirect('/clients');
    }
}
