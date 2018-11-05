@csrf
<div class="form-group">
    <label for="name">Nome</label>
    <input type="text" name="name" class="form-control" placeholder="Nome" value="{{ $client->name }}">
</div>

<div class="form-group">
    <label for="nationality">NIF</label>
    <input type="text" name="nif" class="form-control" placeholder="NIF" value="{{ $client->nif }}">
</div>

<div class="form-group">
    <label for="name">Morada</label>
    <input type="text" name="address" class="form-control" placeholder="Morada" value="{{ $client->address }}">
</div>


<div class="form-group">
    <label for="email" class="control-label">Contacto</label>
    <input id="contactinput" class="form-control col-6" placeholder="Contacto" name="contact"
           value="@foreach ($client->contact as $contact) {{ $contact->contact }} @endforeach" type="text"/>
</div>

<div class="form-group" id="contactgroup">
    <select id="contactype" class="form-control col-2" name="type">
        <option>Telemóvel</option>
        <option>Telefone</option>
        <option>Email</option>
    </select>
    {{--<button id="newcontact" class="btn btn-primary col-1"><i class="glyphicon glyphicon-plus"></i>
    </button>--}}
</div>
