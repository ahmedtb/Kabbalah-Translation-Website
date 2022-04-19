
<?php
$title = $article->title;
$description = $article->description;
$image = $article->thumbnail;
$imageUrl = route('article_thumbnail', $article->id);

?>

<meta property="og:title" content="{{ $title }}"/>


<meta name="description" content="{{ $description }}"/>
<meta property="og:description" content="{{ $description }}"/>
<meta property="og:type" content="website"/>
<meta property="og:image" content="{{$imageUrl}}"/>
<meta property="og:image:secure_url" content="{{$imageUrl}}"/>
{{-- <meta property="og:url" content="{{$title}}"/> --}}
{{-- <meta property="fb:app_id" content="780774498699579"/> --}}

<meta name=" twitter:title" content="{{ $title }}"/>
<meta name="twitter:image" content="{{$imageUrl}}"/>
<meta name="twitter:card" content="summary"/>
<meta name="twitter:description" content="{{ $description }}"/>