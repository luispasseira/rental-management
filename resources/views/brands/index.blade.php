@extends('layouts.app')

@section('content')
<h1>Lista de marcas</h1>
<p>
    <a href="/brands/create" class="btn btn-primary">Nova</a>
</p>
<table class="table">
    <thead>
        <tr>
            <th scope="col">Nome</th>
            <th scope="col">Opcões</th>
        </tr>
    </thead>
    <tbody>
        @foreach($brands as $brand)
        <tr>
            <td><a href="/brands/{{ $brand->id }}">{{ $brand->name }}</a></td>

            <td>
                <form action="/brands/{{ $brand->id }}" method="post">

                    <a href="/brands/{{ $brand->id }}/edit" class="btn btn-success">Editar</a>
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