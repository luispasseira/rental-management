@extends('layouts.app')

@section('content')
    <h1>Criar novo modelo</h1>
    <form action="/models" method="post">
        @include('models.form')
        <button type="submit" class="btn btn-primary">Criar</button>
    </form>
@endsection