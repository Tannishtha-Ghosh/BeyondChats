<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;
use Illuminate\Support\Str;

class ScrapeBeyondChatsBlogs extends Command
{
    protected $signature = 'app:scrape-beyond-chats-blogs';

    protected $description = 'Scrape oldest BeyondChats blog articles';

    public function handle()
    {
        // 1. Fetch blogs page
        $response = Http::get('https://beyondchats.com/blogs/');

        if (! $response->successful()) {
            $this->error('Failed to fetch blogs page');
            return;
        }

        $crawler = new Crawler($response->body());
        $links = [];

        // 2. Collect real blog article links (exclude tag pages)
        $crawler->filter('a')->each(function ($node) use (&$links) {
            $href = $node->attr('href');

            if (
                $href &&
                str_contains($href, '/blogs/') &&
                ! str_contains($href, '/blogs/tag/')
            ) {
                if (str_starts_with($href, '/')) {
                    $href = 'https://beyondchats.com' . $href;
                }
                $links[] = $href;
            }
        });

        $uniqueLinks = array_values(array_unique($links));
        $oldestFive = array_slice($uniqueLinks, -5);

        $this->info('Saving oldest 5 articles...');

        foreach ($oldestFive as $link) {
            // Avoid duplicates
            if (Article::where('source_url', $link)->exists()) {
                $this->info('Skipping existing article: ' . $link);
                continue;
            }

            $articleResponse = Http::get($link);

            if (! $articleResponse->successful()) {
                $this->error('Failed to fetch article: ' . $link);
                continue;
            }

            $articleCrawler = new Crawler($articleResponse->body());

            // Safe title extraction
            $titleNode = $articleCrawler->filter('h1');
            if ($titleNode->count() === 0) {
                $this->error('No title found, skipping: ' . $link);
                continue;
            }

            $title = trim($titleNode->first()->text());

            // Extract content
            $content = $articleCrawler->filter('p')->each(function ($p) {
                return trim($p->text());
            });

            $finalContent = implode("\n\n", array_filter($content));

            // Save to DB
            Article::create([
                'title' => $title,
                'slug' => Str::slug($title),
                'content' => $finalContent,
                'source_url' => $link,
                'version' => 'original',
            ]);

            $this->info('Saved: ' . $title);
        }

        $this->info('Scraping completed.');
    }
}
