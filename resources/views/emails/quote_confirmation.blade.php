<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>SkyPort Logistics Quote Request</title>
</head>
<body style="font-family: 'Instrument Sans', Arial, sans-serif; margin: 0; padding: 0;">
@component('mail::layout')
    @slot('header')
        @component('mail::header', ['url' => route('home')])
            <img src="{{ asset('images/logo.svg') }}" alt="SkyPort Logistics Logo" style="height: 50px; width: auto;">
        @endcomponent
    @endslot

    <!-- Email Body -->
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2b6cb0; font-size: 24px; margin-bottom: 20px; line-height: 1.4;">
            Thank You for Your Quote Request!
        </h1>

        <p style="margin-bottom: 16px; line-height: 1.6;">Dear {{ $quote->name }},</p>

        <p style="margin-bottom: 16px; line-height: 1.6;">
            We've received your quote request for shipping from
            <strong style="color: #2b6cb0;">{{ $quote->origin }}</strong> to
            <strong style="color: #2b6cb0;">{{ $quote->destination }}</strong>.
            Our team is currently reviewing your requirements and will get back to you within
            <strong style="color: #2b6cb0;">2 business hours</strong> with a competitive quote.
        </p>

        <div style="background-color: #f7fafc; border-left: 4px solid #2b6cb0; padding: 16px; margin: 20px 0;">
            <h2 style="color: #2b6cb0; font-size: 18px; margin-top: 0; margin-bottom: 12px; line-height: 1.4;">
                Request Details:
            </h2>
            <ul style="padding-left: 20px; margin: 0; line-height: 1.6;">
                <li style="margin-bottom: 8px;">
                    <strong>Reference #:</strong> Q-{{ str_pad($quote->id, 6, '0', STR_PAD_LEFT) }}
                </li>
                <li style="margin-bottom: 8px;">
                    <strong>Cargo Type:</strong> {{ $quote->cargo_type }}
                </li>
                <li style="margin-bottom: 8px;">
                    <strong>Ready Date:</strong> {{ \Carbon\Carbon::parse($quote->shipping_date)->format('M d, Y') }}
                </li>
                <li style="margin-bottom: 0;">
                    <strong>Special Requirements:</strong> {{ $quote->special_requirements ?? 'None' }}
                </li>
            </ul>
        </div>

        <p style="margin-bottom: 24px; line-height: 1.6;">
            If you have any urgent questions, please contact our customer service team at
            <a href="tel:+255774417191" style="color: #2b6cb0; text-decoration: none;">
                <strong>+255 77 441 7191</strong>
            </a>.
        </p>

        @component('mail::button', ['url' => route('home'), 'color' => 'primary'])
            Visit Our Website
        @endcomponent

        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <p style="margin-bottom: 8px; line-height: 1.6;">Thank you for choosing <strong style="color: #2b6cb0;">SkyPort Logistics</strong>!</p>

            <p style="margin-bottom: 4px; line-height: 1.6;">
                <strong>SkyPort Logistics Team</strong>
            </p>
            <p style="margin-bottom: 4px; line-height: 1.6;">
                <a href="mailto:info@skyport.or" style="color: #2b6cb0; text-decoration: none;">info@skyport.or</a>
            </p>
            <p style="margin-bottom: 0; line-height: 1.6;">
                +255 77 441 7191
            </p>
        </div>
    </div>

    @slot('footer')
        @component('mail::footer')
            <p style="margin: 0; color: #718096; font-size: 14px; line-height: 1.6;">
                © {{ date('Y') }} SkyPort Logistics. All rights reserved.
            </p>
            <p style="margin: 10px 0 0; color: #718096; font-size: 12px; line-height: 1.4;">
                If you didn't request this quote, please ignore this email.
            </p>
        @endcomponent
    @endslot
@endcomponent
</body>
</html>
