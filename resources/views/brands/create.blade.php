@extends('layouts.app')

@section('content')
    <h1>Criar nova marca</h1>
    <form action="/brands" method="post">
        @include('brands.form')
        <button type="submit" class="btn btn-primary">Criar</button>
    </form>
@endsection