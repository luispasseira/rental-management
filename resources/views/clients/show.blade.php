@extends('layouts.app')

@section('content')
    <h1>Detalhes do cliente #{{ $client->id }}</h1>
    <p>
    <form action="/clients/{{ $client->id }}" method="post">
        <a href="/clients/" class="btn btn-info">Voltar</a>
        <a href="/clients/{{ $client->id }}/edit" class="btn btn-success">Editar</a>
        @method("DELETE")
        @csrf
        <input type="submit" class="btn btn-danger" value="Eliminar">
    </form>
    </p>
    <table class="table">
        <tbody>
        <tr>
            <th scope="row">Nome</th>
            <td>{{ $client->name }}</td>
        </tr>
        <tr>
            <th scope="row">NIF</th>
            <td>{{ $client->nif }}</td>
        </tr>
        <tr>
            <th scope="row">Morada</th>
            <td>{{ $client->address }}</td>
        </tr>
        <tr>
            <th scope="row">Contactos</th>
            <td>
                @foreach ($client->contact as $contact)
                    {{ $contact->contact }}
                @endforeach
            </td>
        </tr>
        </tbody>
    </table>
@endsection