const statusElement = document.getElementById('status');
        const playersList = document.getElementById('players');
        const playerForm = document.getElementById('player-form');
        const playerNameInput = document.getElementById('player-name');
        const rollingNamesElement = document.getElementById('rolling-names');

        document.getElementById('spin').addEventListener('click', function() {
            const players = Array.from(document.querySelectorAll('#players li'));

            if (players.length === 0) {
                statusElement.textContent = 'No players to spin the bottle!';
                return;
            }

            statusElement.textContent = 'Spinning...';

            let index = 0;
            let delay = 50;
            let spinCount = 0;
            let maxSpins = 50; 
            const chosenIndex = Math.floor(Math.random() * players.length);

            function spinNames() {
                rollingNamesElement.textContent = players[index % players.length].textContent;
                index++;
                spinCount++;

                if (spinCount < maxSpins) {
                    setTimeout(spinNames, delay);
                    delay += 15; // gradually increase delay to slow down
                } else {
                    const chosenPlayer = players[chosenIndex].textContent;
                    rollingNamesElement.textContent = chosenPlayer;
                    statusElement.textContent = `The bottle points to: ${chosenPlayer}`;
                }
            }

            spinNames();
        });

        playerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const newPlayerName = playerNameInput.value.trim();

            if (!newPlayerName) {
                statusElement.textContent = 'Player name cannot be empty!';
                return;
            }

            const existingPlayers = Array.from(document.querySelectorAll('#players li'));
            if (existingPlayers.some(player => player.textContent === newPlayerName)) {
                statusElement.textContent = 'Player already exists!';
                return;
            }

            const newPlayerItem = document.createElement('li');
            newPlayerItem.textContent = newPlayerName;
            playersList.appendChild(newPlayerItem);

            playerNameInput.value = '';
            statusElement.textContent = `Player ${newPlayerName} added!`;
        });