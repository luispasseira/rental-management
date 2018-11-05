<?php

namespace App\Http\Controllers;

use App\Client;
use App\Rental;
use App\Vehicle;
use Illuminate\Http\Request;
use DateTime;
use Illuminate\Support\Carbon;

class RentalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rentals = Rental::all();
        $days = array();
        foreach ($rentals as $rental) {
            if ($rental->status_id == 1) {

                //diferença da data final e de hoje em dias
                $ed = new Carbon($rental->end_date);
                $days[$rental->id] = $ed->diffInDays(Carbon::now());

                //diferença de hoje e da data final para ver se passou o dia de entrega
                //para alterar o estado de 'ativo' para 'por entregar'
                if (new DateTime() >= new DateTime($rental->end_date)) {
                    $rental->status_id = '4';
                }
            }
        }
        dd($rentals->vehicle->registration);
        return view('rentals.index')->with(compact("rentals"))->with(compact('days'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $rental = new Rental();
        $vehicles = Vehicle::where('is_active', 1)->get();
        $vehicle = null;
        $clients = Client::where('is_active', 1)->get();
        $now = new DateTime();
        return view('rentals.create')->with(compact('rental'))->with(compact('vehicles'))->with(compact('clients'))->with(compact('vehicle'))->with(compact('now'));
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createWithAuto($id)
    {
        $rental = new Rental();
        $vehicle = Vehicle::find($id);
        $vehicles = Vehicle::where('is_active', 1)->get();
        $clients = Client::where('is_active', 1)->get();
        $now = new DateTime();
        return view('rentals.create')->with(compact('rental'))->with(compact('vehicle'))->with(compact('clients'))->with(compact('vehicles'))->with(compact('now'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rental = new Rental();
        $rental->vehicle_id = $request->vehicle_id;
        $rental->start_date = new DateTime($request->start_date);
        $rental->end_date = new DateTime($request->end_date);
        $rental->client_id = $request->client_id;
        $rental->return_date = null;
        $rental->status_id = 1;
        $rental->save();

        $vehicle = Vehicle::find($request->vehicle_id);
        $vehicle->is_rented = true;
        $vehicle->save();
        return redirect('/rentals');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Rental $rental
     * @return \Illuminate\Http\Response
     */
    public function show(Rental $rental)
    {
        //diferença da data final e de hoje em dias
        $ed = new Carbon($rental->end_date);
        $days[$rental->id] = $ed->diffInDays(Carbon::now());
        return view('rentals.show')->with(compact("rental"))->with(compact('days'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Rental $rental
     * @return \Illuminate\Http\Response
     */
    public function edit(Rental $rental)
    {
        $vehicles = Vehicle::all();
        $clients = Client::all();
        return view('rentals.edit')->with(compact('rental'))->with(compact('vehicles'))->with(compact('clients'))->with(compact('vehicle'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Rental $rental
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rental $rental)
    {
        $rental->vehicle_id = $request->vehicle_id;
        $rental->start_date = new DateTime($request->start_date);
        $rental->end_date = new DateTime($request->end_date);
        $rental->client_id = $request->client_id;
        $rental->save();
        return redirect('/rentals/' . $rental->id);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function deliver($id)
    {
        $rental = Rental::find($id);
        $rental->return_date = new DateTime();
        $rental->status_id = 3;
        $rental->save();
        return redirect('/rentals');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function cancel($id)
    {
        $rental = Rental::find($id);
        $rental->status_id = 2;
        $rental->save();
        return redirect('/rentals');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Rental $rental
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rental $rental)
    {
        $rental->delete();
        return redirect('/rentals');
    }
}
