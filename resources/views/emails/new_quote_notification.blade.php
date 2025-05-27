@component('mail::message')
    # New Quote Request Received

    A new quote request has been submitted through the website.

    **Customer Details:**
    - **Name:** {{ $quote->name }}
    - **Email:** {{ $quote->email }}
    - **Phone:** {{ $quote->phone }}
    - **Location:** {{ $quote->location }} (ZIP: {{ $quote->zipCode }})

    **Shipment Details:**
    - **Route:** {{ $quote->origin }} to {{ $quote->destination }}
    - **Cargo Type:** {{ $quote->cargoType }}
    - **Weight:** {{ $quote->weight }} kg
    - **Dimensions:** {{ $quote->dimensions }}
    - **Ready Date:** {{ \Carbon\Carbon::parse($quote->readyDate)->format('M d, Y') }}
    - **Special Requirements:** {{ $quote->specialRequirements ?: 'None' }}

    **Description:**
    {{ $quote->cargoDescription }}

    @component('mail::button', ['url' => route('admin.quotes.show', $quote->id)])
        View Full Details
    @endcomponent

    Please respond to this request within **2 hours** as per our service commitment.

    **Submitted At:** {{ $quote->created_at->format('M d, Y H:i') }}
@endcomponent
