<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
    'title',
    'slug',
    'content',
    'type',
    'parent_article_id',
    'references',
];

    protected $casts = [
        'references' => 'array',
    ];
}
