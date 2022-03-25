<?php

namespace App\Http\Middleware;

use App\Models\Book;
use App\Tournament;
use Closure;
use Illuminate\Support\Facades\Route;

class RedirectCrawlers
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $crawlers = [
            'facebookexternalhit/1.1',
            'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
            'Facebot',
            'Twitterbot',
        ];

        $userAgent = $request->header('User-Agent');

        if (in_array($userAgent, $crawlers)) {
            // dd(Route::getCurrentRoute());
            // return view('openGraph', compact('book'));
            switch (Route::getCurrentRoute()->uri) {
                case "{path}":
                    $book = Book::first();
                    return view('openGraph', compact('book'));
            }
            
        }
        return $next($request);
    }
}