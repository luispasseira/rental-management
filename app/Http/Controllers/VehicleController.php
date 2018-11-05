<?php

namespace App\Http\Controllers;

use App\Modell;
use App\Vehicle;
use App\Brand;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vehicles = Vehicle::all();
        return view('vehicles.index')->with(compact("vehicles"));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $vehicle = new Vehicle();
        $brands = Brand::where('is_active', 1)->get();
        $models = Modell::where('is_active', 1)->get();
        return view('vehicles.create')->with(compact('vehicle'))->with(compact('brands'))->with(compact('models'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $vehicle = new Vehicle();
        $vehicle->registration = $request->registration;
        $vehicle->price = $request->price;
        $vehicle->is_rented = false;
        $vehicle->model_id = $request->model_id;
        $vehicle->save();
        return redirect('/vehicles');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Vehicle $vehicle
     * @return \Illuminate\Http\Response
     */
    public function show(Vehicle $vehicle)
    {
        return view('vehicles.show')->with(compact("vehicle"));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Vehicle $vehicle
     * @return \Illuminate\Http\Response
     */
    public function edit(Vehicle $vehicle)
    {
        return view('vehicles.edit')->with(compact('vehicle'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Vehicle $vehicle
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vehicle $vehicle)
    {
        try {
            $vehicle->registration = $request->registration;
            $vehicle->price = $request->price;
            $vehicle->is_rented = false;
            $vehicle->model_id = $request->model_id;
            $vehicle->save();
            return redirect('/vehicles/' . $vehicle->id);
        } catch (\Exception $ex) {
            return redirect('/vehicles')->with('alert', 'Não foi possível editar!' . $ex->getMessage());
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Vehicle $vehicle
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vehicle $vehicle)
    {
        try {
            $vehicle->is_active = false;
            $vehicle->save();
            return redirect('/vehicles/' . $vehicle->id);
        } catch (\Exception $ex) {
            return redirect('/vehicles')->with('alert', 'Não foi possível editar!' . $ex->getMessage());
        }
    }
}
