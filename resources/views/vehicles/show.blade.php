@extends('layouts.app')

@section('content')
    <h1>Detalhes do veículo #{{ $vehicle->id }}</h1>
    <p>
    <form action="/vehicles/{{ $vehicle->id }}" method="post">
        <a href="/vehicles/" class="btn btn-info">Voltar</a>
        <a href="/vehicles/{{ $vehicle->id }}/edit" class="btn btn-success">Editar</a>
        @method("DELETE")
        @csrf
        <input type="submit" class="btn btn-danger" value="Eliminar">
    </form>
    </p>
    <table class="table">
        <tbody>
        <tr>
            <th scope="row">Matrícula</th>
            <td>{{ $vehicle->registration }}</td>
        </tr>

        <tr>
            <th scope="row">Modelo</th>
            <td>{{ $vehicle->model->name }}</td>
        </tr>
        <tr>
            <th scope="row">Marca</th>
            <td>{{ $vehicle->model->brand->name }}</td>
        </tr>
        </tbody>
    </table>
@endsection


