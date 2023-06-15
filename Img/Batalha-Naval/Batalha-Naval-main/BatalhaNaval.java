package com.mycompany.batalhanaval;
import java.util.Random;
import java.util.Scanner;
public class BatalhaNaval
{
    private static final int TAMANHO_MAPA = 10;
    private static final int TOTAL_BARCOS = 10;
    private static final int NUMERO_JOGADORES = 2;
    private static final int[] TAMANHO_BARCOS = {4, 3, 3, 2, 2, 2, 1, 1, 1, 1};
    private static final String[] NOMES_BARCOS = {"Porta-aviões", "Encouraçado", "Cruzador", "Submarino", "Destroyer","Navio de Guerra", "Barco 1", "Barco 2", "Barco 3", "Barco 4"};
    private static final char VAZIO = '?';
    private static final char ATINGIDO = 'X';
    private static final char ERRO = 'O';
    private static final char BARCO = 'B';
    private final char[][][] mapas;
    private final int[] pontuacoes;
   
    public BatalhaNaval(){
    mapas = new char[NUMERO_JOGADORES][TAMANHO_MAPA][TAMANHO_MAPA];
    pontuacoes = new int[NUMERO_JOGADORES];
    inicializarMapas();
}
    public void jogar() {
    System.out.println("Bem-vindo à Batalha Naval!");


    Scanner scanner = new Scanner(System.in);
    for (int i = 0; i < NUMERO_JOGADORES; i++) {
        System.out.println("Jogador " + (i + 1) + ", é a sua vez de posicionar os barcos.");


        boolean posicionarManualmente = false;
        while (true) {
            System.out.print("Deseja posicionar os barcos manualmente? (s/n): ");
            String resposta = scanner.next();


            if (resposta.equalsIgnoreCase("s")) {
                posicionarManualmente = true;
                break;
            } else if (resposta.equalsIgnoreCase("n")) {
                break;
            } else {
                System.out.println("Resposta inválida. Digite 's' para sim ou 'n' para não.");
            }
        }
        posicionarBarcos(i, scanner, posicionarManualmente);
    }
    int jogadorAtual = 0;
    int jogadorOponente = 1;
    boolean contraMaquina = false;
    while (true)
     {
        System.out.print("Deseja jogar contra a máquina? (s/n): ");
        String respostaMaquina = scanner.next();


        if (respostaMaquina.equalsIgnoreCase("s"))
        {
            contraMaquina = true;
            System.out.println("Você está jogando contra a máquina.");
            break;
        }
        else if (respostaMaquina.equalsIgnoreCase("n"))
        {
            break;
        }
        else
        {
            System.out.println("Resposta inválida. Digite 's' para sim ou 'n' para não.");
        }
    }


    while (true)
     {
        System.out.println("\nJogador " + (jogadorAtual + 1) + ", é a sua vez de atirar.");


        if (contraMaquina && jogadorAtual == 1)
         {
            realizarAtaqueMaquina(jogadorAtual, jogadorOponente);
        }
        else
         {
            realizarAtaque(jogadorAtual, jogadorOponente, scanner);
        }
        if (verificarFimDeJogo(jogadorOponente))
         {
            System.out.println("\nParabéns! Jogador " + (jogadorAtual + 1) + " venceu o jogo!");
            break;
        }
       
        System.out.println("\nPressione Enter para continuar para o próximo jogador...");
        scanner.nextLine(); // Aguarda a entrada do jogador para prosseguir
   
        int temp = jogadorAtual;
        jogadorAtual = jogadorOponente;
        jogadorOponente = temp;
    }
}

 private void inicializarMapas(){
    for (int i = 0; i < NUMERO_JOGADORES; i++)
    {
        for (int j = 0; j < TAMANHO_MAPA; j++)
        {
            for (int k = 0; k < TAMANHO_MAPA; k++)
            {
                mapas[i][j][k] = VAZIO;
            }
        }
    }
}

private void exibirMapa(int jogador, boolean exibirBarcos) {
    System.out.println("\n    A B C D E F G H I J");
    for (int i = 0; i < TAMANHO_MAPA; i++) {
        System.out.print(i + "   ");


        for (int j = 0; j < TAMANHO_MAPA; j++) {
            char c = mapas[jogador][i][j];


            if (c == 'X' || c == ATINGIDO || c == VAZIO || c == ERRO) {
                System.out.print(c + " ");
            } else if (exibirBarcos && c == BARCO) {
                System.out.print(c + " ");
            } else {
                System.out.print("? "); // Caractere para representar uma posição não revelada
            }
        }
        System.out.println();
    }
}

private void exibirMapaAtaques(int oponente) {
    System.out.println("\n    A B C D E F G H I J");
   
    for (int i = 0; i < TAMANHO_MAPA; i++) {
        System.out.print(i + "   ");

        for (int j = 0; j < TAMANHO_MAPA; j++) {
            char c = mapas[oponente][i][j];

            if (c == 'X' || c == ATINGIDO || c == VAZIO || c == ERRO) {
                System.out.print(c + " ");
            } else {
                System.out.print("? "); // Caractere para representar uma posição não revelada
            }
        }
        System.out.println();
    }
}

