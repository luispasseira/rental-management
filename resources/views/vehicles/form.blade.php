@csrf
<div class="form-group">
    <label for="name">Matrícula</label>
    <input type="text" name="registration" class="form-control" placeholder="Matrícula"
           value="{{ $vehicle->registration }}">
</div>

<div class="form-group">
    <label>Marca</label>
    <select class="form-control" name="brand_id">
        <option value=''>Selecionar Marca</option>
        @foreach($brands as $brand)
            <option name="brand" value={{$brand->id}}>
                {{ $brand->name }}
            </option>
        @endforeach
    </select>
</div>
<div class="form-group">
    <label>Modelo</label>
    <select class="form-control" name="model_id">
        <option value=''>Selecionar Modelo</option>
        @foreach($models as $model)
            <option name="model" value={{$model->id}}>
                {{ $model->name }}
            </option>
        @endforeach
    </select>
</div>

<div class="form-group">
    <label for="name">Preço por dia</label>
    <input type="text" name="price" class="form-control" placeholder="Preço" value="{{ $vehicle->price }}">
</div>
