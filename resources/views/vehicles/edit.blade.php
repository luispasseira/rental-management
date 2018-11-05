@extends('layouts.app')

@section('content')
<h1>Editar Veículo #{{ $vehicle->id }}</h1>
<form action="/vehicles/{{ $vehicle->id }}" method="post">
    @method('put')
    @include('vehicles.form')
    <button type="submit" class="btn btn-primary">Guardar</button>
</form>
@endsection