<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SeedBySqlFile extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seedBySqlFile {filePath}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'sql file unprepared function';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // dd(file_get_contents($this->argument('filePath')));
        DB::unprepared(file_get_contents($this->argument('filePath')));


        return Command::SUCCESS;
    }
}
