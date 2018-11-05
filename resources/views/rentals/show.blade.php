@extends('layouts.app')

@section('content')
    <h1>Detalhes do aluguer #{{ $rental->id }}</h1>
    <p>
    <form action="/rentals/{{ $rental->id }}" method="post">
        <a href="/rentals/" class="btn btn-info">Voltar</a>
        <a href="/rentals/{{ $rental->id }}/edit" class="btn btn-success">Editar</a>
        @method("DELETE")
        @csrf
        <input type="submit" class="btn btn-danger" value="Eliminar">
    </form>
    </p>
    <table class="table">
        <tbody>
        <tr>
            <th scope="row">Data início</th>
            <td>{{ date('d-m-Y', strtotime($rental->start_date)) }}</td>
        </tr>
        <tr>
            <th scope="row">Data fim</th>
            <td>{{ date('d-m-Y', strtotime($rental->end_date)) }}</td>
        </tr>
        <tr>
            <th scope="row">Duração</th>
            <td> {{ $days[$rental->id] }} dias</td>
        </tr>
        <tr>
            <th scope="row">Veículo</th>
            <td><a href="/vehicles/{{ $rental->vehicle->id }}">{{ $rental->vehicle->registration }}</a></td>
            <td></td>
        </tr>
        <tr>
            <th scope="row">Cliente</th>
            <td><a href="/clients/{{ $rental->client->id }}">{{ $rental->client->nif }}</a></td>
        </tr>
        <tr>
            <th scope="row">Estado</th>
            <td>{{ $rental->status->status }}</td>
        </tr>
        <tr>
            <th scope="row">Data entrega</th>
            <td>
                @if($rental->return_date != null)
                    {{ date('d-m-Y', strtotime($rental->return_date)) }}
                @else
                    @switch($rental->status_id)

                        @case(1)
                        <a href="/rentals/cancel/{{$rental->id}}" class="btn btn-dark">Cancelar aluguer</a>
                        @break
                        @case(4)
                        <a href="/rentals/deliver/{{$rental->id}}" class="btn btn-outline-danger">Entregar</a>
                        @break

                        @default
                        {{ date('d-m-Y', strtotime($rental->return_date)) }}
                    @endswitch
                @endif
            </td>
        </tr>
        <tr>
            <th scope="row">Preço do veículo</th>
            <td> {{ $rental->vehicle->price }}€/dia</td>
        </tr>
        <tr>
            <th scope="row">Custo</th>
            <td> @php echo (intval(date('d', strtotime($rental->end_date))) - intval(date('d', strtotime($rental->start_date)))) * $rental->vehicle->price; @endphp€
            </td>
        </tr>
        <tr>
            <th scope="row">Taxa de falha de entrega</th>
            <td>
            {{-- Taxa é o valor do aluguer do veículo por dia mais metade desse valor por dia que falhe --}}
            @if($rental->status_id == 4) {{ number_format((float)$days[$rental->id] * ($rental->vehicle->price + ($rental->vehicle->price / 2 )), 2, '.', '') }} @else {{ 'Sem taxa' }}@endif
            </td>
        </tr>
        <tr>
            <th scope="row">Total a pagar</th>
            <td>
                @php
                    if($rental->status_id == 4)
                    echo ((floatval(date('d', strtotime($rental->end_date))) - intval(date('d', strtotime($rental->start_date)))) * $rental->vehicle->price) + (number_format((float)$days[$rental->id] * ($rental->vehicle->price + ($rental->vehicle->price / 2 )), 2, '.', ''));
                    else
                    echo (intval(date('d', strtotime($rental->end_date))) - intval(date('d', strtotime($rental->start_date)))) * $rental->vehicle->price;
                @endphp€
            </td>
        </tr>
        </tbody>
    </table>
@endsection


