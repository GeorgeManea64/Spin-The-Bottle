const canvas = document.getElementById('wheel');
        const ctx = canvas.getContext('2d');
        const spinBtn = document.getElementById('spin');
        const statusText = document.getElementById('status');
        const playersList = document.getElementById('players');
        const playerForm = document.getElementById('player-form');
        const playerNameInput = document.getElementById('player-name');

        let players = [];
        let angleOffset = 0;

        function drawWheel(players, angle = 0) {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = canvas.width / 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const sliceAngle = (2 * Math.PI) / players.length;

            players.forEach((player, i) => {
                const start = angle + i * sliceAngle;
                const end = start + sliceAngle;

                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, start, end);
                ctx.closePath();

                ctx.fillStyle = `hsl(${(i * 360) / players.length}, 80%, 60%)`;
                ctx.fill();
                ctx.stroke();

                const textAngle = start + sliceAngle / 2;
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.rotate(textAngle);
                ctx.textAlign = "right";
                ctx.fillStyle = "black";
                ctx.font = "bold 14px Arial";
                ctx.fillText(player, radius - 10, 5);
                ctx.restore();
            });
        }

        function spinWheel() {
            if (players.length === 0) {
                statusText.textContent = "No players to spin the bottle!";
                return;
            }

            const sliceAngle = (2 * Math.PI) / players.length;
            const randomIndex = Math.floor(Math.random() * players.length);
            const stopAngle = (3 * Math.PI / 2) - (randomIndex * sliceAngle) - (sliceAngle / 2);
            const rotations = 5 * 2 * Math.PI;
            const finalAngle = rotations + stopAngle;
            const duration = 5000;
            const start = performance.now();

            function animate(timestamp) {
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                angleOffset = finalAngle * eased;
                drawWheel(players, angleOffset);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    statusText.textContent = `Chosen: ${players[randomIndex]}`;
                }
            }

            statusText.textContent = "Spinning...";
            requestAnimationFrame(animate);
        }

        spinBtn.addEventListener('click', spinWheel);

        playerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = playerNameInput.value.trim();
            if (!name) {
                statusText.textContent = "Player name cannot be empty!";
                return;
            }
            if (players.includes(name)) {
                statusText.textContent = "Player already exists!";
                return;
            }
            players.push(name);
            const li = document.createElement('li');
            li.textContent = name;
            playersList.appendChild(li);
            playerNameInput.value = '';
            statusText.textContent = `Player ${name} added!`;
            drawWheel(players);
        });

        drawWheel(players);