@csrf
<div class="form-group">
    <label for="name">Modelo</label>
    <input type="text" name="name" class="form-control" placeholder="Modelo" value="{{ $model->name }}">
</div>

<div class="form-group">
    <label>Marca</label>
    <div class="form-group">
        <select class="form-control" name="brand_id">
            @if ($model->brand == null)
                <option value=''>Selecionar Marca</option>
                @foreach($brands as $brand)
                    <option name="" value={{$brand->id}}>
                        {{ $brand->name }}
                    </option>
                @endforeach
            @else
                <option value=''>Selecionar Marca</option>
                @foreach($brands as $br)
                    <option name="vehicle" value={{$br->id}} @if ($model->brand->id == $br->id) {{ 'selected' }} @endif>
                        {{ $br->name }}
                    </option>
                @endforeach
            @endif

        </select>
    </div>
</div>