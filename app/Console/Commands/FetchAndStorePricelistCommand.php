<?php

namespace App\Console\Commands;

use App\Models\Pricelist;
use App\Services\TravelPriceService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class FetchAndStorePricelistCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-and-store-pricelist-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch pricelist from API and store it in the database, keeping only the last 15';

    /**
     * Execute the console command.
     */
    public function handle(TravelPriceService $travelPriceService)
    {
        $pricelistData = $travelPriceService->fetchTravelPrices();
        if ($pricelistData === null) {
            $this->error('Failed to fetch pricelist from API.');
            Log::error('FetchAndStoreCommand: Failed to fetch pricelist from API.');
            return Command::FAILURE;
        }

        $this->info('Pricelist fetched successfully. Storing in database...');

        $existingPricelist = Pricelist::where('pricelist_id', $pricelistData['id'])->exists();
        if ($existingPricelist) {
            $this->warn('Pricelist with id "'.$pricelistData['id'].'" already exists in the database. Skipping storage.');
            $this->info('Proceeding to cleanup old pricelists.');
            $this->cleanupOldPricelists();
            return Command::SUCCESS;
        }

        try {
            Pricelist::create([
                'data'         => json_encode($pricelistData),
                'valid_until'  => $pricelistData['validUntil'] ?? null,
                'pricelist_id' => $pricelistData['id'] ?? null
            ]);

            $this->info('Pricelist stored succesfully');
            $this->cleanupOldPricelists();
        } catch (\Exception $e) {
            $this->error('Error storing pricelist in database:' . $e->getMessage());
            Log::error('FetchAndStorePricelistCommand: Error storing pricelist:' . $e->getMessage());
            return Command::FAILURE;
        }

        return Command::SUCCESS;
    }

    /**
     * Cleanup old pricelists, keeping the last 15.
     */
    protected function cleanupOldPricelists()
    {
        $this->info('Cleaning up old pricelists...');

        $pricelistCount = Pricelist::count();

        if ($pricelistCount > 15) {
            $numberToDelete = $pricelistCount - 15;
            $oldestPricelists = Pricelist::orderby('id', 'asc')->limit($numberToDelete)->get();

            foreach ($oldestPricelists as $pricelist) {
                $pricelist->delete();
            }

            $this->info("Deleted {$numberToDelete} oldest pricelists.");
        } else {
            $this->info("Pricelist cleanup not needed. {$pricelistCount} pricelists in the database.");
        }
    }
}
