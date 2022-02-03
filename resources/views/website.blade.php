<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="rtl">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name') }}</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    @if (env('APP_ENV') == 'local')
        <link href="{{ asset('css/website.css') . '?rndstr=' . random_int(0, 100) }}" rel="stylesheet">
        <script src="{{ asset('js/website.js') . '?rndstr=' . random_int(0, 100) }}" defer></script>
    @else
        <link href="{{ asset('css/website.css') }}" rel="stylesheet">
        <script src="{{ asset('js/website.js') }}" defer></script>
    @endif

</head>

<body>

    <div id='website'></div>

</body>

</html>
