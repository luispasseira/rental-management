@extends('layouts.app')

@section('content')
    <h1>Criar novo aluguer</h1>
    <form action="/rentals" method="post">
        @include('rentals.form')
        <button type="submit" class="btn btn-primary">Criar</button>
    </form>
@endsection