console.log("olá mundo!!!")

        // Obtenha todas as questões e respostas
        const questoes = document.querySelectorAll('.questao');
        const respostas = document.querySelectorAll('.resposta');

        // Adicione o evento de clique a cada questão
        questoes.forEach((questao, index) => {
            questao.addEventListener('click', () => {
                // Verifique se a resposta está visível
                const respostaVisivel = respostas[index].classList.contains('visivel');

                // Se estiver visível, oculte a resposta; caso contrário, exiba-a e oculte as outras respostas
                if (respostaVisivel) {
                    respostas[index].classList.remove('visivel');
                } else {
                    respostas.forEach((resposta) => resposta.classList.remove('visivel'));
                    respostas[index].classList.add('visivel');
                }

                // Atualize o estilo da seta
                questoes.forEach((questao, i) => {
                    if (i === index) {
                        questao.classList.toggle('visivel');
                    } else {
                        questao.classList.remove('visivel');
                    }
                });
            });
        });