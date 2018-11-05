@extends('layouts.app')

@section('content')
    <h1>Detalhes da marca #{{ $brand->id }}</h1>
    <p>
        <form action="/brands/{{ $brand->id }}" method="post">
        <a href="/brands/" class="btn btn-info">Voltar</a>
            <a href="/brands/{{ $brand->id }}/edit" class="btn btn-success">Editar</a>
            @method("DELETE")
            @csrf
            <input type="submit" class="btn btn-danger" value="Eliminar">
        </form>
    </p>
    <table class="table">
        <tbody>
            <tr>
                <th scope="row">Nome</th>
                <td>{{ $brand->name }}</td>
            </tr>
        </tbody>
        </table>
@endsection