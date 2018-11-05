@extends('layouts.app')

@section('content')
    <h1>Lista de alugueres</h1>
    <p>
        <a href="/rentals/create" class="btn btn-primary">Novo</a>
    </p>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Número</th>
            <th scope="col">Véiculo</th>
            <th scope="col">Cliente</th>
            <th scope="col">Data Início</th>
            <th scope="col">Data Fim</th>
            {{--<th scope="col">Estado</th>--}}
            {{--<th scope="col">Preço</th>--}}
            {{--<th scope="col">Custo</th>--}}
            {{--<th scope="col">Taxa</th>--}}
            <th scope="col">Total</th>
            <th scope="col">Data Entrega</th>
            <th>Opcões</th>
        </tr>
        </thead>
        <tbody>

        @foreach($rentals as $rental)
            <tr>
                <td><a href="/rentals/{{ $rental->id }}">{{ $rental->id }}</a></td>
                <td>{{ $rental->vehicle->registration }}</td>
                <td>{{ $rental->client->name }}</td>
                <td>{{ date('d-m-Y', strtotime($rental->start_date)) }}</td>
                <td>{{ date('d-m-Y', strtotime($rental->end_date)) }}</td>
                {{--<td>{{ $rental->status->status }}</td>--}}
                {{--<td> {{ $rental->vehicle->price }}€/dia</td>--}}
                {{--<td> @php echo (intval(date('d', strtotime($rental->end_date))) - intval(date('d', strtotime($rental->start_date)))) * $rental->vehicle->price; @endphp€--}}
                {{--</td>--}}
                {{--<td>--}}
                {{-- Taxa é o valor do aluguer do veículo por dia mais metade desse valor por dia que falhe --}}
                {{--@if($rental->status_id == 4) {{ number_format((float)$days[$rental->id] * ($rental->vehicle->price + ($rental->vehicle->price / 2 )), 2, '.', '') }} @else {{ 'Sem taxa' }}@endif--}}
                {{--</td>--}}
                <td>
                    @php
                        if($rental->status_id == 4)
                        echo ((floatval(date('d', strtotime($rental->end_date))) - intval(date('d', strtotime($rental->start_date)))) * $rental->vehicle->price) + (number_format((float)$days[$rental->id] * ($rental->vehicle->price + ($rental->vehicle->price / 2 )), 2, '.', ''));
                        else
                        echo (intval(date('d', strtotime($rental->end_date))) - intval(date('d', strtotime($rental->start_date)))) * $rental->vehicle->price;
                    @endphp€
                </td>
                <td>
                    @if($rental->return_date != null)
                        {{ date('d-m-Y', strtotime($rental->return_date)) }}
                    @else
                        @switch($rental->status_id)

                            @case(1)
                            <a href="/rentals/cancel/{{$rental->id}}" class="btn btn-dark">Cancelar</a>
                            @break
                            @case(4)
                            <a href="/rentals/deliver/{{$rental->id}}" class="btn btn-outline-danger">Entregar</a>
                            @break
                            @case(2)
                            {{ $rental->status->status }}
                            @break
                            @default
                            {{ date('d-m-Y', strtotime($rental->return_date)) }}
                        @endswitch
                    @endif
                </td>
                <td>
                    <form action="/rentals/{{ $rental->id }}" method="post">
                        <a href="/rentals/{{ $rental->id }}/edit" class="btn btn-success">Editar</a>
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