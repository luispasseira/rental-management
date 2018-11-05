@extends('layouts.app')

@section('content')
    <h1>Criar novo veículo</h1>
    <form action="/vehicles" method="post">
        @include('vehicles.form')
        <button type="submit" class="btn btn-primary">Criar</button>
    </form>
@endsection