    private void posicionarBarcos(int jogador, Scanner scanner, boolean posicionarManualmente){
        if (posicionarManualmente)
        {
            posicionarBarcosManualmente(jogador, scanner);
        }
        else
        {
            posicionarBarcosAutomaticamente(jogador);
        }
    }
    
    private void posicionarBarcosAutomaticamente(int jogador){
        Random random = new Random();
       
        for (int i = 0; i < TAMANHO_BARCOS.length; i++)
        {
            boolean posicaoValida = false;
           
            while (!posicaoValida)
            {
                int linha = random.nextInt(TAMANHO_MAPA);
               
                int coluna = random.nextInt(TAMANHO_MAPA);
               
                String orientacao = random.nextBoolean() ? "H" : "V";


                if (verificarPosicaoDisponivel(jogador, linha, coluna, TAMANHO_BARCOS[i], orientacao))
                {
                    posicionarBarco(jogador, linha, coluna, TAMANHO_BARCOS[i], orientacao);
                    posicaoValida = true;
                }
            }
        }
    }
    
 private void posicionarBarcosManualmente(int jogador, Scanner scanner) {
    for (int i = 0; i < TAMANHO_BARCOS.length; i++) 
    {
        exibirMapa(jogador, true);
 // Mostra o mapa atualizado antes de cada posicionamento de barco
        System.out.println("Posicione o " + NOMES_BARCOS[i] + " (" + TAMANHO_BARCOS[i] + " espaços):");

        boolean posicaoValida = false;
        while (!posicaoValida) {
            System.out.print("Digite a linha (0-9): ");
            int linha;
            
            while (true)
            {
                try {
                    linha = Integer.parseInt(scanner.next());
                    if (linha >= 0 && linha <= 9) {
                        break;
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Entrada inválida. Digite novamente a linha (0-9): ");
                }
            }
            System.out.println("Digite a coluna (A-J): ");
            String colunaStr;

            while (true) 
            {
            colunaStr = scanner.next().toUpperCase();
            if (colunaStr.length() == 1)
            {
            char colunaChar = colunaStr.charAt(0);
            if (colunaChar >= 'A' && colunaChar <= 'J')
            {
            break;
            }
            }
            System.out.println("Entrada inválida. Digite novamente a coluna (A-J): ");
            }
            int coluna = colunaStr.charAt(0) - 'A';
            System.out.print("Digite a orientação (H para horizontal, V para vertical): ");
            String orientacao;
            
            while (true)
            {
                orientacao = scanner.next();
                if (orientacao.equalsIgnoreCase("H") || orientacao.equalsIgnoreCase("V"))
                {
                    break;
                }
                
                System.out.println("Entrada inválida. Digite novamente a orientação (H para horizontal, V para vertical): ");
            }
            if (verificarPosicaoDisponivel(jogador, linha, coluna, TAMANHO_BARCOS[i], orientacao)) 
            {
                posicionarBarco(jogador, linha, coluna, TAMANHO_BARCOS[i], orientacao);
                posicaoValida = true;
            } 
            else
            {
                System.out.println("Posição inválida. Tente novamente.");
            }
        }
    }
}

    private boolean verificarPosicaoDisponivel(int jogador, int linha, int coluna, int tamanho, String orientacao) {
        if (orientacao.equalsIgnoreCase("H"))
        {
            if (coluna + tamanho > TAMANHO_MAPA)
            {
                return false;
            }
            for (int i = coluna; i < coluna + tamanho; i++)
            {
                if (mapas[jogador][linha][i] != VAZIO)
                {
                    return false;
                }
            }
        }
        else if (orientacao.equalsIgnoreCase("V"))
        {
            if (linha + tamanho > TAMANHO_MAPA)
            {
                return false;
            }
            for (int i = linha; i < linha + tamanho; i++)
            {
                if (mapas[jogador][i][coluna] != VAZIO)
                {
                    return false;
                }
            }
        }
        else
        {
            return false;
        }
        return true;
    }
   
    private void posicionarBarco(int jogador, int linha, int coluna, int tamanho, String orientacao){
        if (orientacao.equalsIgnoreCase("H"))
        {
            for (int i = coluna; i < coluna + tamanho; i++)
            {
                mapas[jogador][linha][i] = 'B';
            }
        }
        else if (orientacao.equalsIgnoreCase("V"))
        {
            for (int i = linha; i < linha + tamanho; i++)
            {
                mapas[jogador][i][coluna] = 'B';
            }
        }
    }
   
    private void realizarAtaque(int jogador, int oponente, Scanner scanner) {
    boolean jogadaValida = false;
    
    System.out.println("\nSeu Mapa");
    
    exibirMapa(jogador, true);

    System.out.println("\nMapa do Adversário ");
    exibirMapaAtaques(oponente);
    
    System.out.print("\nPressione Enter para continuar...");
    scanner.nextLine(); // Aguarda a entrada do usuário
    
    while (!jogadaValida)
    {
        System.out.print("\nDigite a linha (0-9) para atacar: ");
        int linha;
        while (true)
        {
            try {
                linha = Integer.parseInt(scanner.next());
                if (linha >= 0 && linha <= 9) 
                {
                    break;
                }
            } 
            catch (NumberFormatException e)
            {
                System.out.print("Entrada inválida. Digite novamente a linha (0-9): ");
            }
        }

        System.out.print("Digite a coluna (A-J): ");
        String colunaStr;

        while (true)
        {
            colunaStr = scanner.next().toUpperCase();
            if (colunaStr.length() == 1) 
            {
                char colunaChar = colunaStr.charAt(0);

            if (colunaChar >= 'A' && colunaChar <= 'J')
            {
            break;
            }
        }
    System.out.println("Entrada inválida. Digite novamente a coluna (A-J): ");
        }

        int coluna = colunaStr.charAt(0) - 'A';

        if (linha < 0 || linha >= TAMANHO_MAPA || coluna < 0 || coluna >= TAMANHO_MAPA)
        {
            System.out.println("Jogada inválida. Tente novamente.");
            continue;
        }

        switch (mapas[oponente][linha][coluna]) 
        {
            case VAZIO:
                System.out.println("Água! Tente novamente na próxima rodada.");
                mapas[oponente][linha][coluna] = ERRO;
                jogadaValida = true;
                break;


            case ATINGIDO:
            case ERRO:
                System.out.println("Você já atacou essa posição. Tente novamente.");
                break;

            default:
                System.out.println("Acertou um barco!");
                mapas[oponente][linha][coluna] = ATINGIDO;
                pontuacoes[jogador]++;
                if (pontuacoes[jogador] == TOTAL_BARCOS)
                 {
                    System.out.println("Parabéns! Você afundou todos os barcos do adversário!");
                }
                else if (pontuacoes[jogador] == 1)
                {
                    System.out.println("Parabéns! Você afundou um barco do adversário!");
                }
                jogadaValida = true;
                break;
        }
        
        if (verificarFimDeJogo(oponente)) 
        {
            System.out.println("Todos os barcos do adversário foram afundados! Você venceu o jogo!");
            jogadaValida = true;
        }
     
    }
}

private void realizarAtaqueMaquina(int jogador, int oponente) {
    Random random = new Random();
    boolean jogadaValida = false;
    while (!jogadaValida) 
    {
        int linha = random.nextInt(TAMANHO_MAPA);
        int coluna = random.nextInt(TAMANHO_MAPA);
        switch (mapas[oponente][linha][coluna]) 
        {
            case VAZIO:
                System.out.println("\nA máquina atacou a posição " + (char) ('A' + coluna) + linha + ": Água!");
                mapas[oponente][linha][coluna] = ERRO;
                jogadaValida = true;
                break;

            case ATINGIDO:
            case ERRO:
            continue;
            default: 
               System.out.println("\nA máquina atacou a posição " + (char) ('A' + coluna) + linha + ": Acertou um barco");
                mapas[oponente][linha][coluna] = ATINGIDO;
                pontuacoes[jogador]++;


                if (pontuacoes[jogador] == TOTAL_BARCOS)
                 {
                    System.out.println("A máquina afundou todos os seus barcos!");
                }
                else if (pontuacoes[jogador] == 1)
                 {
                    System.out.println("A máquina afundou um dos seus barcos!");
                }


        }

        if (verificarFimDeJogo(oponente)) 
        {
            System.out.println("A máquina afundou todos os seus barcos! Você perdeu o jogo!");
            jogadaValida = true;
        }
    }
}

    private boolean verificarFimDeJogo(int jogador){
        for (int i = 0; i < TAMANHO_MAPA; i++)
        {
            for (int j = 0; j < TAMANHO_MAPA; j++)
            {
                if (mapas[jogador][i][j] != VAZIO && mapas[jogador][i][j] != ATINGIDO)
                {
                    return false;
                }
            }
        }
        return true;
    }
    
    public static void main(String[] args){
        BatalhaNaval jogo = new BatalhaNaval();
        jogo.jogar();
    }
}
