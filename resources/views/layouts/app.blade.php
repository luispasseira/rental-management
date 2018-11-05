<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'GestãoAlugueres') }}</title>
    <link href="{{ asset('dist/css/plugins/datapicker/bootstrap-datepicker3.min.css') }}" rel="stylesheet">
    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{ asset('js/plugins/clockpicker/clockpicker.js') }}"></script>
    <script src="{{ asset('js/plugins/datapicker/bootstrap-datepicker.min.js') }}"></script>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,600" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/plugins/select2/select2.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('css/plugins/clockpicker/clockpicker.css') }}"/>
    <link rel="stylesheet" href="{{ asset('css/plugins/sweetalert/sweetalert.css') }}"/>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
</head>
<body>
<div id="app">
    <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
        <div class="container">
            @if (Auth::check())
                <a class="navbar-brand" href="{{ url('/rentals') }}">
                    {{ config('app.name', 'GestãoAlugueres') }}
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/clients">Clientes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/vehicles">Veículos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/rentals">Alugueres</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/brands">Marcas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/models">Modelos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/rentals/history">Histórico de alugueres</a>
                    </li>

                </ul>
            @else
                <a class="navbar-brand" href="{{ url('/login') }}">
                    {{ config('app.name', 'GestãoAlugueres') }}
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            @endif
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->


                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                    <!-- Authentication Links -->
                    @guest
                        <li><a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a></li>
                        <li><a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a></li>
                    @else
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                {{ Auth::user()->name }} <span class="caret"></span>
                            </a>

                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="{{ route('logout') }}"
                                   onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                    {{ __('Logout') }}
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                      style="display: none;">
                                    @csrf
                                </form>
                            </div>
                        </li>
                    @endguest
                </ul>
            </div>
        </div>
    </nav>

    <main class="py-4">
        <div class="row">
            <div class="col-md-12">
                <div class="container">
                    @yield('content')
                </div>
            </div>
        </div>
    </main>
</div>

<script src="//code.jquery.com/jquery-1.10.2.js"></script>
<script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
</body>
</html>
