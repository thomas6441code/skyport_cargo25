<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>500 | Server Error</title>
    <!-- Same style section as 401.blade.php -->
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
            <h1 class="error-code">500</h1>
            <h2 class="error-title">Server Error</h2>
            <p class="error-description">
                Something went wrong on our end. Our team has been notified and we're working to fix it.
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
        // Same script as 401.blade.php
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
