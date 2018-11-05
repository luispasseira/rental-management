@extends('layouts.app')

@section('content')
<h1>Editar marca #{{ $brand->id }}</h1>
<form action="/brands/{{ $brand->id }}" method="post">
    @method('put')
    @include('brands.form')
    <button type="submit" class="btn btn-primary">Guardar</button>
</form>
@endsection