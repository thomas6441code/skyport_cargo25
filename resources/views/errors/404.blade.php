<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 | Page Not Found</title>
    <style>
        :root {
            --primary: #6C4DF6;
            --secondary: #FF7BA9;
            --glass: rgba(255, 255, 255, 0.15);
            --glass-border: rgba(255, 255, 255, 0.2);
            --text-light: #F2F5FF;
            --text-dark: #1E1E2A;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #1E1E2A 0%, #2D2D44 100%);
            color: var(--text-light);
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* Floating 3D shapes */
        .shape {
            position: absolute;
            border-radius: 50%;
            filter: blur(60px);
            opacity: 0.6;
            z-index: -1;
        }

        .shape-1 {
            width: 300px;
            height: 300px;
            background: var(--primary);
            top: -100px;
            left: -100px;
            animation: float 12s ease-in-out infinite;
        }

        .shape-2 {
            width: 200px;
            height: 200px;
            background: var(--secondary);
            bottom: -50px;
            right: -50px;
            animation: float 8s ease-in-out infinite reverse;
        }

        @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(30px, 30px); }
        }

        /* Glass card */
        .container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            padding: 2rem;
            backdrop-filter: blur(10px);
        }

        .glass-card {
            background: var(--glass);
            border: 1px solid var(--glass-border);
            border-radius: 24px;
            padding: 3rem;
            margin: auto;
            width: 100%;
            max-width: 600px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            transform-style: preserve-3d;
            transform: perspective(1000px);
            transition: all 0.5s ease;
        }

        .glass-card:hover {
            transform: perspective(1000px) rotateX(5deg) rotateY(5deg);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
        }

        /* Error content */
        .error-code {
            font-size: 8rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            line-height: 1;
            margin-bottom: 1rem;
            text-shadow: 0 4px 20px rgba(108, 77, 246, 0.3);
        }

        .error-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .error-description {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 2rem;
            opacity: 0.9;
        }

        /* Navigation buttons */
        .btn-group {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }

        .btn {
            padding: 0.8rem 1.5rem;
            border-radius: 12px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            box-shadow: 0 4px 15px rgba(108, 77, 246, 0.3);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(108, 77, 246, 0.4);
        }

        .btn-secondary {
            background: var(--glass);
            border: 1px solid var(--glass-border);
            color: var(--text-light);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        /* Floating cubes */
        .cube {
            position: absolute;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid var(--glass-border);
            border-radius: 8px;
            animation: float 6s ease-in-out infinite;
            z-index: -1;
        }

        .cube-1 {
            top: 20%;
            left: 10%;
            animation-delay: 0s;
        }

        .cube-2 {
            top: 60%;
            right: 15%;
            animation-delay: 2s;
            animation-duration: 8s;
        }

        .cube-3 {
            bottom: 10%;
            left: 20%;
            animation-delay: 1s;
            animation-duration: 7s;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .error-code {
                font-size: 5rem;
            }

            .error-title {
                font-size: 1.5rem;
            }

            .btn-group {
                flex-direction: column;
            }

            .cube {
                display: none;
            }
        }

        @media (max-width: 480px) {
            .glass-card {
                padding: 2rem 1.5rem;
            }

            .error-code {
                font-size: 4rem;
            }
        }
    </style>
</head>
<body>
    <!-- Background shapes -->
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>

    <!-- Floating cubes -->
    <div class="cube cube-1"></div>
    <div class="cube cube-2"></div>
    <div class="cube cube-3"></div>

    <div class="container">
        <div class="glass-card">
            <h1 class="error-code">404</h1>
            <h2 class="error-title">Page Not Found</h2>
            <p class="error-description">
                The page you're looking for doesn't exist or may have been moved. 
                Don't worry, you can navigate back to safety using the links below.
            </p>
            
            <div class="btn-group">
                <a href="/" class="btn btn-primary">
                    Return Home
                </a>
                <a href="/contact" class="btn btn-secondary">
                    Contact Support
                </a>
            </div>
        </div>
    </div>

    <script>
        // Add mouse parallax effect to glass card
        document.addEventListener('mousemove', (e) => {
            const card = document.querySelector('.glass-card');
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            card.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        // Reset rotation when mouse leaves
        document.querySelector('.container').addEventListener('mouseleave', () => {
            const card = document.querySelector('.glass-card');
            card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        });
    </script>
</body>
</html>
