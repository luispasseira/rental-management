<?php

namespace App\Http\Controllers;

use App\Modell;
use App\Brand;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\AssignOp\Mod;

class ModellController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $brands = Brand::where('is_active', 1)->get();
        $models = Modell::where('is_active', 1)->get();
        return view('models.index')->with(compact('models'))->with(compact("brands"));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $model = new Modell();
        $brands = Brand::where('is_active', 1)->get();
        return view('models.create')->with(compact('model'))->with(compact('brands'));

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $model = new Modell();
        $model->name = strtoupper($request->name);
        $model->brand_id = $request->brand_id;
        $model->save();
        return redirect('/models');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Modell $model
     * @return \Illuminate\Http\Response
     */
    public function show(Modell $model)
    {
        $brands = Brand::all();
        return view('models.show')->with(compact("model"))->with(compact('brands'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Modell $model
     * @return \Illuminate\Http\Response
     */
    public function edit(Modell $model)
    {
        $brands = Brand::all();
        return view('models.edit')->with(compact('model'))->with(compact('brands'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Modell $model
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Modell $model)
    {
        $model->name = strtoupper($request->name);
        $model->brand_id = $request->brand_id;
        $model->save();
        return redirect('/models');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Modell $model
     * @return \Illuminate\Http\Response
     */
    public function destroy(Modell $model)
    {
        $model->delete();
        return redirect('/models');
    }
}
