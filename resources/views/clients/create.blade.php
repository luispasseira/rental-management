@extends('layouts.app')

@section('content')
    <h1>Criar novo cliente</h1>
    <form action="/clients" method="post">
        @include('clients.form')
        <button type="submit" class="btn btn-primary">Criar</button>
    </form>
@endsection