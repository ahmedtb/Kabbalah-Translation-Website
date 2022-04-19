<?php

namespace App\Http\Middleware;

use App\Models\Article;
use Closure;
use App\Tournament;
use App\Models\Book;
use App\Models\Page;
use Illuminate\Http\Request;
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
    public function handle(Request $request, Closure $next)
    {
        $crawlers = [
            'facebookexternalhit/1.1',
            'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
            'Facebot',
            'Twitterbot',
        ];

        $userAgent = $request->header('User-Agent');

        if (in_array($userAgent, $crawlers)) {
            switch ($request->path()) {

                case 'books':
                    return view('openGraph.books');

                case (preg_match('/books.*\/section\/.*/', $request->path()) ? true : false):
                    $id =  explode("/", $request->path())[1];
                    $book = Book::find($id);

                    $pageIndexs =  explode("/", $request->path())[3];
                    $pageId = $book->getContentTableSection($pageIndexs)['page_id'];
                    $page = Page::find($pageId);
                    return view('openGraph.page', compact('page'));

                case (preg_match('/books.*\/chapter\/.*/', $request->path()) ? true : false):
                    $id =  explode("/", $request->path())[1];
                    // return $id;
                    $book = Book::find($id);
                    $chapterIndexes =  explode("/", $request->path())[3];

                    return view('openGraph.chapter', [
                        'chapter' => $book->getContentTableSection($chapterIndexes)['title']
                    ]);

                case (preg_match('/books\/.*/', $request->path()) ? true : false):
                    $id =  explode("/", $request->path())[1];

                    $book = Book::find($id);
                    return view('openGraph.book', compact('book'));

                case 'articles':
                    return view('openGraph.articles');

                case (preg_match('/articles\/.*/', $request->path()) ? true : false):
                    $id =  explode("/", $request->path())[1];

                    $article = Article::find($id);
                    return view('openGraph.article', compact('article'));
            }
        }
        return $next($request);
    }
}
