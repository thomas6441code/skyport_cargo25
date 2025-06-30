<?php

namespace App\Console\Commands;


use Illuminate\Support\Facades\Mail;
use Illuminate\Console\Command;

class SendTestEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mail:test {email}';
protected $description = 'Send a test email';

    /**
     * The console command description.
     *
     * @var string
     */
	public function handle()
{
    $email = $this->argument('email');
    Mail::raw('This is a test email', function ($message) use ($email) {
        $message->to($email)->subject('Test Email');
    });
    $this->info("Test email sent to $email");
}
}
