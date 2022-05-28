<meta property="og:title" content="{{ $title }}" />


<meta name="description" content="{{ $description }}" />
<meta property="og:description" content="{{ $description }}" />
<meta property="og:type" content="website" />
@if ($imageUrl)
    <meta property="og:image" content="{{ $imageUrl }}" />
@endif
{{-- <meta property="og:url" content="{{$title}}"/> --}}
{{-- <meta property="fb:app_id" content="780774498699579"/> --}}

<meta name=" twitter:title" content="{{ $title }}" />
@if ($imageUrl)
    <meta name="twitter:image" content="{{ $imageUrl }}" />
@endif
<meta name="twitter:card" content="summary" />
<meta name="twitter:description" content="{{ $description }}" />
