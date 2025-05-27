<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Quote;

class QuoteConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public  $quote;

    public function __construct(Quote $quote)
    {
        $this->quote = $quote;
    }

    public function build()
    {
        return $this->subject('Your Quote Request Has Been Received'.str_pad($this->quote->id, 6, '0', STR_PAD_LEFT))
            ->markdown('emails.quote_confirmation')
            ->with([
                'quote' => $this->quote,
            ]);
    }
}
