@extends('layouts.app')

@section('content')
    <h1>Detalhes do modelo #{{ $model->id }}</h1>
    <p>
    <form action="/models/{{ $model->id }}" method="post">
        <a href="/models/" class="btn btn-info">Voltar</a>
        <a href="/models/{{ $model->id }}/edit" class="btn btn-success">Editar</a>
        @method("DELETE")
        @csrf
        <input type="submit" class="btn btn-danger" value="Eliminar">
    </form>
    </p>
    <table class="table">
        <tbody>
        <tr>
            <th scope="row">Nome</th>
            <td>{{ $model->name }}</td>
        </tr>
        <tr>
            <th scope="row">Marca</th>
            <td><select class="form-control">
                    <option value=''>Selecionar Marca</option>
                    @foreach($brands as $brand)
                        <option name="brand">
                            {{ $brand->name }}
                        </option>
                        <input type="text" hidden name="brand_id" class="form-control" value="{{ $brand->id }}">
                    @endforeach
                </select></td>
        </tr>
        </tbody>
    </table>
@endsection