@extends('layouts.app')

@section('content')
    <h1>Listagem de modelos</h1>
    <p>
        <a href="/models/create" class="btn btn-primary">Novo</a>
    </p>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Nome</th>
            <th scope="col">Marca</th>
            <th scope="col">Opcões</th>
        </tr>
        </thead>
        <tbody>
        @foreach($models as $model)
            <tr>
                <td><a href="/models/{{ $model->id }}">{{ $model->name }}</a></td>
                @foreach($brands as $brand)
                    @if ($model->brand_id == $brand->id)
                        <td>{{ $brand->name }}</td>
                    @endif
                @endforeach
                <td>
                    <form action="/models/{{ $model->id }}" method="post">
                        <a href="/models/{{ $model->id }}/edit" class="btn btn-success">Editar</a>
                        @method("DELETE")
                        @csrf
                        <input type="submit" class="btn btn-danger" value="Eliminar">
                    </form>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection