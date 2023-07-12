import pygame

pygame.init()
WIDTH = 800
HEIGHT = 800
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Arnold Chess Engine')
timer = pygame.time.Clock()
fps = 60

white_pieces = ['r', 'n', 'b', 'q', 'k', 'b', 'n',
                'r', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p']
black_pieces = ['r', 'n', 'b', 'q', 'k', 'b', 'n',
                'r', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p']

white_positions = [(0, 7), (1, 7), (2, 7), (3, 7), (4, 7), (5, 7), (6, 7), (7, 7),
                   (0, 6),  (1, 6),  (2, 6),  (3, 6),  (4, 6),  (5, 6),  (6, 6),  (7, 6),]
black_positions = [(0, 0), (1, 0), (2, 0), (3, 0), (4, 0), (5, 0), (6, 0), (7, 0),
                   (0, 1),  (1, 1),  (2, 1),  (3, 1),  (4, 1),  (5, 1),  (6, 1),  (7, 1),]

white_rook = pygame.image.load('assets/white_rook.png')
black_rook = pygame.image.load('assets/black_rook.png')

white_knight = pygame.image.load('assets/white_knight.png')
black_knight = pygame.image.load('assets/black_knight.png')

white_bishop = pygame.image.load('assets/white_bishop.png')
black_bishop = pygame.image.load('assets/black_bishop.png')

white_king = pygame.image.load('assets/white_king.png')
black_king = pygame.image.load('assets/black_king.png')

white_queen = pygame.image.load('assets/white_queen.png')
black_queen = pygame.image.load('assets/black_queen.png')

white_pawn = pygame.image.load('assets/white_pawn.png')
black_pawn = pygame.image.load('assets/black_pawn.png')

white_pieces_images = [white_bishop, white_king,
                       white_knight, white_queen, white_rook, white_pawn]
black_pieces_images = [black_bishop, black_king,
                       black_knight, black_queen, black_rook, black_pawn]

pieces = ['b', 'k', 'n', 'q', 'r', 'p']

DARK_SQUARE_COLOR = "#7C9EB3"
LIGHT_SQUARE_COLOR = "#D6E1E6"
SELECTED_SQUARE_COLOR = '#8CDBEA'


# 0 -> white turn
# 1 -> white turn with piece selected
# 2 -> black turn
# 3 -> black turn with piece selected
turn = 0
selected_piece = 10
valid_moves = []


def draw_table():
    # we are cool and only display the light squares
    for i in range(32):
        column = i % 4
        row = i // 4
        if row % 2 == 0:
            pygame.draw.rect(screen, LIGHT_SQUARE_COLOR,
                             (column * 200, row*100, 100, 100))
        else:
            pygame.draw.rect(screen, LIGHT_SQUARE_COLOR,
                             (column * 200 + 100, row*100, 100, 100))


def draw_pieces():
    PADDING = 5
    for i, white_piece in enumerate(white_pieces):
        existing_piece = pieces.index(white_piece)

        screen.blit(white_pieces_images[existing_piece],
                    (white_positions[i][0] * 100 + PADDING, white_positions[i][1] * 100 + PADDING))

    for i, black_piece in enumerate(black_pieces):
        existing_piece = pieces.index(black_piece)

        screen.blit(black_pieces_images[existing_piece],
                    (black_positions[i][0] * 100 + PADDING, black_positions[i][1] * 100 + PADDING))

    if turn < 2:
        i = selected_piece
        pygame.draw.rect(screen, SELECTED_SQUARE_COLOR,
                         (white_positions[i][0] * 100 + 1, white_positions[i][1] * 100 + 1, 100, 100), 5)


isRunning = True
while isRunning:
    timer.tick(fps)
    screen.fill(DARK_SQUARE_COLOR)

    draw_table()
    draw_pieces()

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            isRunning = False

    pygame.display.flip()

pygame.quit()
