@extends('layouts.app')

@section('content')
    @if (session('alert'))
        <div class="alert alert-danger">
            {{ session('alert') }}
        </div>
    @endif
    <h1>Lista de veículos</h1>
    <p>
        <a href="/vehicles/create" class="btn btn-primary">Novo</a>
    </p>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Matricula</th>
            <th scope="col">Modelo</th>
            <th scope="col">Marca</th>
            <th scope="col">Preço</th>
            <th scope="col">Estado</th>
            <th scope="col">Alugar</th>
            <th>Opcões</th>
        </tr>
        </thead>
        <tbody>
        @foreach($vehicles as $vehicle)
            <tr>
                <td><a href="/vehicles/{{ $vehicle->id }}">{{ $vehicle->registration }}</a></td>
                <td>{{ $vehicle->model->name }}</td>
                <td>{{ $vehicle->model->brand->name }}</td>
                <td>{{ $vehicle->price }}€/dia</td>
                <td>
                    @if ($vehicle->is_rented == true)
                        ALUGADO
                    @else
                        DISPONÍVEL
                    @endif
                </td>
                <td>
                    @if ($vehicle->is_rented == true)
                        <a href="/rentals/create/{{$vehicle->id}}" class="btn btn-secondary" style="pointer-events: none">Alugar</a>
                    @else
                        <a href="/rentals/create/{{$vehicle->id}}" class="btn btn-info">Alugar</a>
                    @endif
                </td>
                <td>
                    <form action="/vehicles/{{ $vehicle->model->id }}" method="post">
                        <a href="/vehicles/{{ $vehicle->model->id }}/edit" class="btn btn-success">Editar</a>
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