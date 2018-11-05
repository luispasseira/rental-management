@extends('layouts.app')

@section('content')
<h1>Editar aluguer #{{ $rental->id }}</h1>
<form action="/rentals/{{ $rental->id }}" method="post">
    @method('put')
    @include('rentals.form2')
    <button type="submit" class="btn btn-primary">Guardar</button>
</form>
@endsection