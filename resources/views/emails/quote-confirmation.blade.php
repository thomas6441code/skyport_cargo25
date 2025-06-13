<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SkyPort Logistics Quote Request</title>
    <style type="text/css">
        /* Base Styles */
        body {
            font-family: 'Instrument Sans', Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #374151;
            line-height: 1.6;
            background-color: #f9fafb;
        }
        
        /* Layout Container */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        /* Sky-500 Color Scheme */
        .sky-primary {
            color: #0ea5e9;
        }
        .sky-bg {
            background-color: #0ea5e9;
        }
        .sky-border {
            border-color: #0ea5e9;
        }
        .sky-light-bg {
            background-color: #f0f9ff;
        }
        
        /* Header */
        .email-header {
            background-color: #0ea5e9;
            padding: 25px;
            color:white;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        
        .logo {
            height: 50px;
            width: auto;
            margin-bottom: 15px;
        }
        
        /* Content */
        .email-body {
            padding: 30px;
        }
        
        h1 {
            font-size: 24px;
            margin-top: 0;
            margin-bottom: 20px;
            color: #0ea5e9;
        }
        
        h2 {
            font-size: 20px;
            margin-top: 0;
            margin-bottom: 20px;
            color: #ffffff;
        }
        
        p {
            margin-bottom: 16px;
        }
        
        /* Details Card */
        .details-card {
            background-color: #f0f9ff;
            border-left: 4px solid #0ea5e9;
            border-radius: 0 6px 6px 0;
            padding: 20px;
            margin: 25px 0;
        }
        
        .details-title {
            font-size: 18px;
            margin-top: 0;
            margin-bottom: 15px;
            color: #0ea5e9;
        }
        
        .detail-item {
            margin-bottom: 8px;
            display: flex;
        }
        
        .detail-label {
            font-weight: 600;
            min-width: 150px;
        }
        
        /* Footer */
        .email-footer {
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
            background-color: #f9fafb;
        }
        
        .footer-text {
            margin: 0;
            color: #6b7280;
            font-size: 14px;
        }
        
        /* Button */
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #0ea5e9;
            color: white !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
        }
        
        /* Responsive */
        @media only screen and (max-width: 480px) {
            .email-body {
                padding: 20px;
            }
            
            .detail-item {
                flex-direction: column;
            }
            
            .detail-label {
                margin-bottom: 4px;
            }
        }
    </style>
</head>
<body>
    <div class="email-header">
        <img src="/images/logo.svg" alt="SkyPort Logistics Logo" class="logo">
        <h2>Thank You for Your Quote Request!</h2>
    </div>

    <!-- Email Body -->
    <div class="email-container">
        <div class="email-body">
            
            <p>Dear {{ $quote->name }},</p>
            
            <p>
                We've received your quote request for shipping from 
                <strong class="sky-primary">{{ $quote->origin }}</strong> to 
                <strong class="sky-primary">{{ $quote->destination }}</strong>.
                Our team is currently reviewing your requirements and will get back to you within 
                <strong class="sky-primary">2 business hours</strong> with a competitive quote.
            </p>
            
            <div class="details-card">
                <h2 class="details-title">Request Details</h2>
                
                <div class="detail-item">
                    <span class="detail-label">Reference #:</span>
                    <span>Q-{{ str_pad($quote->id, 6, '0', STR_PAD_LEFT) }}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Cargo Type:</span>
                    <span>{{ $quote->cargo_type }}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Ready Date:</span>
                    <span>{{ \Carbon\Carbon::parse($quote->shipping_date)->format('M d, Y') }}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Special Requirements:</span>
                    <span>{{ $quote->special_requirements ?? 'None' }}</span>
                </div>
            </div>
            
            <p>
                This Quote is valid for 7 days. For special cargo, contact our team.
            </p>
            <p>
                If you have any urgent questions, please contact our customer service team at
                <a href="tel:+255774417191" style="color: #0ea5e9; text-decoration: none;">
                    <strong>+255 77 441 7191</strong>
                </a>.
            </p>
            
            <a href="{{ route('home') }}" class="button">Visit Our Website</a>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="margin-bottom: 8px;">Thank you for choosing <strong class="sky-primary">SkyPort Logistics</strong>!</p>
                
                <p style="margin-bottom: 4px;">
                    <strong>SkyPort Logistics Team</strong>
                </p>
                <p style="margin-bottom: 4px;">
                    <a href="mailto:info@skyport.or.tz" style="color: #0ea5e9; text-decoration: none;">info@skyport.or.tz</a>
                </p>
                <p style="margin-bottom: 0;">
                    +255 77 441 7191
                </p>
            </div>
        </div>
    </div>

    <div class="email-footer">
        <p class="footer-text">© {{ date('Y') }} SkyPort Logistics. All rights reserved.</p>
        <p class="footer-text" style="margin-top: 10px; font-size: 12px;">
            If you didn't request this quote, please ignore this email.
        </p>
    </div>
</body>
</html>