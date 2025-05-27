Thank You for Your Quote Request!

Dear {{ $quote->name }},

We've received your quote request for shipping from {{ $quote->origin }} to {{ $quote->destination }}.
Our team is currently reviewing your requirements and will get back to you within 2 business hours with a competitive quote.

Request Details:
- Reference #: Q-{{ str_pad($quote->id, 6, '0', STR_PAD_LEFT) }}
- Cargo Type: {{ $quote->cargo_type }}
- Ready Date: {{ \Carbon\Carbon::parse($quote->shipping_date)->format('M d, Y') }}
- Special Requirements: {{ $quote->special_requirements ?? 'None' }}

If you have any urgent questions, please contact our customer service team at +255 77 441 7191.

Visit Our Website: {{ route('home') }}

Thank you for choosing SkyPort Logistics!

SkyPort Logistics Team
info@skyport.or
+255 77 441 7191

---
© {{ date('Y') }} SkyPort Logistics. All rights reserved.
If you didn't request this quote, please ignore this email.
