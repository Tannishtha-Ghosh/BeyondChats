<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Get all articles (latest first)
     */
    public function index()
    {
        return response()->json(
            Article::orderBy('created_at', 'desc')->get()
        );
    }

    /**
     * Store a new article (original or generated)
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'type' => 'nullable|string',
            'parent_article_id' => 'nullable|integer',
            'references' => 'nullable|array',
        ]);

        $article = Article::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . time(), // 👈 FIX
            'content' => $request->content,
            'type' => $request->type ?? 'original',
            'parent_article_id' => $request->parent_article_id,
            'references' => $request->references
                ? json_encode($request->references)
                : null,
        ]);

        return response()->json($article, 201);
    }
}
