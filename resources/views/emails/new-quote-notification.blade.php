<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        /* Modern Email Styles */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            font-family: 'Instrument Sans', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #374151;
            line-height: 1.6;
        }
        
        .email-header {
            background-color: #0ea5e9; /* Sky-500 */
            padding: 25px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        
        .email-title {
            color: white;
            font-size: 22px;
            font-weight: 600;
            margin: 0;
        }
        
        .email-body {
            padding: 30px;
            background-color: #ffffff;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .section-title {
            color: #0ea5e9;
            font-size: 18px;
            font-weight: 600;
            margin: 25px 0 15px 0;
            padding-bottom: 8px;
            border-bottom: 2px solid #f0f9ff;
        }
        
        .detail-grid {
            display: grid;
            grid-template-columns: 120px 1fr;
            gap: 12px;
            margin-bottom: 5px;
        }
        
        .detail-label {
            font-weight: 600;
            color: #4b5563;
        }
        
        .detail-value {
            color: #1f2937;
        }
        
        .description-box {
            background-color: #f9fafb;
            color: #000000
            border-left: 3px solid #0ea5e9;
            padding: 15px;
            margin: 20px 0;
            border-radius: 0 4px 4px 0;
        }
        
        .footer-note {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
        }

         /* Footer */
         .email-footer {
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
            background-color: #f9fafb;
        }
        
        .urgent-badge {
            display: inline-block;
            background-color: #fef2f2;
            color: #dc2626;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            margin-left: 8px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <img src="/images/logo.svg" alt="SkyPort Logistics Logo" class="logo">
            <h1 class="email-title">New Quote Request Received</h1>
        </div>
        
        <!-- Body -->
        <div class="email-body">
            <p style="margin-bottom: 25px;">A new quote request has been submitted through the website.</p>
            
            <!-- Customer Details -->
            <h2 class="section-title">Customer Details</h2>
            <div class="detail-grid">
                <span class="detail-label">Name:</span>
                <span class="detail-value">{{ $quote->name }}</span>
                
                <span class="detail-label">Email:</span>
                <span class="detail-value">
                    <a href="mailto:{{ $quote->email }}" style="color: #0ea5e9; text-decoration: none;">{{ $quote->email }}</a>
                </span>
                
                <span class="detail-label">Phone:</span>
                <span class="detail-value">
                    <a href="tel:{{ $quote->phone }}" style="color: #0ea5e9; text-decoration: none;">{{ $quote->phone }}</a>
                </span>
                
                <span class="detail-label">Location:</span>
                <span class="detail-value">{{ $quote->location }}</span>
            </div>
            
            <!-- Shipment Details -->
            <h2 class="section-title">Shipment Details</h2>
            <div class="detail-grid">
                <span class="detail-label">Route:</span>
                <span class="detail-value">{{ $quote->origin }} → {{ $quote->destination }}</span>
                
                <span class="detail-label">Cargo Type:</span>
                <span class="detail-value">{{ $quote->cargoType }}</span>
                
                <span class="detail-label">Weight:</span>
                <span class="detail-value">{{ $quote->weight }} kg</span>
                
                <span class="detail-label">Dimensions:</span>
                <span class="detail-value">{{ $quote->dimensions }} cm</span>
                
                <span class="detail-label">Ready Date:</span>
                <span class="detail-value">{{ \Carbon\Carbon::parse($quote->readyDate)->format('M d, Y') }}</span>
                
                <span class="detail-label">Special Reqs:</span>
                <span class="detail-value">{{ $quote->special_requirements ?: 'None' }}</span>
            </div>
            
            <!-- Description -->
            <h2 class="section-title">Cargo Description</h2>
            <div class="description-box">
                {{ $quote->cargo_description }}
            </div>

            <!-- Urgent Notice -->
            <div style="margin-top: 25px; background-color: #fffbeb; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e; font-weight: 500;">
                    ⏰ Please respond to this request within <strong>2 hours</strong> as per our service commitment
                    <span class="urgent-badge">URGENT</span>
                </p>
            </div>
            
            <!-- Footer -->
            <div class="footer-note">
                <p style="margin: 0;">Submitted at {{ $quote->created_at->format('M d, Y H:i') }}</p>
                <p class="footer-text">© {{ date('Y') }} SkyPort Logistics. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>