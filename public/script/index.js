document.addEventListener('DOMContentLoaded', () => {
    const gameBtn = document.getElementById('game-btn');

    if (gameBtn) {
        gameBtn.addEventListener('click', startQuizGame);
    }

    function startQuizGame() {
        const start = confirm("Добро пожаловать в викторину по сайту!\nВы хотите проверить свои знания и начать игру?");

        if (!start) {
            alert("Ну и ладно (");
            return;
        }

        let score = 0;

        let answer1 = prompt("Вопрос 1: Как называется фильм, представленный в разделе 'Фильм'?");

        if (answer1 === null || answer1.trim() === "") {
            alert("Вы не ввели ответ или нажали 'Отмена'. Вопрос засчитан как неверный.");
        } else {
            if (answer1.toLowerCase().includes("железный человек") || answer1.toLowerCase().includes("iron man")) {
                score++;
                alert("Правильно, это Железный человек.");
            } else {
                alert("Неверно. Правильный ответ: Железный человек.");
            }
        }

        const continueGame = confirm(`Вы набрали ${score} очков из 1.\nПродолжить игру?`);
        if (!continueGame) {
            alert(`Игра окончена! Ваш итоговый счет: ${score}.`);
            return;
        }

        let answer2 = prompt("Вопрос 2: В какой день месяца состоится матч Локомотива и Пари НН? (Введите число)");

        if (answer2 === null || answer2.trim() === "") {
            alert("Вы пропустили ввод ответа.");
        } else {
            if (answer2.trim() === "28") {
                score++;
                alert("Правильно, матч будет 28-го числа.");
            } else {
                const retry = confirm("Неверно! Хотите попробовать угадать еще раз?");
                if (retry) {
                    let retryAnswer = prompt("Введите число дня матча еще раз:");
                    if (retryAnswer && retryAnswer.trim() === "28") {
                        score++;
                        alert("Со второй попытки угадали");
                    } else {
                        alert("Правильный ответ был 28.");
                    }
                } else {
                    alert("Вы отказались от второй попытки. Правильный ответ: 28.");
                }
            }
        }

        let finalMessage = `Игра завершена!\nВаш результат: ${score} из 2.\n`;
        
        if (score === 2) {
            finalMessage += "Поздравляем! Вы запомнили ненужную инфу! 🏆";
        } else if (score === 1) {
            finalMessage += "Неплохо, но можно лучше";
        } else {
            finalMessage += "Попробуйте еще раз!";
        }

        alert(finalMessage);
    }
});