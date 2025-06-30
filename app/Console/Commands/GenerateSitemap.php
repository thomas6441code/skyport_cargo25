<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\SitemapGenerator;
use Spatie\Sitemap\Tags\Url;
use Carbon\Carbon;
use App\Models\Service;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';
    protected $description = 'Generate the sitemap for SkyPort Cargo logistics';

    public function handle()
    {
        $sitemap = SitemapGenerator::create('https://skyportcargo.co.tz')
            ->configureCrawler(function ($crawler) {
                $crawler->setMaximumDepth(3);
                $crawler->ignoreRobots();
            })
            ->hasCrawled(function (Url $url) {
                // Priority settings for logistics routes
                if ($url->segment(1) === 'services') {
                    $url->setPriority(0.9)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY);
                } elseif ($url->path() === '/') {
                    $url->setPriority(1.0)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY);
                } elseif ($url->path() === 'tracking') {
                    $url->setPriority(0.8)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY);
                } else {
                    $url->setPriority(0.8)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY);
                }
                return $url;
            });

        // Core logistics service pages
        $sitemap->getSitemap()
            ->add(Url::create('/services/air-freight')
                ->setLastModificationDate(Carbon::now())
                ->setPriority(0.9))
            ->add(Url::create('/services/export-services')
                ->setLastModificationDate(Carbon::now())
                ->setPriority(0.9))
            ->add(Url::create('/tracking')
                ->setLastModificationDate(Carbon::now())
                ->setPriority(0.8))
            ->add(Url::create('/quotes')
                ->setLastModificationDate(Carbon::now())
                ->setPriority(0.8))
            ->add(Url::create('/contact')
                ->setLastModificationDate(Carbon::now())
                ->setPriority(0.7))
            ->add(Url::create('/about-us')
                ->setLastModificationDate(Carbon::now())
                ->setPriority(0.6));

        // Dynamic service pages from database
        Service::where('active', true)->each(function ($service) use ($sitemap) {
            $sitemap->getSitemap()->add(
                Url::create("/services/{$service->slug}")
                    ->setLastModificationDate($service->updated_at)
                    ->setPriority(0.85)
            );
        });

        // Write sitemap file
        $sitemap->writeToFile(public_path('sitemap.xml'));

        // Ping search engines
        $this->pingSearchEngines();

        $this->info('SkyPort Cargo logistics sitemap generated successfully!');
    }

    protected function pingSearchEngines()
    {
        try {
            $sitemapUrl = url('sitemap.xml');
            
            file_get_contents('https://www.google.com/ping?sitemap=' . urlencode($sitemapUrl));
            file_get_contents('https://www.bing.com/ping?sitemap=' . urlencode($sitemapUrl));
            
            $this->info('Notified Google and Bing about sitemap updates.');
        } catch (\Exception $e) {
            $this->error('Search engine ping failed: ' . $e->getMessage());
        }
    }
}
