<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $emailSubject }}</title>
    <style>
        /* Base Styles */
        body {
            font-family: 'Instrument Sans', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
        }
        
        /* Container */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        /* Header with Sky-500 Color */
        .email-header {
            background-color: #0ea5e9;
            padding: 25px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        
        .logo {
            max-width: 180px;
            height: auto;
            margin-bottom: 15px;
        }
        
        .email-title {
            color: white;
            font-size: 24px;
            font-weight: 600;
            margin: 0;
        }
        
        /* Content Area */
        .email-content {
            padding: 30px;
        }
        
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
        }
        
        .message-content {
            font-size: 16px;
            line-height: 1.7;
            margin-bottom: 30px;
            color: #4b5563;
        }
        
        /* Quote Details Card */
        .quote-card {
            background-color: #f0f9ff; 
            border-left: 4px solid #0ea5e9;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 30px;
        }
        
        .quote-title {
            color: #0ea5e9;
            font-size: 18px;
            font-weight: 600;
            margin-top: 0;
            margin-bottom: 15px;
        }
        
        .detail-row {
            display: flex;
            margin-bottom: 8px;
        }
        
        .detail-label {
            font-weight: 600;
            color: #1e293b;
            min-width: 150px;
        }
        
        .detail-value {
            color: #4b5563;
        }
        
        /* Footer */
        .email-footer {
            background-color: #f9fafb;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
        }
        
        .company-name {
            color: #0ea5e9;
            font-weight: 600;
        }
        
        /* Responsive */
        @media (max-width: 480px) {
            .email-content {
                padding: 20px;
            }
            
            .detail-row {
                flex-direction: column;
            }
            
            .detail-label {
                margin-bottom: 4px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header with Logo -->
        <div class="email-header">
            <!-- Replace with your actual logo URL -->
            <img src="/images/logo.svg" alt="Company Logo" class="logo">
            <h1 class="email-title">Your Quote Request</h1>
            
        </div>
        
        <!-- Main Content -->
        <div class="email-content">
            <p class="greeting">Dear {{ $quote->name }},</p>
            
            <div class="message-content">
                {!! nl2br(e($emailContent)) !!}
            </div>
            
            <!-- Quote Details Card -->
            <div class="quote-card">
                <h3 class="quote-title">Quote Details</h3>
                
                <div class="detail-row">
                    <span class="detail-label">From:</span>
                    <span class="detail-value">{{ $quote->origin }}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">To:</span>
                    <span class="detail-value">{{ $quote->destination }}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Cargo Type:</span>
                    <span class="detail-value">{{ $quote->cargo_type }}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Weight:</span>
                    <span class="detail-value">{{ $quote->weight }} kg</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Dimensions:</span>
                    <span class="detail-value">{{ $quote->dimensions }}</span>
                </div>
                
                @if($quote->special_requirements)
                <div class="detail-row">
                    <span class="detail-label">Special Requirements:</span>
                    <span class="detail-value">{{ $quote->special_requirements }}</span>
                </div>
                @endif
            </div>
            
            <p style="margin-bottom: 30px;">If you have any further questions, please don't hesitate to contact us.</p>
            
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
        
        <!-- Footer -->
        <div class="email-footer">
            <p>This email is in response to your quote request submitted on {{ $quote->created_at->format('F j, Y') }}.</p>
            <p style="margin-top: 10px;">© {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
