@extends('layouts.app')

@section('content')
<h1>Editar cliente #{{ $client->id }}</h1>
<form action="/clients/{{ $client->id }}" method="post">
    @method('put')
    @include('clients.form')
    <button type="submit" class="btn btn-primary">Guardar</button>
</form>
@endsection