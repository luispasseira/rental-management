@csrf

<div class="form-group">
    <label for="start_date">Data Início</label><br>
    <div>
        <input id="datepicker1" type="text" name="start_date" class="form-control" placeholder="Dia-Mês-Ano"
               value="@if(date('d-m-Y', strtotime($rental->end_date)) == '01-01-1970') {{ $now }} @else {{ date('d-m-Y', strtotime($rental->start_date)) }} @endif"/>
    </div>
</div>
<div class=" form-group">
    <label for="end_date">Data Fim</label><br>
    <div>
        <input id="datepicker2" type="text" name="end_date" class="form-control" placeholder="Dia-Mês-Ano"
               value="@if(date('d-m-Y', strtotime($rental->end_date)) == '01-01-1970') {{ '' }} @else {{ date('d-m-Y', strtotime($rental->end_date)) }} @endif"/>
    </div>
</div>

<div class="form-group">
    <label>Veículo</label>
    <div class="form-group">
        <select class="form-control" name="vehicle_id">
            @if ($rental->vehicle_id == null)
                <option value=''>Selecionar Automóvel</option>
                @foreach($vehicles as $vehi)
                    <option name="vehicle" value={{$vehi->id}}>
                        {{ $vehi->registration }}
                    </option>
                @endforeach
            @else
                <option value=''>Selecionar Automóvel</option>
                @foreach($vehicles as $vehi)
                    <option name="vehicle"
                            value={{$vehi->id}} @if ($vehi->id == $rental->vehicle_id) {{ 'selected' }} @endif>
                        {{ $vehi->registration }}
                    </option>
                @endforeach
            @endif

        </select>
    </div>
</div>

<div class="form-group">
    <label>Cliente</label>
    <div class="form-group">
        <select class="form-control" name="client_id">
            @if ($rental->client_id == null)
                <option value=''>Selecionar Cliente</option>
                @foreach($clients as $client)
                    <option name="client" value={{$client->id}}>
                        {{ $client->nif }}
                    </option>
                @endforeach
            @else
                <option value=''>Selecionar Cliente</option>
                @foreach($clients as $client)
                    <option name="client"
                            value={{$client->id}} @if ($client->id == $rental->client_id) {{ 'selected' }} @endif>
                        {{ $client->nif }}
                    </option>
                @endforeach
            @endif

        </select>
    </div>
</div>