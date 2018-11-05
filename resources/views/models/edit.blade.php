@extends('layouts.app')

@section('content')
<h1>Editar modelo #{{ $model->id }}</h1>
<form action="/models/{{ $model->id }}" method="post">
    @method('put')
    @include('models.form')
    <button type="submit" class="btn btn-primary">Guardar</button>
</form>
@endsection