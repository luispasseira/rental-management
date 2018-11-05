@extends('layouts.app')

@section('content')
    @if (session('alert'))
        <div class="alert alert-danger">
            {{ session('alert') }}
        </div>
    @endif
    <h1>Lista de clientes</h1>
    <p>
        <a href="/clients/create" class="btn btn-primary">Novo</a>
    </p>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Nome</th>
            <th scope="col">NIF</th>
            <th scope="col">Morada</th>
            <th scope="col">Contactos</th>
            <th scope="col">Opcões</th>
        </tr>
        </thead>
        <tbody>
        @foreach($clients as $client)
            <tr>
                <td><a href="/clients/{{ $client->id }}">{{ $client->name }}</a></td>
                <td>{{ $client->nif }}</td>
                <td>{{ $client->address }}</td>
                <td>
                    @foreach ($client->contact as $contact)
                        {{ $contact->contact }}
                    @endforeach
                </td>
                <td>
                    <form action="/clients/{{ $client->id }}" method="post">
                        <a href="/clients/{{ $client->id }}/edit" class="btn btn-success">Editar</a>
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